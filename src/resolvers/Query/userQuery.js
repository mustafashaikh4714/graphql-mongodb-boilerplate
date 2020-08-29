import User from '../../../models/User'

const users = async (parent, args, {}, info) => {
  const users = await User.find().lean()
  return users
}

const me = () => {
  return {
    id: '12345',
    email: 'mustafa@gmail.com',
    username: 'Mustafa Shaikh',
  }
}

export default { users, me }
