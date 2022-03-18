import { connect } from '@/database/database';
import PostModel from '@/models/PostModel';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IPost } from '@/types/post';
import sanitize from 'mongo-sanitize';
import { v4 as uuidv4 } from 'uuid';

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
  const post: IPost = sanitize(body.post) as IPost;

  const postContainsEmptyTags = post.tags.some((t: string) => !t || t === '');

  if (
    !post.avatarUrl ||
    !post.content ||
    !post.date ||
    !post.tags ||
    !post.title ||
    postContainsEmptyTags
  ) {
    return res.status(400).send({
      success: false,
      message: 'post is missing required fields or has empty tags',
    });
  }

  const date: Date = new Date();

  try {
    // create new
    await PostModel.create({
      avatarUrl: post.avatarUrl,
      title: post.title,
      content: post.content,
      date: date.getTime(),
      dateReadable: date.toLocaleString(),
      tags: post.tags,
      uuid: uuidv4(),
    });

    return res.status(200).send({ success: true, message: null });
  } catch (e) {
    console.error(e);
  }

  res.status(400).send({ success: false, message: 'an error occurred' });
};

export default handler;
