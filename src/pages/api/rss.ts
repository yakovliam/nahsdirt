import { executeResultingFunctionWithCache } from '@/cache';
import type { NextApiRequest, NextApiResponse } from 'next';
import Parser, { Output } from 'rss-parser';

const parser: Parser = new Parser();

export interface RssFeedData extends Output<unknown> {
  extension: string;
}

export type PostGetData = {
  feed: RssFeedData;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PostGetData>,
) => {
  // get nahs rss feed
  const feed = await executeResultingFunctionWithCache<RssFeedData>(
    async () => {
      return {
        ...(await parser.parseURL(
          'https://www.napls.us/site/RSS.aspx?DomainID=4&ModuleInstanceID=592&PageID=1&PMIID=6560',
        )),
        extension: '',
      };
    },
    'napls-rss-feed',
  );

  // slice to get first 10
  let feedItems = feed.items;
  feedItems = feedItems.slice(0, 10);

  feed.items = feedItems;

  // parse rss
  res.status(200).send(feed);
};

export default handler;
