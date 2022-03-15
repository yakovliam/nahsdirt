import IPost from '@/types/post';
import axios from 'axios';
import {
  Box,
  Heading,
  TextInput,
  TextArea,
  Button,
  Tag,
  Keyboard,
} from 'grommet';
import { useState } from 'react';
import { useAvatarData } from '../hooks/avatar';
import { useRouter } from 'next/router';
import styles from '@/styles/New.module.scss';
import { Add } from 'grommet-icons';

type NewTag = {
  tag: string;
  id: string;
};

const New = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<Array<NewTag>>([]);
  const [currentTag, setCurrentTag] = useState('');
  const { data } = useAvatarData();
  const router = useRouter();

  const addTag = () => {
    setTags([...tags, { tag: currentTag, id: Date.now().toString() }]);
    setCurrentTag('');
  };

  const sendDirt = () => {
    const post: IPost = {
      avatarUrl: data.imageUrl ? data.imageUrl : '',
      date: new Date().toString(),
      title: title,
      content: content,
      tags: tags.map((tag) => tag.tag),
    };

    // axios post
    axios.post(`/api/posts/new`, { post: post }).finally(() => {
      // router push to home
      router.push('/');
    });
  };

  return (
    <Box fill flex align="center">
      <Heading>Create new dirt</Heading>
      <Box pad={'xsmall'} width={'medium'} gap="small">
        <TextInput
          placeholder="dirt title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="the dirt"
          resize={'vertical'}
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <Box direction="row">
          <Keyboard onEnter={() => addTag()}>
            <TextInput
              placeholder="tag"
              value={currentTag}
              onChange={(event) => setCurrentTag(event.target.value)}
            />
          </Keyboard>

          <Button icon={<Add />} onClick={() => addTag()} />
        </Box>
        <Box
          className={styles.postTags}
          overflow={'scroll'}
          flex="shrink"
          gap="xsmall"
          direction="row"
        >
          {tags.map((tag) => {
            return (
              <Tag
                key={tag.id}
                size="xsmall"
                value={`#${tag.tag}`}
                onClick={() => {
                  setTags(tags.filter((t) => t.id !== tag.id));
                }}
              />
            );
          })}
        </Box>
        <Button label="spill" onClick={() => sendDirt()} />
      </Box>
    </Box>
  );
};

export default New;
