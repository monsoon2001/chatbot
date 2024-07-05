import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  sentiment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

export default feedbackSchema;
