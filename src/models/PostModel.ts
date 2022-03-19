import mongoose from 'mongoose';

const postModelSchema = new mongoose.Schema({
  avatarUrl: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  dateReadable: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
    default: [],
  },
  uuid: {
    type: String,
    required: true,
  },
  numberOfComments: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose?.models?.Post ||
  mongoose.model(`Post`, postModelSchema);
