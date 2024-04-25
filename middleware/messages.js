const transporter = require("../middleware/nodemailer");

/* const { transporter } = require("./nodemailer"); */

/* const welcomeUser = async (emailUsuario) => { */
const welcomeUser = async () => {
  try {
    const info = await transporter.sendMail({
      from: `"Maddison Foo Koch 👻" <${process.env.GMAIL_MAIL}>`, // sender address
      //to: `${emailUsuario}`,
      to: `${process.env.GMAIL_MAIL}`,
      subject: "Hello ✔", // Subject line
      html: "<b>Hello world?</b>", // html body
    });
    console.log(info);
    if (info.response.includes("OK")) {
      return 200;
    }
  } catch (error) {
    console.log(error);
    return 500;
  }
};

const recoveryPass = async (emailUsuario) => {
  try {
    const info = await transporter.sendMail({
      from: `"Recuperacion de contraseña" <${process.env.GMAIL_MAIL}>`, // sender address
      //to: `${emailUsuario}`,
      to: `${emailUsuario}`,
      subject: "Recupera tu contraseña en pocos pasos ✔", // Subject line
      html: "<b>Haz click en el siguiente enlace</b>", // html body
    });
    if (info.response.includes("OK")) {
      return 200;
    }
  } catch (error) {
    return 500;
  }
};

module.exports = {
  welcomeUser,
  recoveryPass,
};
