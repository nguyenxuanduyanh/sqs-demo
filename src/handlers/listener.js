const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});


exports.index = async (event)=>{
    console.log(event)
    return event
}
// exports.index = async function (event, context) {
//     event.Records.forEach(record => {
//         const { body } = record;
//         console.log(body);
//         let sqs = new AWS.SQS({apiVersion: '2012-11-05'});
//         let queueURL = "SQS_QUEUE_URL_DEMO";
//
//         let params = {
//             AttributeNames: [
//                 "SentTimestamp"
//             ],
//             MaxNumberOfMessages: 10,
//             MessageAttributeNames: [
//                 "All"
//             ],
//             QueueUrl: queueURL,
//             VisibilityTimeout: 20,
//             WaitTimeSeconds: 0
//         };
//     });
//     return {};
// }