import { grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

export const theme = deepMerge(grommet, {
  global: {
    colors: {
      'na-brand': '#572a30',
      'na-brand-lighter': '#8D7175',
      'na-brand-outline': 'white',
    },
  },
});

export default theme;
