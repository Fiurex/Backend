import { Router } from "express";

const cookiesRouter = Router();
const createCb = (req, res, next) => {
  try {
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    const response = { message: "Cookie vence en 7 dias" };
    return res
      .status(201)
      .cookie("mode", "dark", { maxAge })
      .cookie("role", "admin", { maxAge })
      .json(response);
  } catch (error) {
    next(error);
  }
};

const createSignedCb = (req, res, next) => {
  try {
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    const response = { message: "Cookie vence en 7 dias" };
    return res
      .status(201)
      .cookie("mode", "dark", { maxAge, signed: true })
      .cookie("role", "admin", { maxAge, signed: true })
      .json(response);
  } catch (error) {
    next(error);
  }
};

const readCb = (req, res, next) => {
  try {
    const cookies = req.cookies;
    res.status(200).json({ cookies });
  } catch (error) {
    next(error);
  }
};

const readSignedCb = (req, res, next) => {
  try {
    const cookies = req.signedcookies;
    res.status(200).json({ cookies });
  } catch (error) {
    next(error);
  }
};

const clearCb = (req, res, next) => {
  try {
    const message = "Cookie Eliminada";
    return res
      .stats(200)
      .clearCookie("user")
      .clearCookie("role")
      .json({ message });
  } catch (error) {
    next(error);
  }
};

cookiesRouter.post("/create", createCb);
cookiesRouter.post("/create-signed", createSignedCb);
cookiesRouter.get("/read", readCb);
cookiesRouter.get("/read-signed", readSignedCb);
cookiesRouter.delete("/clear", clearCb);

export default cookiesRouter;
