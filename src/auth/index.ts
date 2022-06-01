import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from '@/models/user'

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      session: false,
    },
    async (email, password, cb) => {
      try {
        const user = await User.findOne({ email })

        if (!user)
          return cb(null, false, { message: 'Incorrect email or password' })

        if (!(await user.checkPassword(password))) {
          return cb(null, false, { message: 'Wrong Password' })
        }

        return cb(null, user, { message: 'Logged in' })
      } catch (err) {
        return cb(err)
      }
    },
  ),
)

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: 'library',
      audience: 'reader',
    },
    async function verify(token, done) {
      try {
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    },
  ),
)
