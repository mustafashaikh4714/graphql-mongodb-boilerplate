import User from '../../../models/User'

const Todo = {
  async creator(parent, args, { db }, info) {
    return User.findOne({ _id: parent.creator })
  }
}

export default Todo
