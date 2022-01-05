const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

const QUEUE_URL = process.env.QUEUE_URL;

// Set the AWS Region.
const REGION = "us-east-1";
// Create SQS service object.
const sqsClient = new SQSClient({ region: REGION });

exports.index = async (event) => {
  console.log(event);
  console.log('body: ', JSON.parse(event.body));
  const { id, title, product_type, created_at } = JSON.parse(event.body);
  console.log({ id, title, product_type, created_at });
  const eventBody = { id, title, product_type, created_at };

  console.log('check: ', event.headers['x-shopify-api-version']);
  const moment = new Date(Date.now());
  if(event.headers['x-shopify-api-version']) {
    eventBody['message_type'] = 'event';
    eventBody['entity_type'] = 'product';
    eventBody['entity_id'] = event.headers['x-shopify-product-id'];
    eventBody['src'] = event.headers['x-shopify-shop-domain'];
    eventBody['event_type'] = event.headers['x-shopify-topic'];
    eventBody['event_id'] = event.headers['x-shopify-webhook-id'];
    eventBody['event_receiving_timestamp'] = moment.toString();
    eventBody['entity_cluster_id'] = '...'; // chua co
  }

  console.log('eventBody: ' + JSON.stringify(eventBody));

  const params = {
    MessageBody: JSON.stringify(eventBody),
    MessageDeduplicationId: "TheWhistler", // Required for FIFO queues
    MessageGroupId: "Group1", // Required for FIFO queues
    QueueUrl: QUEUE_URL, //SQS_QUEUE_URL; e.g., 'https://sqs.REGION.amazonaws.com/ACCOUNT-ID/QUEUE-NAME'
  };

  try {
    const data = await sqsClient.send(new SendMessageCommand(params));
    console.log("Success, message sent. MessageID:", data.MessageId);
  } catch (err) {
    console.log("Error", err);
  }

  let responseBody = {
    message: "Push message successfully",
  };

  let response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };

  return response;
};