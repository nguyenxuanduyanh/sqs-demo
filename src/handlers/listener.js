const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const QUEUE_URL = process.env.QUEUE_URL;

exports.index = async (event) => {
    console.log('VAO LISTENER');
    console.log("QUEUE_URL",QUEUE_URL);

    const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

    let params = {
        MessageBody: 'send queue demo',
        QueueUrl: QUEUE_URL
    };
    
    await sqs.sendMessage(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            // successful response
            console.log('Thanh Cong');
            console.log(data);
        }
    });

    let responseBody = {
        message: 'Push message successfully',
    };

    let response = {
        statusCode: 200,
        body: JSON.stringify(responseBody)
    };

    return response;
}