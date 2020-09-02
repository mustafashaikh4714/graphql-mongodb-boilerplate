const Todo = {
  async creator(parent, args, { creatorLoader }, info) {
    return creatorLoader.load(parent.creator)
    // return User.findOne({ _id: parent.creator })
  }
}

export default Todo
