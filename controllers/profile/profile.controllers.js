import connection from "../../db_connection.js";

const getMyDetails = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong." });
  }
};

export { getMyDetails };
