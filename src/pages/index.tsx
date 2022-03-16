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
        animation={'fadeIn'}
        overflow={'auto'}
      >
        {/* list of posts, paginated */}
        <InfiniteScroll
          step={1}
          onMore={() => {
            // increase page (which inherently loads more items)
            setPage(page + 1);
          }}
          items={posts}
        >
          {(item: IPost) => (
            <Box flex="grow" margin={{ top: 'small' }}>
              <Post key={Math.random()} post={item} />
            </Box>
          )}
        </InfiniteScroll>
      </Box>
    </Box>
  );
}
