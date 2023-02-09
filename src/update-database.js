export const handler = async (event, context) => {
  console.log("event", event);

  return {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
};
