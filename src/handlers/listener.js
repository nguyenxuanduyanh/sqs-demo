import { SendMessageCommand } from  "@aws-sdk/client-sqs";
import  { SQSClient } from "@aws-sdk/client-sqs";

const QUEUE_URL = process.env.QUEUE_URL;

// Set the AWS Region.
const REGION = "us-east-1"
// Create SQS service object.
const sqsClient = new SQSClient({ region: REGION });


const params = {
    MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
    // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
    // MessageGroupId: "Group1",  // Required for FIFO queues
    QueueUrl: QUEUE_URL //SQS_QUEUE_URL; e.g., 'https://sqs.REGION.amazonaws.com/ACCOUNT-ID/QUEUE-NAME'
  };

exports.index = async (event) => {
    console.log('VAO LISTENER');
    console.log("QUEUE_URL",QUEUE_URL);

    try {
        const data = await sqsClient.send(new SendMessageCommand(params));
        console.log("Success, message sent. MessageID:", data.MessageId);
        return data; // For unit tests.
      } catch (err) {
        console.log("Error", err);
      }

    let responseBody = {
        message: 'Push message successfully',
    };

    let response = {
        statusCode: 200,
        body: JSON.stringify(responseBody)
    };

    return response;
}