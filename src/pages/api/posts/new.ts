import { connect } from '@/database/database';
import PostModel from '@/models/PostModel';
import type { NextApiRequest, NextApiResponse } from 'next';
import IPost from '@/types/post';

connect();

export type PostNewData = {
  success: boolean;
  message: string | null;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PostNewData>,
) => {
  if (req.method !== 'POST') {
    return res.status(400).send({
      success: false,
      message: 'this api path only allows POST requests',
    });
  }

  // get body
  const body = req.body;

  // get post from body
  const post: IPost = body.post as IPost;

  try {
    // create new
    await PostModel.create({
      avatarUrl: post.avatarUrl,
      title: post.title,
      content: post.content,
      date: new Date().toString(),
    });

    return res.status(200).send({ success: true, message: null });
  } catch (e) {
    console.error(e);
  }

  res.status(400).send({ success: false, message: 'an error occurred' });
};

export default handler;
