const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pool = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {

  try {

    const { username, password } = req.body;

    console.log("Register Request:", username);

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users(username,password)
       VALUES($1,$2)`,
      [username, hashedPassword]
    );

    console.log("Insert Success");

    res.json({
      message: "User Created"
    });

  } catch (err) {

    console.error("REGISTER ERROR:");
    console.error(err);

    res.status(500).json({
      message: err.message
    });

  }

});

router.post("/login", async (req, res) => {

  const { username, password } = req.body;

  try {

    const userResult = await pool.query(
      `SELECT * FROM users
       WHERE username=$1`,
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        message: "User Not Found"
      });
    }

    const user = userResult.rows[0];

    const valid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!valid) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    const profileResult =
      await pool.query(
        `SELECT * FROM profiles
         WHERE user_id=$1`,
        [user.id]
      );

    const token = jwt.sign(
      {
        id: user.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      token,
      hasProfile:
        profileResult.rows.length > 0
    });

  } catch (err) {

  console.error("REGISTER ERROR:", err);

  res.status(500).json({
    message: err.message
  });

}

});
module.exports = router;