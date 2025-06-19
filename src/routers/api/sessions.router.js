import { Router } from "express";
import { createCB,readCB,destroyCB } from "../../controllers/sessions.controller.js"

const sessionsRouter = Router()

sessionsRouter.post("/create", createCB)
sessionsRouter.get("/read", readCB)
sessionsRouter.delete("/destroy", destroyCB)

export default sessionsRouter;