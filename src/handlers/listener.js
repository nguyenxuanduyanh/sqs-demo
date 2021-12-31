const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

const QUEUE_URL = process.env.QUEUE_URL;
const REGION = "us-east-1";
const sqsClient = new SQSClient({ region: REGION });

exports.index = async (event) => {
  const { id, title, product_type, created_at } = JSON.parse(event.body);
  const eventBody = { id, title, product_type, created_at };

  const params = {
    MessageBody: JSON.stringify(eventBody),
    MessageDeduplicationId: "TheWhistler", // Required for FIFO queues
    MessageGroupId: "Group1", // Required for FIFO queues
    QueueUrl: QUEUE_URL,
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
