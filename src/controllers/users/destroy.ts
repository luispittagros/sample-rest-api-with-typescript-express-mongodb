import { Request, Response, NextFunction } from 'express'
import User from '@/models/user'

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    return res.status(200).json({
      message: 'User deleted',
    })
  } catch (error) {
    next(error)
  }
}
