import Todo from '../../../models/Todo'
import authenticate from '../../../utils/authenticate'

const todos = async (parent, args, { request }) => {
  const id = authenticate(request)
  return Todo.find({ creator: id })
}

const todo = async (parent, args, { request }) => {
  authenticate(request)
  return Todo.findById(args.id)
}

export default { todos, todo }
