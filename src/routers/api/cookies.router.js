import { Router } from "express";
import { createCb, createSignedCb, readCb, readSignedCb,clearCb } from "../../controllers/cookies.controller.js"

const cookiesRouter = Router();

cookiesRouter.post("/create", createCb);
cookiesRouter.post("/create-signed", createSignedCb);
cookiesRouter.get("/read", readCb);
cookiesRouter.get("/read-signed", readSignedCb);
cookiesRouter.delete("/clear", clearCb);

export default cookiesRouter;
