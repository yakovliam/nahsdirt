import axios from 'axios';
import { useState, useEffect } from 'react';
import { IPost } from '../types/post/index';
import { PostGetData } from '../pages/api/post/getindexpage';
import { PostSearchProps } from '@/pages/api/post/search';

export default function usePostSearchQuery(page: number, tags: Array<string>) {
  const [posts, setPosts] = useState<Array<IPost>>([]);

  // stringified tags
  const stringifiedTags = JSON.stringify(tags);

  function clearPosts() {
    setPosts([]);
  }

  // whenever page changes, fetch from api
  useEffect(() => {
    // create search props
    const searchProps: PostSearchProps = { tags: JSON.parse(stringifiedTags) };
    axios
      .get(`/api/post/search`, {
        params: { page: page, searchProps: JSON.stringify(searchProps) },
      })
      .then((response) => {
        const data: PostGetData = response.data;

        // put all new posts into the array of total rendered posts
        setPosts((p) => [...p, ...data.posts]);
      });
  }, [page, stringifiedTags]);

  return { posts, clearPosts };
}
