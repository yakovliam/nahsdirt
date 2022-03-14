import mongoose from 'mongoose';

const postModelSchema = new mongoose.Schema({
  avatarUrl: {
    type: String,
    required: true,
  },
  title: {
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
});

export default mongoose.models.Post || mongoose.model(`Post`, postModelSchema);
