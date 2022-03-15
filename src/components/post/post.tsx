import { Avatar, Box, Tag, Text } from 'grommet';
import styles from '@/styles/Post.module.scss';
import IPost from '@/types/post';

export type PostProps = {
  post: IPost;
};

export default function Post(props: PostProps) {
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
        <Avatar src={props.post.avatarUrl} />
      </Box>
      <Box direction="column" fill>
        <Text color={'dark-3'}>
          {new Date(props.post.date).toLocaleString()}
        </Text>
        <Box
          pad={'medium'}
          overflow={{ vertical: 'scroll' }}
          className={styles.postContainer}
        >
          <Text weight={'bolder'}>{props.post.title}</Text>
          <Text>{props.post.content}</Text>
        </Box>
        <Box
          className={styles.postTags}
          overflow={'scroll'}
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
    </Box>
  );
}
