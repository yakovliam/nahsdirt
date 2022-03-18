import { connect } from '@/database/database';
import PostModel from '@/models/PostModel';
import { IPost } from '@/types/post';
import sanitize from 'mongo-sanitize';
import type { NextApiRequest, NextApiResponse } from 'next';

connect();

export type PostGetData = {
  post: IPost;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PostGetData>,
) => {
  // get post id
  const uuid = String(sanitize(req.query.uuid));

  try {
    // get post
    const post = await PostModel.findOne({ uuid: uuid });

    return res.status(200).send({ post: post });
  } catch (e) {
    console.error(e);
  }

  res.status(400).send({} as any);
};

export default handler;
