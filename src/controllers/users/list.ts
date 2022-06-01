import { Request, Response, NextFunction } from 'express'
import User from '@/models/user'

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    next(err)
  }
}
