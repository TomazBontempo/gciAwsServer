const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("../../config");

// Send 1st Email function:
function send1stEmail(emailAddress) {
  console.log("Starting 1st mail");
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
    from: `GCinteligente <$${config.user}>`,
    to: emailAddress,
    subject: "Seu passo a passo reclamação ANATEL chegou.",
    html: get_html_message(),
    attachments: [
      {
        filename: "GCI passo a passo reclamação ANATEL.pdf",
        path: "./GCI passo a passo reclamação ANATEL.pdf",
      },
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

  // Send:
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("\n ⮞ 1st mail sent: " + info.response);
    }
  });
}

//Mail body:
function get_html_message() {
  return `
  <body  style="background-image: url(cid:bcground); background-size: 100%; background-repeat: no-repeat">
  <div style="text-align:center; color: white; background-color: rgba(0, 0, 0, 0.9)">
    <img width="800px" style="vertical-align: bottom" src="cid:title"/></br>
    <h1 style="color:#ffd058; font-family: impact;">PARABÉNS, SEU PASSO A PASSO RECLAMAÇÃO ANATEL CHEGOU!</h1>
    </br>
      <p style="font-size: large;">Você acaba de receber uma parte do Guia do consumidor inteligente.</p>
      <p style="font-size: large;">
        Esperamos que com esse passo a passo você resolva de vez seus problemas
        com internet.
      </p>
      <p style="font-size: large;">
        Sabemos que irá gosta do conteúdo, então segue o link para o guia
        completo com 50% de desconto!:
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

module.exports = send1stEmail;
