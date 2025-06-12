import { Router } from "express";

class RouterHelper {
  constructor() {
    this.router = Router();
  }
  getRouter = () => this.router;
  applyMiddlewares = (middlewares) =>
    middlewares.map((mid) => async (req, res, next) => {
      try {
        await mid(req, res, next);
      } catch (error) {
        next(error);
      }
    });

  create = (path, ...middlewares) =>
    this.router.post(path, this.applyMiddlewares(middlewares));
  read = (path, ...middlewares) =>
    this.router.get(path, this.applyMiddlewares(middlewares));
  update = (path, ...middlewares) =>
    this.router.put(path, this.applyMiddlewares(middlewares));
  destroy = (path, ...middlewares) =>
    this.router.delete(path, this.applyMiddlewares(middlewares));
  use = (path, ...middlewares) =>
    this.router.use(path, this.applyMiddlewares(middlewares));
}

export default RouterHelper;
