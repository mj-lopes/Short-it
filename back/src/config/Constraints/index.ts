require("dotenv").config();

export const config = {
  BASE_URL: process.env.BASE_URL,
  MONGO_CONNECTION: process.env.MONGO_CONNECTION,
};
