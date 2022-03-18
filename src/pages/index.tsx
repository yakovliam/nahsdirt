import { Box } from 'grommet';
import usePostIndexQuery from '../hooks/postindexquery';
import { useState } from 'react';
import PostScrollContainer from '@/components/post/container';
import useResponsive from '../hooks/responsive';
import RssFeed from '@/components/rss';

const EVENTS_DISPLAY_MINIMUM_WIDTH = 1330;

export default function HomePage() {
  const [page, setPage] = useState(0);
  const { posts, hasQueried: postsHaveQueried } = usePostIndexQuery(page);

  const { rawWidth, isMobile } = useResponsive();

  return (
    <Box fill overflow={{ vertical: 'auto', horizontal: 'hidden' }}>
      <Box direction="row" justify="around">
        {!isMobile && (
          <Box flex animation={'fadeIn'}>
            {rawWidth > EVENTS_DISPLAY_MINIMUM_WIDTH && postsHaveQueried && (
              <RssFeed />
            )}
          </Box>
        )}
        <Box
          pad={'medium'}
          direction="column"
          margin={{ top: 'medium' }}
          animation={'fadeIn'}
          align="center"
        >
          <PostScrollContainer
            onMore={() => {
              // increase page (which inherently loads more items)
              setPage(page + 1);
            }}
            items={posts}
          />
        </Box>
        {!isMobile && <Box flex />}
      </Box>
    </Box>
  );
}
