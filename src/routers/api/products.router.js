import RouterHelper from "../../helpers/router.helper.js";
import { create, readAll, readById, updateById, destroyById } from "../../controllers/product.controller.js";




class ProductsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], create);
    this.read("/", ["PUBLIC"], readAll);
    this.read("/:id", ["PUBLIC"], readById);
    this.update("/:id", ["ADMIN"], updateById);
    this.destroy("/:id", ["ADMIN"], destroyById);
  };
}

const productsRouter = new ProductsRouter().getRouter();
export default productsRouter;
