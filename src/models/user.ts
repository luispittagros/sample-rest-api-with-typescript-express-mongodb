import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IUser {
  name: string
  email: string
  password: string
  status: UserStatus
  activationCode?: string
}

export interface IUserDocument extends IUser, Document {
  checkPassword: (password: string) => Promise<boolean>
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
      index: true,
    },
    password: { type: String, required: true, minlength: 6, maxlength: 100 },
    status: { type: String, required: true, enum: Object.values(UserStatus) },
    activationCode: { type: String, required: false },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password
      },
    },
    timestamps: true,
  },
)

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }

  next()
})

UserSchema.methods.checkPassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

const User = model<IUserDocument>('User', UserSchema)

export default User
