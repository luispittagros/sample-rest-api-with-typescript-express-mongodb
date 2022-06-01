import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { UserStatus } from '@/models/user'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const signIn = async (error, user) => {
      try {
        if (error || !user) {
          return next(new Error('An error occurred.'))
        }

        const { _id: id, name, email, status } = user

        const payload = {
          sub: id,
          iat: new Date().getTime(),
          exp: Date.now() + 60 * 60 * 1000,
          user: {
            id,
            name,
            email,
            active: status === UserStatus.ACTIVE,
          },
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          issuer: 'library',
          audience: 'reader',
        })

        return res.status(200).json({ token })
      } catch (e) {
        return next(e)
      }
    }

    passport.authenticate('local', { session: false }, signIn)(req, res, next)
  } catch (error) {
    next(error)
  }
}
