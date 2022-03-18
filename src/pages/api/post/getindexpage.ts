import { connect } from '@/database/database';
import PostModel from '@/models/PostModel';
import { IPost } from '@/types/post';
import sanitize from 'mongo-sanitize';
import type { NextApiRequest, NextApiResponse } from 'next';

connect();

export type PostGetData = {
  posts: Array<IPost>;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PostGetData>,
) => {
  // get page number
  const page = Number(sanitize(req.query.page));
  // default 10 per page
  const perPage = 10;

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

  res.status(400).send({} as any);
};

export default handler;
