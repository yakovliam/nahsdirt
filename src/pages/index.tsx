import { Box } from 'grommet';
import usePostIndexQuery from '../hooks/postindexquery';
import { useState } from 'react';
import PostScrollContainer from '@/components/post/container';

export default function HomePage() {
  const [page, setPage] = useState(0);
  const { posts } = usePostIndexQuery(page);

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
        <PostScrollContainer
          onMore={() => {
            // increase page (which inherently loads more items)
            setPage(page + 1);
          }}
          items={posts}
        />
      </Box>
    </Box>
  );
}
