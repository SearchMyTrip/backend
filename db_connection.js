import mysql from "mysql2/promise";
import configs from "./config.js";

const connection =  await mysql.createConnection(configs.DB_URL);

export default connection;