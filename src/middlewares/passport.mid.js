import passport from "passport";
import { Strategy as Localstrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { usersManager } from "../data/managers/mongo/manager.mongo.js";
import { createHash, compareHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";

const callbackURL = "http://localhost:8080/api/auth/google/redirect";

passport.use(
  //nombre de la estrategia de autenticacion/autorizacion
  "register",
  //estrategia de autenticacion/autorizacion
  new Localstrategy(
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
          //const error = new Error("Invalid credencial");
          //error.statuscode = 401;
          //throw error;
          done(null, null, { message: "Invalid Credentials", statusCode: 401 });
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
  new Localstrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let user = await usersManager.readBy({ email });
        if (!user) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        const verifyPass = await compareHash(password, user.password);
        if (!verifyPass) {
          done(null, null, { message: "Invalid Credentials", statusCode: 401 });
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
        done(error + "hola");
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
    async (jwtPayload, done) => {
      try {
        // Lo ideal es buscar por ID, que suele ser _id en Mongo:
        const user = await usersManager.readBy({ _id: jwtPayload.user_id });
        if (!user) {
          // No lanzar error, usar done con null y false para indicar no autenticado

          done(null, null, { message: "Forbidden", statusCode: 401 });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
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
          done(null, null, { message: "Forbidden", statusCode: 401 });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const first_name = profile.name?.givenName;
        const last_name = profile.name?.familyName;
        const avatar = profile.photos?.[0]?.value;

        if (!email)
          return done(new Error("Email no encontrado en perfil de Google"));

        let user = await usersManager.readBy({ email });

        if (!user) {
          user = await usersManager.createOne({
            email,
            first_name,
            last_name,
            avatar,
            password: createHash(email),
            fromGoogle: true,
          });
        }

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
export default passport;
