import { Request, Response, NextFunction } from 'express'
import UserModel from '@/models/user'

export const view = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const user = await UserModel.findById(id)

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    return res.status(200).json({
      data: user,
    })
  } catch (error) {
    next(error)
  }
}
