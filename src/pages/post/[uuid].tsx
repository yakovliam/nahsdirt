import CommentScrollContainer from '@/components/comment/scrollcontainer';
import { useAvatarData } from '@/hooks/avatar';
import useCommentsQuery from '@/hooks/commentsquery';
import { IComment } from '@/types/comment';
import axios from 'axios';
import {
  Box,
  Text,
  Button,
  Heading,
  Keyboard,
  Spinner,
  TextInput,
} from 'grommet';
import { Send } from 'grommet-icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Post from '../../components/post/post';
import usePostQuery from '../../hooks/posquery';
import { COMMENT_CHAR_LIMIT } from '../api/comment/new';

const PostPage = () => {
  const router = useRouter();
  const { uuid } = router.query;

  const { data } = useAvatarData();

  const { post, isError } = usePostQuery(String(uuid));

  const [page, setPage] = useState(0);
  const { comments } = useCommentsQuery(String(uuid), page);

  const [commentContent, setCommentContent] = useState('');

  const sendComment = () => {
    const comment: IComment = {
      avatarUrl: data.imageUrl ? data.imageUrl : '',
      date: String(new Date().getTime()),
      content: commentContent,
      uuid: '',
      parent: String(uuid),
    };

    if (
      !comment.avatarUrl ||
      !comment.date ||
      !comment.content ||
      !comment.parent
    ) {
      // todo fancy modal saying you are missing fields
      return;
    }

    if (comment.content.length > COMMENT_CHAR_LIMIT) {
      // todo fancy modal saying too many characters
      return;
    }

    // axios post
    axios
      .post(`/api/comment/new`, { comment: comment })
      .then(() => {
        // reload
        router.reload();
      })
      .catch((e) => {
        // todo fancy modal with error
        console.error(e);
      });
  };

  if (post === null || post === undefined) {
    return (
      <Box
        fill
        flex
        align="center"
        margin={{ top: 'medium' }}
        pad={'medium'}
        gap={'medium'}
        overflow={'auto'}
      >
        <Spinner size="large" />
      </Box>
    );
  }

  if (isError) {
    // todo fancy modal saying post not found
    return <></>;
  }

  return (
    <Box
      fill
      flex
      align="center"
      margin={{ top: 'large' }}
      gap={'medium'}
      overflow={{ vertical: 'auto' }}
    >
      <Box
        flex={false}
        width={'large'}
        justify="center"
        direction="row"
        pad={'medium'}
      >
        <Post post={post} isInDetailedView={true} />
      </Box>
      <Box flex={false} pad={{ horizontal: 'medium' }}>
        <Box flex="grow" align={'start'} width={'large'} direction={'row'}>
          <Keyboard onEnter={sendComment}>
            <TextInput
              placeholder="write a comment..."
              onChange={(event) => setCommentContent(event.target.value)}
              value={commentContent}
            />
          </Keyboard>
          <Button icon={<Send />} onClick={sendComment} />
        </Box>
        <Box justify="end" align="center" direction="row">
          <Text
            color={
              commentContent.length <= COMMENT_CHAR_LIMIT
                ? 'status-ok'
                : 'status-error'
            }
          >
            {commentContent.length}
          </Text>
          <Text color={'dark-5'}>/{COMMENT_CHAR_LIMIT}</Text>
        </Box>
      </Box>
      <Box flex={false}>
        <Box width={'large'} align="center" flex pad={{ horizontal: 'medium' }}>
          <Heading level={3} margin={{ top: 'none' }}>
            Comments
          </Heading>
          <Box width={'inherit'} align={'center'} animation={'fadeIn'}>
            <CommentScrollContainer
              onMore={() => {
                // increase page (which inherently loads more items)
                setPage(page + 1);
              }}
              items={comments}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostPage;
