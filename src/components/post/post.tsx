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
      direction="row"
      height={{ min: 'small', max: 'medium' }}
      width={'large'}
      gap={'small'}
      pad={'medium'}
      elevation={'small'}
    >
      <Box>
        <Avatar src={props.post.avatarUrl} size="medium" round={false} />
      </Box>
      <Box direction="column" fill>
        <Text color={'dark-3'}>
          {new Date(Number(props.post.date)).toLocaleString()}
        </Text>
        <Box
          pad={'medium'}
          overflow={{ vertical: 'auto' }}
          className={styles.postContainer}
        >
          <Text weight={'bolder'}>{props.post.title}</Text>
          <Text>{props.post.content}</Text>
        </Box>
        <Box
          className={styles.postTags}
          overflow={'auto'}
          flex="shrink"
          gap="xsmall"
          direction="row"
        >
          {props.post.tags &&
            props.post.tags.map((tag) => {
              return (
                <Tag key={Math.random()} size="xsmall" value={`#${tag}`} />
              );
            })}
        </Box>
      </Box>
      <Box>
        <Button
          icon={<Chat />}
          label={String(props.post.numberOfComments)}
          plain
          onClick={onCommentClick}
        />
      </Box>
    </Box>
  );
}
