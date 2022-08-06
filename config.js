import dotnev from "dotenv";

dotnev.config();

const { DB_USER, DB_PASSWORD } = process.env;

const configs = {
  DB_URL: `mysql://${DB_USER}:${DB_PASSWORD}@n7awt41oslgj.ap-south-2.psdb.cloud/traverse?ssl={"rejectUnauthorized":true}`,
};

export default configs;