import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export type AvatarGenerateData = {
  imageUrl: string | null | undefined;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<AvatarGenerateData>,
) => {
  // get random image
  try {
    const response = await axios.get('https://picsum.photos/200');
    const url: string | undefined = response.request.res.responseUrl;

    return res.status(200).send({ imageUrl: url });
  } catch (e) {
    console.error(e);
  }

  res.status(400).send({ imageUrl: null });
};

export default handler;
