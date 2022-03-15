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

  const isMobile: boolean =
    size === 'xxsmall' || size === 'xsmall' || size === 'small';

  useEffect(() => {
    setSize(ctx as sizeType);
  }, [ctx]);

  return { size, isMobile };
};

export default useResponsive;
