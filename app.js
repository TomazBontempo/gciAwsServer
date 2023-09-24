const express = require("express");
const mailRouter = require("./src/routes/mail.js");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ msg: "Online" });
});

app.get("/test", (req, res) => {
  res.json({ msg: "test successful" });
});

app.use("/mails", mailRouter);

app.listen(3000, () => {
  console.log("Server online");
});
