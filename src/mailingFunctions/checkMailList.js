const send3rdEmail = require("./send3rdEmail");
const config = require("../../config");

// VARIABLES //
let token;
let access_token;

// FUNCTIONS //
function login() {
  return new Promise((resolve, reject) => {
    var https = require("follow-redirects").https;
    var fs = require("fs");
    var options = {
      method: "POST",
      hostname: "api-sec-vlc.hotmart.com",
      path: `/security/oauth/token?grant_type=client_credentials&client_id=${config.hotmartId}&client_secret=${config.hotmartClientSecret}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: config.hotmartAuthoerization,
      },
      maxRedirects: 20,
    };
    var req = https.request(options, function (res) {
      var chunks = [];
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        token = JSON.parse(body);
        access_token = token.access_token;
        resolve();
      });
      res.on("error", function (error) {
        console.error(error);
        reject(error);
      });
    });
    req.end();
  });
}

async function checkMailList(email) {
  console.log("Starting mail list check");
  await login();
  var request = require("request");
  var options = {
    method: "GET",
    url: "https://developers.hotmart.com/payments/api/v1/sales/history?transaction_status=APPROVED&product_id=2720532&max_results=999",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);

    const responseBody = JSON.parse(response.body);
    const mailList = responseBody.items.map((item) => item.buyer.email);
    const isInList = mailList.includes(email);
    console.log("\n");
    console.log(mailList);
    console.log("\n");
    console.log("isInList: " + isInList);
    if (!isInList) {
      console.log("Mail not on list");
      console.log("\nCalling function: send3rdEmail");
      send3rdEmail(email);
    } else {
      console.log("E-mail on list");
      console.log("\nEnd");
    }
  });
}

module.exports = checkMailList;
