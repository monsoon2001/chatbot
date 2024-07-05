// import mongoose from "mongoose";
// import chatSchema from "./chat-model.js";
// import feedbackSchema from "./feedback-model.js"; // Import feedback schema

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   chats: [chatSchema],
//   feedback: [feedbackSchema], // Add feedback array field
// });

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";
import chatSchema from "./chat-model.js";
import feedbackSchema from "./feedback-model.js"; // Import feedback schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0, // Add role field with default value 0
  },
  chats: [chatSchema],
  feedback: [feedbackSchema], // Add feedback array field
});

export default mongoose.model("User", userSchema);

