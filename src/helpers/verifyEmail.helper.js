import { transport } from "./email.helper.js";

const verifyEmail = async (email, verifyCode) => {
  try {
    await transport.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: "Mail de verificacion de cuenta",
      html: `
      <h1>Codigo de verificacion de cuenta: ${verifyCode}</h1>
      <a href="${process.env.BASE_URL}/verify/${email}">VERIFICAR!</a>
      `,
    });
  } catch (error) {
    throw error;
  }
};

export default verifyEmail;