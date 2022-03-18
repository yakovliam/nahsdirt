import axios from 'axios';
import { useState, useEffect } from 'react';
import { PostGetData } from '../pages/api/post/get';
import { IPost } from '@/types/post';

export default function usePostQuery(uuid: string) {
  const [post, setPost] = useState<IPost | null>(null);
  const [isError, setIsError] = useState(false);

  // whenever page changes, fetch from api
  useEffect(() => {
    axios
      .get(`/api/post/get`, { params: { uuid: uuid } })
      .then((response) => {
        const data: PostGetData = response.data;

        // put all new posts into the array of total rendered posts
        setPost(data.post);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [uuid]);

  return { post, isError };
}
