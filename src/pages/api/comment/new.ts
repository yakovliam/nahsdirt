import { connect } from '@/database/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import sanitize from 'mongo-sanitize';
import { IComment } from '../../../types/comment/index';
import CommentModel from '@/models/CommentModel';
import PostModel from '@/models/PostModel';

connect();

export type CommentNewData = {
  success: boolean;
  message: string | null;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CommentNewData>,
) => {
  if (req.method !== 'POST') {
    return res.status(400).send({
      success: false,
      message: 'this api path only allows POST requests',
    });
  }

  // get body
  const body = req.body;

  // get comment from body
  const comment: IComment = sanitize(body.comment) as IComment;

  if (
    !comment.avatarUrl ||
    !comment.content ||
    !comment.date ||
    !comment.parent
  ) {
    return res
      .status(400)
      .send({ success: false, message: 'post is missing required fields' });
  }

  try {
    // create new
    await CommentModel.create({
      avatarUrl: comment.avatarUrl,
      content: comment.content,
      date: new Date().getTime(),
      dateReadable: new Date().toLocaleString(),
      uuid: uuidv4(),
      parent: comment.parent,
    });

    // increase count of comments on parent
    await PostModel.findOneAndUpdate(
      { uuid: comment.parent },
      { $inc: { numberOfComments: 1 } },
    );

    return res.status(200).send({ success: true, message: null });
  } catch (e) {
    console.error(e);
  }

  res.status(400).send({ success: false, message: 'an error occurred' });
};

export default handler;
