import { Request, Response, NextFunction } from 'express'
import UserModel, { UserStatus } from '@/models/user'

export const activate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code: activationCode } = req.params

    if (!activationCode) {
      return res.status(400).json({
        message: 'Activation code is required',
      })
    }

    const user = await UserModel.findOne({
      activationCode,
      status: UserStatus.INACTIVE,
    }).exec()

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    user.activationCode = null
    user.status = UserStatus.ACTIVE

    await user.save()

    return res.status(200).json({
      message: 'User activated',
    })
  } catch (error) {
    next(error)
  }
}
