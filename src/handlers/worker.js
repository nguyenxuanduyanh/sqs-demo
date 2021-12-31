exports.index = async (event) => {
  console.log("event", event);

  const message = await Promise.all(
    event.Records.forEach((record) => {
      const { body } = record;
      console.log(body);
      return body;
    })
  );

  return message;
};
