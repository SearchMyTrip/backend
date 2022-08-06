import connection from "../../db_connection.js";

const addFavourites = async (req, res) => {
  try {
    const { image, description, name, location, visited } = req.body;

    if (!image || !description || !name || !location || !visited)
      return res.status(400).json({ success: false, error: "Invalid data."});

    let [alreadyExistingFavourite] = await connection.query(
      "select * from favourites where uid = ? and name = ?",
      [req.user.uid, name]
    );
    if (alreadyExistingFavourite.length > 0) {
      return res
        .status(200)
        .json({ success: true, message: "Added to favourites." });
    }

    await connection.query(
      "insert into favourites values (?, ?, ? , ?, ? ,?);",
      [req.user.uid, image, name, description, location, visited]
    );

    res.status(200).json({ succes: true, message: "Added to favourites" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong." });
  }
};

export { addFavourites };
