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
    <Box>
      <InfiniteScroll
        step={10}
        onMore={() => props.onMore()}
        items={props.items}
        replace={true}
      >
        {(item: IPost) => (
          <Box key={Math.random()} flex="grow" margin={{ bottom: 'medium' }}>
            <Post post={item} isInDetailedView={false} />
          </Box>
        )}
      </InfiniteScroll>
    </Box>
  );
};

export default PostScrollContainer;
