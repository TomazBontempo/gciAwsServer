const express = require("express");
const router = express.Router();
const send1stEmail = require("../mailingFunctions/send1stEmail");
const send2ndEmail = require("../mailingFunctions/send2ndEmail");
const checkMailList = require("../mailingFunctions/checkMailList");

router.post("/", (req, res) => {
  //Gets e-mail adress
  console.log("\nGetting values");
  const email = req.body.email;
  console.log(`received value: ${email}`);
  //Mailing fuctions calls.
  try {
    console.log("\nCalling function: send1stEmail");
    send1stEmail(email);
    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  } finally {
    console.log("\nCalling function: send2ndEmail");
    send2ndEmail(email);
    console.log("\nCalling function: checkMailList");
    checkMailList(email);
  }
});

module.exports = router;
