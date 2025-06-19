import RouterHelper from "../../helpers/router.helper.js";
import passport from "../../middlewares/passport.mid.js";
import { updateUser, sendEmail } from "../../controllers/users.controller.js";

// Instanciamos RouterHelper (extiende Router)
const usersRouter = new RouterHelper();



// Usamos el método `update` propio de RouterHelper
usersRouter.update(
  "/",
  passport.authenticate("user", { session: false }),
  updateUser
);
usersRouter.read(
  "/:email",
  sendEmail,
)
export default usersRouter;