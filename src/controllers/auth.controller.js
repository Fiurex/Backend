import { usersService } from "../services/service.js";
class AuthController {
  registerCb = async (req, res) => {
    return res.redirect("/");
  };

  loginCb = async (req, res) => {
    const { _id } = req.user;
    const opts = { maxAge: 7 * 24 * 60 * 60 * 1000 };
    res.cookie("token", req.user.token, opts).json200(_id, "Logged in");
  };

  signoutCb = (req, res) => {
    res.clearCookie("token"), json200(req.user._id, "Sign Out");
  };

  onlineCb = (req, res) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Not Authenticated", error: true });
    }
    res.json200(null, "Is Online");
  };
  badAuth = (req, res) => {
    res.json401();
  };

  forbidden = (req, res) => {
    res.json403();
  };

  verifyUserCb = async (req, res) => {
    const { email, verifyCode } = req.params;
    const user = await usersService.readBy({ email, verifyCode });
    if (!user){
      return res.json404()
    }
    await usersService.updateById(user._id, { isVerified: true });
    res.json200(user, "Verified!");
  };
}

const authController = new AuthController();
export default authController;

const {
  registerCb,
  loginCb,
  signoutCb,
  onlineCb,
  badAuth,
  forbidden,
  verifyUserCb,
} = authController;
export {
  registerCb,
  loginCb,
  signoutCb,
  onlineCb,
  badAuth,
  forbidden,
  verifyUserCb,
};
