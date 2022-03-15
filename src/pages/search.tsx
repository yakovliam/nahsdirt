import Post from '@/components/post';
import IPost from '@/types/post';
import { Box, Heading, TextInput, InfiniteScroll } from 'grommet';
import { Search } from 'grommet-icons';
import { useState } from 'react';
import usePostSearchQuery from '../hooks/postsearchquery';

const SearchPage = () => {
  const [searchTag, setSearchTag] = useState('');
  const [page, setPage] = useState(0);
  const { posts, clearPosts } = usePostSearchQuery(page, [searchTag]);

  return (
    <Box fill flex="shrink" align="center">
      <Box
        pad={'medium'}
        height={{ min: 'small' }}
        align="center"
        justify="start"
        width="medium"
        gap={'medium'}
      >
        <Heading margin={'none'}>Search</Heading>
        <Box direction="row" align="center">
          <TextInput
            value={searchTag}
            onChange={(event) => {
              // set search tag
              setSearchTag(event.target.value);
              // also reset page #
              setPage(0);
              // and clear posts
              clearPosts();
            }}
            placeholder="search by tag"
            icon={<Search />}
          />
        </Box>
      </Box>
      <Box
        align={'center'}
        pad={'medium'}
        direction="column"
        round={'small'}
        gap={'small'}
        animation={'fadeIn'}
        overflow={'scroll'}
      >
        {/* list of posts, paginated */}
        <InfiniteScroll
          step={3}
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
};

export default SearchPage;
