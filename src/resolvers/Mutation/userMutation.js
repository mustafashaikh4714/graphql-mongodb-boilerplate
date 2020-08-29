import bcrypt from 'bcryptjs'
import validator from 'validator'
import User from '../../../models/User'
import authenticate from '../../../utils/authenticate'
import getHash from '../../../utils/getHash'
import getToken from '../../../utils/getToken'

const createUser = async (parent, args, {}, info) => {
  const doesUserExists = await User.findOne({ email: args.data.email })

  if (doesUserExists) {
    throw new Error('User with this email is already exists!')
  }

  if (!validator.isEmail(args.data.email)) {
    throw new Error('Invalid Email!')
  }

  const hashPassword = await getHash(args.data.password)
  const newUser = await new User({
    ...args.data,
    password: hashPassword,
    createdAt: new Date()
  }).save()

  return newUser
}

const updateUser = async (parent, args, { request }, info) => {
  const id = authenticate(request)
  return User.findByIdAndUpdate(id, { $set: { ...args.data } }, { new: true })
}
const login = async (parent, args, {}, info) => {
  if (!validator.isEmail(args.data.email)) {
    throw new Error('Invalid Email!')
  }

  const user = await User.findOne({ email: args.data.email })
  if (!user) {
    throw new Error('User not found!')
  }
  const isMatch = await bcrypt.compare(args.data.password, user.password)

  if (!isMatch) {
    throw new Error('Invalid Password!')
  }

  const token = getToken({ userId: user._id })
  return token
}

export default { login, createUser, updateUser }
