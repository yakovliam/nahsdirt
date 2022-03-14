import axios from 'axios';
import { useState, useEffect } from 'react';
import Post from '../types/post/index';
import { PostGetData } from '../pages/api/posts/get';

export default function usePostQuery(page: number) {
  const [posts, setPosts] = useState<Array<Post>>([]);

  // whenever page changes, fetch from api
  useEffect(() => {
    axios.get(`/api/posts/get`, { params: { page: page } }).then((response) => {
      const data: PostGetData = response.data;

      // put all new posts into the array of total rendered posts
      setPosts([...posts, ...data.posts]);
    });
  }, [page]);

  return { posts };
}
