import { Request, Response, NextFunction } from 'express'
import User, { UserStatus } from '@/models/user'
import { sendEmail } from '@/services/mailer'

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body

    const activationCode = (Math.random() + 1)
      .toString(36)
      .substring(7)
      .toUpperCase()

    await User.create({
      name,
      email,
      password,
      status: UserStatus.INACTIVE,
      activationCode,
    })

    await sendEmail({
      name,
      email,
      subject: 'Book Library - Activate your account',
      body: `<p style="font-size: 18px; text-align: center;">Activation Code <br/> <strong>${activationCode}</strong></p>`,
    })

    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
