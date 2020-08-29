import mongoose, { Schema } from 'mongoose'
const UserSchema = new Schema(
  {
    username: String,
    email: { type: String, unique: true },
    password: String
  },
  { timestamps: true }
)

const User = mongoose.model('user', UserSchema)
export default User
