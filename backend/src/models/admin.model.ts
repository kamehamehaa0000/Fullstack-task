import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IAdmin extends Document {
  username: string
  password: string
  comparePassword: (password: string) => Promise<boolean>
}

const AdminSchema: Schema<IAdmin> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

AdminSchema.pre<IAdmin>('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

AdminSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

const Admin = mongoose.model<IAdmin>('Admin', AdminSchema)
export default Admin
