import Post from '..';
import { IPost } from '@/types/post';
import React from 'react';
import { Box, InfiniteScroll } from 'grommet';

type PostScrollContainerProps = {
  onMore: () => void;
  items: Array<IPost>;
};

const PostScrollContainer = (props: PostScrollContainerProps) => {
  return (
    // display 10 at once
    <InfiniteScroll step={10} onMore={() => props.onMore()} items={props.items}>
      {(item: IPost) => (
        <Box key={Math.random()} flex="grow" margin={{ top: 'small' }}>
          <Post post={item} isInDetailedView={false} />
        </Box>
      )}
    </InfiniteScroll>
  );
};

export default PostScrollContainer;
