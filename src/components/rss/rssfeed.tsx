import { Box, Text, Button, Spinner } from 'grommet';
import { View } from 'grommet-icons';
import useSWR from 'swr';
import { RssFeedData } from '../../pages/api/rss';

const RssFeed = () => {
  const { data, error } = useSWR<RssFeedData>('/api/rss');

  if (!data && !error) {
    return (
      <Box pad={'small'} align="center">
        <Spinner />
      </Box>
    );
  }

  if (!data || error) {
    return <Text>Error</Text>;
  }

  return (
    <Box pad={'small'} align="center">
      <Text size="xlarge">Events</Text>
      <Text weight={'bold'}>{data.title}</Text>
      <Box
        margin={{ vertical: 'medium' }}
        border={{ color: 'na-brand', size: 'small' }}
        width={'large'}
      />
      <Box gap="small">
        {data.items.map((item) => {
          return (
            <Box
              key={String(Math.random())}
              flex="grow"
              hoverIndicator={{ elevation: 'medium' }}
              elevation={'small'}
              onClick={() => window.open(item.link)}
            >
              <Box align={'center'} gap="small" pad="medium">
                <Text textAlign="center" size="small" weight="bold">
                  {item.title}
                </Text>
                <Text size="small">{item.contentSnippet}</Text>
              </Box>
              <Box
                direction="row"
                align="center"
                pad={{ right: 'small' }}
                justify="between"
                background={'light-2'}
              >
                <Button
                  icon={<View />}
                  onClick={() => window.open(item.link)}
                />
                {item.isoDate && (
                  <Text color={'dark-5'}>
                    {new Date(item.isoDate).toLocaleString()}
                  </Text>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default RssFeed;
