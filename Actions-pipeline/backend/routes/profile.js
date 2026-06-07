const express = require("express");

const pool = require("../db");

const auth =
  require("../middleware/authMiddleware");

const router = express.Router();
router.post(
  "/profile",
  auth,
  async (req, res) => {

    const { full_name, age } =
      req.body;

    try {

      await pool.query(
        `INSERT INTO profiles
        (user_id,full_name,age)
         VALUES($1,$2,$3)`,
        [
          req.user.id,
          full_name,
          age
        ]
      );

      res.json({
        message: "Saved"
      });

    } catch (err) {

      res.status(500).json({
        message: err.message
      });

    }

  }
);
router.get(
  "/profile",
  auth,
  async (req, res) => {

    const result =
      await pool.query(
        `SELECT *
         FROM profiles
         WHERE user_id=$1`,
        [req.user.id]
      );

    res.json(
      result.rows[0]
    );

  }
);
router.put(
  "/profile",
  auth,
  async (req, res) => {

    const { age } = req.body;

    await pool.query(
      `UPDATE profiles
       SET age=$1
       WHERE user_id=$2`,
      [
        age,
        req.user.id
      ]
    );

    res.json({
      message: "Updated"
    });

  }
);
module.exports = router;