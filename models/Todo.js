import mongoose, { Schema } from 'mongoose'
const TodoSchema = new Schema(
  {
    title: String,
    body: String,
    isCompleted: Boolean,
    creator: { type: Schema.Types.ObjectId }
  },
  { timestamps: true }
)

const Todo = mongoose.model('todo', TodoSchema)
export default Todo
