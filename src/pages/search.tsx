import PostScrollContainer from '@/components/post/container';
import { Box, Heading, TextInput, Keyboard, Button } from 'grommet';
import { FormSearch, Search } from 'grommet-icons';
import { useState, useCallback } from 'react';
import usePostSearchQuery from '../hooks/postsearchquery';

const SearchPage = () => {
  const [searchTag, setSearchTag] = useState('');
  const [hookedSearchTag, setHookedSearchTag] = useState('');
  const [page, setPage] = useState(0);
  const { posts, clearPosts } = usePostSearchQuery(page, [hookedSearchTag]);

  const search = useCallback(() => {
    // set hooked search tag to update
    setHookedSearchTag(searchTag);

    // also reset page #
    setPage(0);
    // and clear posts
    clearPosts();
  }, [searchTag, clearPosts, setPage]);

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
          <Keyboard onEnter={() => search()}>
            <TextInput
              value={searchTag}
              onChange={(event) => setSearchTag(event.target.value)}
              placeholder="search by tag"
              icon={<FormSearch />}
            />
          </Keyboard>
          <Button icon={<Search />} onClick={() => search()} />
        </Box>
      </Box>
      <Box
        align={'center'}
        pad={'medium'}
        direction="column"
        round={'small'}
        gap={'small'}
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
};

export default SearchPage;
