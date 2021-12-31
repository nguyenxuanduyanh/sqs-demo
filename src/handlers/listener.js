const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

const QUEUE_URL = process.env.QUEUE_URL;

// Set the AWS Region.
const REGION = "us-east-1";
// Create SQS service object.
const sqsClient = new SQSClient({ region: REGION });

exports.index = async (event) => {
  const { id, title, product_type, created_at } = event;

  const eventBody = { id, title, product_type, created_at };

  const params = {
    MessageBody: JSON.stringify(eventBody),
    MessageDeduplicationId: "TheWhistler", // Required for FIFO queues
    MessageGroupId: "Group1", // Required for FIFO queues
    QueueUrl: QUEUE_URL, //SQS_QUEUE_URL; e.g., 'https://sqs.REGION.amazonaws.com/ACCOUNT-ID/QUEUE-NAME'
  };

  try {
    const data = await sqsClient.send(new SendMessageCommand(params));
    console.log("Success, message sent. MessageID:", data.MessageId);
    return data; // For unit tests.
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
