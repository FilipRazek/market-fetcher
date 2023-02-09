import * as dotenv from "dotenv";
dotenv.config();

export const handler = async (event, context) => {
  console.log(process.env.APIFY_TOKEN);

  return {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
};
