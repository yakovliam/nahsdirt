import { CommentGetData } from '@/pages/api/comment/getpage';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { IComment } from '../types/comment/index';

export default function useCommentsQuery(parent: string, page: number) {
  const [comments, setComments] = useState<Array<IComment>>([]);

  // whenever page changes, fetch from api
  useEffect(() => {
    axios
      .get(`/api/comment/getpage`, { params: { page: page, parent: parent } })
      .then((response) => {
        const data: CommentGetData = response.data;

        // put all new comments into the array of total rendered comments
        setComments((c) => [...c, ...data.comments]);
      });
  }, [page, parent]);

  return { comments };
}
