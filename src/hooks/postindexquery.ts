import axios from 'axios';
import { useState, useEffect } from 'react';
import { PostGetData } from '../pages/api/post/getindexpage';
import { IPost } from '@/types/post';

export default function usePostIndexQuery(page: number) {
  const [posts, setPosts] = useState<Array<IPost>>([]);

  // whenever page changes, fetch from api
  useEffect(() => {
    axios
      .get(`/api/post/getindexpage`, { params: { page: page } })
      .then((response) => {
        const data: PostGetData = response.data;

        // put all new posts into the array of total rendered posts
        setPosts((p) => [...p, ...data.posts]);
      });
  }, [page]);

  return { posts };
}
