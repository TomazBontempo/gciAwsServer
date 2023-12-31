const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("../../config");

// Send 2nd Email function:
function send2ndEmail(emailAddress) {
  console.log("Starting 2nd mail");
  const OAuth2 = google.auth.OAuth2;
  const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);
  OAuth2_client.setCredentials({ refresh_token: config.refreshToken });
  const accessToken = OAuth2_client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: config.user,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      refreshToken: config.refreshToken,
      accessToken: accessToken,
    },
  });

  // Mail options:
  const mailOptions = {
    from: `GCinteligente <${config.user}>`,
    to: emailAddress,
    subject: "Curtiu nosso passo a passo?.",
    html: get_html_message(),
    attachments: [
      {
        filename: "title.png",
        path: "./imgs/title.png",
        cid: "title",
      },
      {
        filename: "logo.png",
        path: "./imgs/logo.png",
        cid: "logo",
      },
      {
        filename: "bcground.png",
        path: "./imgs/bcground.png",
        cid: "bcground",
      },
    ],
  };

  // Schedule and send:
  const twoDaysInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  setTimeout(function () {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("\n ⮞ 2nd mail sent: " + info.response);
      }
    });
  }, twoDaysInMilliseconds);
}

//Mail body:
function get_html_message() {
  return `
  <body  style="background-image: url(cid:bcground); background-size: 100%; background-repeat: no-repeat">
  <div style="text-align:center; color: white; background-color: rgba(0, 0, 0, 0.9)">
    <img width="800px" style="vertical-align: bottom" src="cid:title"/></br>
    <h1 style="color:#ffd058; font-family: impact;">E AI? CURTIU O NOSSO PASSO A PASSO RECLAMAÇÃO ANATEL?</h1>
  </br>
    <p style="font-size: large;">Então agora da uma olhada no conteúdo completo.</p>
    <p style="font-size: large;">
      Clique no link e garanta o Guia do Consumidor Inteligente com 50% de off! 
    </p>
    <div style="width: 50%; vertical-align: middle; margin: auto;">
    <img width="150px" " src="cid:logo"/>
  </div>
  <a style="color:#ffd058; font-size: 30px" href="https://pay.hotmart.com/Q80361170S?off=nuqocxfl"
      >Guia do consumidor inteligente</a
    >
</div>
</body>
`;
}

module.exports = send2ndEmail;
