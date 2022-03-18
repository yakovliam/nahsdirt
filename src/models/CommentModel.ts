import mongoose from 'mongoose';

const commentModelSchema = new mongoose.Schema({
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
  uuid: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Comment ||
  mongoose.model(`Comment`, commentModelSchema);
