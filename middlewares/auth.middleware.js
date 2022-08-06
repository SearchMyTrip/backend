import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import connection from "../db_connection.js";

dotenv.config();

const { JWT_SECRET } = process.env;

// verify the user via jwt token
const authenticateUser = async (req, res, next) => {
  try {
    const auth_header = req.headers["authorization"];
    const token = auth_header && auth_header.split(" ")[1];

    if (!token)
      return res.status(400).json({
        success: false,
        error: "You are not authorised. Please try re-login.",
      });

    jwt.verify(token, JWT_SECRET, async (err, payload) => {
      if (err)
        return res.status(400).json({
          succes: false,
          error: "You are not authorised. Please try re-login.",
        });

      const [userData] = await connection.query(
        "select * from users where email = ?",
        [payload.email]
      );
      console.log(userData)
      req.user = userData[0];
      next();
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
};

export { authenticateUser };
