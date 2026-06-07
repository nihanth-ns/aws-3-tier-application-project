require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes =
  require("./routes/auth");

const profileRoutes =
  require("./routes/profile");

const app = express();

app.use(cors());

app.use(express.json());

app.use(authRoutes);
app.use(profileRoutes);

app.get("/", (req, res) => {

  res.json({
    message:
      "Backend Running"
  });

});

app.listen(
  process.env.PORT,
  () => {

    console.log(
      `Server running on port ${process.env.PORT}`
    );

  }
);
const pool = require("./db");

pool.query("SELECT current_database()")
  .then(res => {
    console.log("CONNECTED TO:", res.rows[0].current_database);
  })
  .catch(err => console.log(err));

pool.query("SELECT * FROM users")
  .then(() => {
    console.log("USERS TABLE FOUND");
  })
  .catch(err => {
    console.log("USERS TABLE ERROR");
    console.log(err);
  });
pool.query(`
SELECT current_database(),
       current_user,
       inet_server_addr(),
       inet_server_port()
`)
.then(res => {
  console.log("DB INFO");
  console.log(res.rows[0]);
})
.catch(console.error);