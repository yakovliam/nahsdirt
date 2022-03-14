import { connect } from '@/database/database';
import PostModel from '@/models/PostModel';
import Post from '@/types/post';
import type { NextApiRequest, NextApiResponse } from 'next';

connect();

export type PostGetData = {
  posts: Array<Post>;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PostGetData>,
) => {
  // get page number
  const page = Number(req.query.page);
  // default 5 per page
  const perPage = 1;

  try {
    // mongoose get
    const posts = await PostModel.find()
      .limit(perPage)
      .skip(perPage * page)
      .sort('-date');

    return res.status(200).send({ posts: posts });
  } catch (e) {
    console.error(e);
  }

  res.status(400).send({ posts: [] });
};

export default handler;
