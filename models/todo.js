import { Schema, model } from "mongoose"

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

export default model("Todo", schema)
