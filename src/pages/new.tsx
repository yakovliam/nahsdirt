import IPost from '@/types/post';
import axios from 'axios';
import { Box, Main, Heading, TextInput, TextArea, Button } from 'grommet';
import { useState } from 'react';
import { useAvatarData } from '../hooks/avatar';
import { useRouter } from 'next/router';

const New = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data } = useAvatarData();
  const router = useRouter();

  const sendDirt = () => {
    const post: IPost = {
      avatarUrl: data.imageUrl ? data.imageUrl : '',
      date: new Date().toString(),
      title: title,
      content: content,
    };

    // axios post
    axios.post(`/api/posts/new`, { post: post }).finally(() => {
      // router push to home
      router.push('/');
    });
  };

  return (
    <Box fill flex align="center">
      <Main>
        <Heading>Create new dirt</Heading>
        <Box gap="small">
          <TextInput
            placeholder="dirt title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            placeholder="the dirt"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <Button label="submit" onClick={() => sendDirt()} />
        </Box>
      </Main>
    </Box>
  );
};

export default New;
