import Todo from '../../../models/Todo'
import authenticate from '../../../utils/authenticate'

const createTodo = async (parent, args, { request }, info) => {
  const id = authenticate(request)

  const doesTodoAlreadyCreated = await Todo.findOne({
    title: args.data.title,
    creator: id
  })

  if (doesTodoAlreadyCreated) {
    throw new Error(`Todo with ${args.title} title has already created!`)
  }

  const newTodo = await new Todo({
    ...args.data,
    creator: id
  }).save()

  return newTodo
}

const updateTodo = async (parent, args, { request }, info) => {
  const id = authenticate(request)

  const todo = await Todo.findOne({ _id: args.data.id, creator: id })
  if (!todo) {
    throw new Error('Invalid todo!')
  }

  return Todo.findByIdAndUpdate(
    args.data.id,
    { $set: { ...args.data } },
    { new: true }
  )
}

const markTodoAsComplete = async (parent, args, { request }, info) => {
  const id = authenticate(request)

  const doesUserHasTodo = await Todo.findOne({ _id: args.id, creator: id })
  if (!doesUserHasTodo) {
    throw new Error('Invalid todo!')
  }

  return Todo.findByIdAndUpdate(
    args.id,
    { $set: { isCompleted: true } },
    { new: true }
  )
}

const deleteTodo = async (parent, args, { request }, info) => {
  const id = authenticate(request)

  const doesUserHasTodo = await Todo.findOne({ _id: args.id, creator: id })
  if (!doesUserHasTodo) {
    throw new Error('Invalid todo!')
  }
  const todo = await Todo.deleteOne({ _id: args.id })

  if (todo.deletedCount === 1) {
    return `Todo ${doesUserHasTodo.title} deleted successfully.`
  } else {
    return `Unable to delete todo ${doesUserHasTodo.title}.`
  }
}

export default { createTodo, updateTodo, markTodoAsComplete, deleteTodo }
