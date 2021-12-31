exports.index = async (event) => {
    console.log("event", event);

    const message =
        event.Records.forEach((record) => {
            console.log('record: ' + record);
            const body  = record.body;
            console.log('body: ' + body);
            return body;
        });

    return message;
};
