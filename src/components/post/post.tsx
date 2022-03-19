import { Avatar, Box, Button, Tag, Text } from 'grommet';
import styles from '@/styles/Post.module.scss';
import { IPost } from '@/types/post';
import { Chat } from 'grommet-icons';
import { useRouter } from 'next/router';

export type PostProps = {
  post: IPost;
  // if the current view is the detailed (dedicated post) view
  isInDetailedView: boolean;
};

export default function Post(props: PostProps) {
  const router = useRouter();

  const onCommentClick = () => {
    if (props.isInDetailedView) {
      // todo create new comment modal
    } else {
      // redirect to post view
      router.push(`/post/${props.post.uuid}`);
    }
  };

  return (
    <Box
      height={{ min: 'small', max: 'medium' }}
      width={{ max: 'large' }}
      gap={'small'}
      pad={'medium'}
      elevation={'small'}
      flex={true}
    >
      <Box direction="row" justify="start" gap={'small'} flex="grow">
        <Box flex={false}>
          <Avatar src={props.post.avatarUrl} round={true} />
        </Box>
        <Box flex direction="column" gap={'small'}>
          <Box flex={'shrink'} direction="row" align="start" justify="between">
            <Text color={'dark-3'}>
              {new Date(Number(props.post.date)).toLocaleString()}
            </Text>
            <Box>
              <Button
                icon={<Chat />}
                label={String(props.post.numberOfComments)}
                plain
                onClick={onCommentClick}
              />
            </Box>
          </Box>
          <Box
            flex="grow"
            className={styles.postContainer}
            style={{ wordWrap: 'break-word' }}
            overflow={{ vertical: 'auto', horizontal: 'hidden' }}
          >
            <Text>{props.post.content}</Text>
          </Box>
        </Box>
      </Box>
      <Box
        className={styles.postTags}
        overflow={{ horizontal: 'auto' }}
        gap="xsmall"
        direction="row"
      >
        {props.post.tags &&
          props.post.tags.map((tag) => {
            return (
              <Box flex={false} key={Math.random()}>
                <Tag size="xsmall" value={`#${tag}`} />
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}
