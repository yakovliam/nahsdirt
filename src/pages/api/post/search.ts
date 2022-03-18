import { connect } from '@/database/database';
import PostModel from '@/models/PostModel';
import { IPost } from '@/types/post';
import type { NextApiRequest, NextApiResponse } from 'next';
import sanitize from 'mongo-sanitize';

connect();

export type PostSearchData = {
  posts: Array<IPost>;
};

export type PostSearchProps = {
  tags: Array<string>;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PostSearchData>,
) => {
  // get search props
  const searchProps: PostSearchProps = JSON.parse(
    sanitize(req.query.searchProps) as string,
  ) as PostSearchProps;
  // get page number
  const page = Number(sanitize(req.query.page));
  // default 10 per page
  const perPage = 10;

  try {
    // mongoose get
    const posts = await PostModel.find({ tags: { $in: searchProps.tags } })
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
