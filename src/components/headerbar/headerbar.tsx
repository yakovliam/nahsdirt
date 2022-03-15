import { Anchor, Avatar, Box, Button, Header, Text } from 'grommet';
import { Add } from 'grommet-icons';
import { useRouter } from 'next/router';

export default function HeaderBar() {
  const router = useRouter();

  return (
    <Header background="na-brand">
      <Box direction={'row'} flex justify="between" align="center">
        <Anchor color="white" href="/">
          <Box pad={'small'} gap={'small'} direction="row" align="center">
            <Avatar src="https://www.napls.us/cms/lib/OH01914683/Centricity/Template/GlobalAssets/images///Logos%202/NAPLSD_Logo.png" />
            <Text>nahs dirt</Text>
          </Box>
        </Anchor>
        <Box pad={'small'} gap={'small'} direction="row">
          <Button
            label={'spill dirt'}
            color="na-brand-outline"
            onClick={() => router.push('/new')}
            icon={<Add />}
          />
        </Box>
      </Box>
    </Header>
  );
}
