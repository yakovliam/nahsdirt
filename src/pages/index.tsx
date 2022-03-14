import Post from '@/components/post';
import { Box, InfiniteScroll } from 'grommet';
import usePostQuery from '../hooks/postquery';
import { useState } from 'react';
import IPost from '../types/post/index';

export default function Home() {
  const [page, setPage] = useState(0);
  const { posts } = usePostQuery(page);

  return (
    <Box fill flex align="center">
      <Box
        align={'center'}
        pad={'medium'}
        direction="column"
        margin={{ top: 'medium' }}
        round={'small'}
        gap={'small'}
        animation={'fadeIn'}
        overflow={'scroll'}
      >
        {/* list of posts, paginated */}
        <InfiniteScroll
          step={5}
          onMore={() => {
            // increase page (which inherently loads more items)
            setPage(page + 1);
          }}
          items={posts}
        >
          {(item: IPost) => <Post key={Math.random()} post={item} />}
        </InfiniteScroll>
      </Box>
    </Box>
  );
}
