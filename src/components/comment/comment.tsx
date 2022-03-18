import { Avatar, Box, Text } from 'grommet';
import styles from '@/styles/Comment.module.scss';
import { IComment } from '@/types/comment';

export type CommentProps = {
  comment: IComment;
};

export default function Comment(props: CommentProps) {
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
          <Avatar src={props.comment.avatarUrl} round={true} />
        </Box>
        <Box flex direction="column" gap={'small'}>
          <Box direction="row" align="start" justify="between" flex="grow">
            <Text color={'dark-3'}>
              {new Date(Number(props.comment.date)).toLocaleString()}
            </Text>
          </Box>
          <Box
            flex="grow"
            className={styles.postContainer}
            style={{ wordWrap: 'break-word' }}
            overflow={{ vertical: 'auto', horizontal: 'hidden' }}
          >
            <Text>{props.comment.content}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
