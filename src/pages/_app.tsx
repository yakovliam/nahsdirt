import { AppProps } from 'next/app';
import Layout from '@/components/layout/layout';
import { Grommet } from 'grommet';
import theme from '../components/theme/theme';
import { SWRConfig } from 'swr';
import { RecoilRoot } from 'recoil';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Grommet full theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Grommet>
      </SWRConfig>
    </RecoilRoot>
  );
}
