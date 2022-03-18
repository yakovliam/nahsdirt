import { Avatar, Box, Text } from 'grommet';
import styles from '@/styles/Comment.module.scss';
import { IComment } from '@/types/comment';

export type CommentProps = {
  comment: IComment;
};

export default function Comment(props: CommentProps) {
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
        <Avatar src={props.comment.avatarUrl} size="medium" round={false} />
      </Box>
      <Box direction="column" fill>
        <Text color={'dark-3'}>
          {new Date(Number(props.comment.date)).toLocaleString()}
        </Text>
        <Box
          pad={'medium'}
          overflow={{ vertical: 'auto' }}
          className={styles.commentContainer}
        >
          <Text>{props.comment.content}</Text>
        </Box>
      </Box>
    </Box>
  );
}
