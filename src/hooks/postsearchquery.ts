import axios from 'axios';
import { useState, useEffect } from 'react';
import Post from '../types/post/index';
import { PostGetData } from '../pages/api/posts/get';
import { PostSearchProps } from '@/pages/api/posts/search';

export default function usePostSearchQuery(page: number, tags: Array<string>) {
  const [posts, setPosts] = useState<Array<Post>>([]);

  function clearPosts() {
    setPosts([]);
  }

  // whenever page changes, fetch from api
  useEffect(() => {
    // create search props
    const searchProps: PostSearchProps = { tags: tags };
    axios
      .get(`/api/posts/search`, {
        params: { page: page, searchProps: JSON.stringify(searchProps) },
      })
      .then((response) => {
        const data: PostGetData = response.data;

        // put all new posts into the array of total rendered posts
        setPosts((p) => [...p, ...data.posts]);
      });
  }, [page, JSON.stringify(tags)]);

  return { posts, clearPosts };
}
