import React from 'react';
import { Box, InfiniteScroll } from 'grommet';
import { IComment } from '../../../types/comment/index';
import Comment from '..';

type CommentScrollContainerProps = {
  onMore: () => void;
  items: Array<IComment>;
};

const CommentScrollContainer = (props: CommentScrollContainerProps) => {
  return (
    // display 10 at once
    <InfiniteScroll step={10} onMore={() => props.onMore()} items={props.items}>
      {(item: IComment) => (
        <Box key={Math.random()} flex="grow" margin={{ top: 'small' }}>
          <Comment comment={item} />
        </Box>
      )}
    </InfiniteScroll>
  );
};

export default CommentScrollContainer;
