import connection from "../../db_connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

// login user
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return emptyFieldsProvided(res);
    }

    const [alreadyExistingUser] = await connection.query(
      "select * from users where email = ?;",
      [email]
    );

    if (alreadyExistingUser.length <= 0) {
      return invalidCredentialError(res);
    }
    const verifyPassword = await bcrypt.compare(
      password,
      alreadyExistingUser[0].password
    );

    if (!verifyPassword) return invalidCredentialError(res);

    const token = jwt.sign(
      {
        email,
        username: alreadyExistingUser[0].username,
        phone_number: alreadyExistingUser[0].phone_number,
      },
      JWT_SECRET
    );

    res.status(200).json({ success: true, data: { token } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong." });
  }
};

// register new user
const signup = async (req, res) => {
  try {
    console.log(req.body);
    const {
      username,
      email,
      password,
      phone_number,
      role,
      address,
      full_name,
      gender,
    } = req.body;

    if (
      !username ||
      !full_name ||
      !email ||
      !password ||
      !phone_number ||
      !role ||
      !address ||
      !gender
    ) {
      return emptyFieldsProvided(res);
    }

    const [alreadyExistingUser] = await connection.query(
      "select * from users where email = ? or username = ? or phone_number = ?",
      [email, username, phone_number]
    );

    if (alreadyExistingUser.length > 0) {
      return res.status(400).json({
        success: false,
        error: "User with that email, username or phone number already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.query(
      `insert into users (username, full_name, email, phone_number, role, password, address, gender) values (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        username,
        full_name,
        email,
        phone_number,
        role,
        hashedPassword,
        address,
        gender,
      ]
    );

    const token = jwt.sign({ email, username, phone_number }, JWT_SECRET);

    res.status(200).json({ success: true, data: { token } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong." });
  }
};

// throw error when empty data is provided on login or signup
function emptyFieldsProvided(res) {
  return res
    .status(400)
    .json({ success: false, error: "Please add all fields." });
}

// throw error when invalid credentials is provided
function invalidCredentialError(res) {
  return res.status(400).json({ success: false, error: "Invalid credentials" });
}

export { signin, signup };
