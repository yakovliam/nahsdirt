import { Box } from 'grommet';
import usePostIndexQuery from '../hooks/postindexquery';
import { useState } from 'react';
import PostScrollContainer from '@/components/post/container';
import useResponsive from '../hooks/responsive';
import RssFeed from '@/components/rss';

const EVENTS_DISPLAY_MINIMUM_WIDTH = 860;

export default function HomePage() {
  const [page, setPage] = useState(0);
  const { posts, hasQueried: postsHaveQueried } = usePostIndexQuery(page);

  const { rawWidth, isMobile } = useResponsive();

  return (
    <Box fill overflow={{ vertical: 'scroll', horizontal: 'hidden' }}>
      <Box direction="row" justify="around">
        {!isMobile && (
          <Box
            height={'max-content'}
            flex
            animation={'fadeIn'}
            pad={{ bottom: 'small' }}
          >
            {rawWidth > EVENTS_DISPLAY_MINIMUM_WIDTH && postsHaveQueried && (
              <RssFeed />
            )}
          </Box>
        )}
        <Box
          direction="column"
          animation={'fadeIn'}
          margin={{ top: 'large' }}
          height="fit-content"
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
