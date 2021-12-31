exports.index = async function (event, context) {
  console.log("event", event);

  event.Records.forEach((record) => {
    const { body } = record;
    console.log(body);
  });
  return {};
};
