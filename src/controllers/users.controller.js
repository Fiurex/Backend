import sendEmailHelper from "../helpers/email.helper.js"
import { usersRepository } from "../repositories/repository.js";

const updateUser = async (req, res) => {
  try {
    const data = req.body;
    const { _id } = req.user;
    const response = await usersRepository.updateById(_id, data);

    res.status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendEmail = async (req, res) => {
  try {
    const data = req.body;
    const {email} = req.params;
    await sendEmailHelper(email)
    res.status(200).json({
      response:"Email sent!",
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {updateUser, sendEmail};