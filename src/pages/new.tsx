import { IPost } from '@/types/post';
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
import { POST_CHAR_LIMIT } from './api/post/new';

type NewTag = {
  tag: string;
  id: string;
};

const NewPage = () => {
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
      date: String(new Date().getTime()),
      title: title,
      content: content,
      tags: tags.map((tag) => tag.tag),
      numberOfComments: 0,
      uuid: '',
    };

    if (!post.avatarUrl || !post.date || !post.title || !post.content) {
      // todo fancy modal saying you are missing fields
      return;
    }

    if (post.content.length > POST_CHAR_LIMIT) {
      // todo fancy modal saying too many characters
      return;
    }

    // axios post
    axios
      .post(`/api/post/new`, { post: post })
      .then(() => {
        // router push to home
        router.push('/');
      })
      .catch((e) => {
        // todo fancy modal with error
        console.error(e);

        // todo remove this v v v
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
          overflow={'auto'}
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

export default NewPage;
