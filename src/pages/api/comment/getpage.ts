import { connect } from '@/database/database';
import sanitize from 'mongo-sanitize';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IComment } from '../../../types/comment/index';
import CommentModel from '@/models/CommentModel';

connect();

export type CommentGetData = {
  comments: Array<IComment>;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CommentGetData>,
) => {
  let parent = req.query.parent;
  let page = Number(req.query.page);

  if (
    page === null ||
    page === undefined ||
    parent === null ||
    parent === undefined
  ) {
    return res.status(400).send({} as any);
  }

  // get parent uuid
  parent = String(sanitize(req.query.parent));
  // get page number
  page = Number(sanitize(req.query.page));
  // default 10 per page
  const perPage = 10;

  try {
    // get comments
    const comments = await CommentModel.find({ parent: parent })
      .limit(perPage)
      .skip(perPage * page)
      .sort('-date');

    return res.status(200).send({ comments: comments });
  } catch (e) {
    console.error(e);
  }

  res.status(400).send({} as any);
};

export default handler;
