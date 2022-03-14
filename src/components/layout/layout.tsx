import { Box } from 'grommet';
import FooterBar from '../footerbar';
import HeaderContainer from '../header/headercontainer';
import HeaderBar from '../headerbar';

export default function Layout({ children }: any) {
  return (
    <>
      <HeaderContainer />
      <Box fill>
        <HeaderBar />
        {children}
        <FooterBar />
      </Box>
    </>
  );
}
