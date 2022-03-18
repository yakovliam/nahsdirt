import CommentScrollContainer from '@/components/comment/container';
import { useAvatarData } from '@/hooks/avatar';
import useCommentsQuery from '@/hooks/commentsquery';
import { IComment } from '@/types/comment';
import axios from 'axios';
import { Box, Button, Heading, Keyboard, TextInput } from 'grommet';
import { Send } from 'grommet-icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Post from '../../components/post/post';
import usePostQuery from '../../hooks/posquery';

const PostPage = () => {
  const router = useRouter();
  const { uuid } = router.query;

  const { data } = useAvatarData();

  const { post } = usePostQuery(String(uuid));

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
    // todo fancy modal saying post not found
    return <></>;
  }

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
      <Box>
        <Post post={post} isInDetailedView={true} />
      </Box>
      <Box align={'start'} width={'large'} direction={'row'}>
        <Keyboard onEnter={sendComment}>
          <TextInput
            placeholder="write a comment..."
            onChange={(event) => setCommentContent(event.target.value)}
            value={commentContent}
          />
        </Keyboard>
        <Button icon={<Send />} onClick={sendComment} />
      </Box>
      <Box width={'large'} flex align="start" direction="column">
        <Heading level={3}>Comments</Heading>
        <Box align={'center'} direction="column" animation={'fadeIn'}>
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
  );
};

export default PostPage;
