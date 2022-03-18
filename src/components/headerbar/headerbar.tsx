import { avatarState } from '@/recoil/atoms';
import { Anchor, Avatar, Box, Button, Header, Text } from 'grommet';
import { Add, Refresh, Search } from 'grommet-icons';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { AvatarGenerateData } from '../../pages/api/avatar/generate';
import useResponsive from '../../hooks/responsive';

export default function HeaderBar() {
  const router = useRouter();
  const [, setAvatarData] = useRecoilState(avatarState);
  const { isMobile } = useResponsive();

  const resetAvatar = () => {
    setAvatarData({ imageUrl: null } as AvatarGenerateData);
  };

  const ResponsiveButtons = () => {
    if (isMobile) {
      return (
        <Box pad={'small'} gap={'small'} direction="row">
          <Button icon={<Refresh />} onClick={() => resetAvatar()} />
          <Button icon={<Search />} onClick={() => router.push('/search')} />
          <Button
            color="na-brand-outline"
            onClick={() => router.push('/new')}
            icon={<Add />}
          />
        </Box>
      );
    } else {
      return (
        <Box pad={'small'} gap={'small'} direction="row">
          <Button
            icon={<Refresh />}
            label="refresh profile pic"
            onClick={() => resetAvatar()}
          />
          <Button icon={<Search />} onClick={() => router.push('/search')} />
          <Button
            label={'spill dirt'}
            color="na-brand-outline"
            onClick={() => router.push('/new')}
            icon={<Add />}
          />
        </Box>
      );
    }
  };

  return (
    <Header background="na-brand">
      <Box direction={'row'} flex justify="between" align="center">
        <Anchor color="white" href="/">
          <Box pad={'small'} gap={'small'} direction="row" align="center">
            <Avatar src="https://www.napls.us/cms/lib/OH01914683/Centricity/Template/GlobalAssets/images///Logos%202/NAPLSD_Logo.png" />
            <Text>nahs dirt</Text>
          </Box>
        </Anchor>
        <ResponsiveButtons />
      </Box>
    </Header>
  );
}
