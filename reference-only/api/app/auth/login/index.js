const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const userService = require("../../services/userService");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const obj = {
      username: username,
      password: password,
    };
    const User = await userService.findForLogin(obj);
    if (User) return done(null, User);
    return done(null, false, { message: "Invalid username or password" });
  })
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload);
    return done(null, { id: jwt_payload.id, username: jwt_payload.username });
  })
);

module.exports = passport;
