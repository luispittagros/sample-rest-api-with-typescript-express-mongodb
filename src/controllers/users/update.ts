import { Request, Response, NextFunction } from 'express'
import UserModel from '@/models/user'

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const { name, email, password } = req.body

    const user = await UserModel.findById(id).exec()

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    if (name) {
      user.name = name
    }

    if (email) {
      user.email = email
    }

    if (password) {
      user.password = password
    }

    await user.save()

    return res.status(200).json({
      message: 'User updated',
      user,
    })
  } catch (error) {
    next(error)
  }
}
