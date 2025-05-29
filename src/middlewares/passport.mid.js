import passport from "passport";
import { Strategy as localstoragy } from "passport-local";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { usersManager } from "../data/managers/mongo/manager.mongo.js";
import { createHash, compareHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";

passport.use(
  //nombre de la estrategia de autenticacion/autorizacion
  "register",
  //estrategia de autenticacion/autorizacion
  new localstoragy(
    //objeto de configuracion de la estrategia
    { passReqToCallback: true, usernameField: "email" },
    //callback con la logica para resolver la estrategia
    async (req, email, password, done) => {
      try {
        if (!req.body.first_name) {
          const error = new Error("Invalid data");
          error.statuscode = 400;
          throw error;
        }
        let user = await usersManager.readBy({ email });
        if (user) {
          const error = new Error("Invalid credencial");
          error.statuscode = 401;
          throw error;
        }
        req.body.password = createHash(req.body.password);
        user = await usersManager.createOne(req.body);
        /*el primer parametro de done es el error (si ocurre)
          el segundo parametro son los datos del usuario que se guardan en el objeto de req, es decir apartir de que se aplica este middleware: existe req.user */
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localstoragy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let user = await usersManager.readBy({ email });
        if (!user) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        const verifyPass = compareHash(password, user.password);
        if (!verifyPass) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        /*no necesito session porque trabajaremos con token */
        /*crear token y enviarlo al cliente*/
        const data = {
          user_id: user._id,
          email: user.email,
          role: user.role,
        };
        const token = createToken(data);
        user.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "user",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET,
    },
    async (data, done) => {
      try {
        const { user_id, email, role } = data;
        const user = await usersManager.readBy({ _id, email, role });
        if (!user) {
          const error = new Error("Forbidden");
          error.statusCode = 403;
          throw error;
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "admin",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET,
    },
    async (data, done) => {
      try {
        const { user_id, email, role } = data;
        const user = await usersManager.readBy({ _id, email, role });
        if (!user || user.role !== "ADMIN") {
          const error = new Error("Forbidden");
          error.statusCode = 403;
          throw error;
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
export default passport;
