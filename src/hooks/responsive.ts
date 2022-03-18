import { ResponsiveContext } from 'grommet';
import { useContext, useState, useEffect } from 'react';

type sizeType =
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'full'
  | null;

const useResponsive = () => {
  const ctx = useContext(ResponsiveContext);
  const [size, setSize] = useState<sizeType>(null);
  let defaultRawWidth = 0;

  // nextjs SSR window reference hack
  if (typeof window !== 'undefined') {
    defaultRawWidth = window.innerWidth;
  }

  // raw width
  const [rawWidth, setRawWidth] = useState(defaultRawWidth);

  const isMobile: boolean =
    size === 'xxsmall' || size === 'xsmall' || size === 'small';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => setRawWidth(window.innerWidth));
    }
  }, []);

  useEffect(() => {
    setSize(ctx as sizeType);
  }, [ctx]);

  return { size, rawWidth, isMobile };
};

export default useResponsive;
