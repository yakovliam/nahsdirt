import { useRecoilState } from 'recoil';
import { avatarState } from '../recoil/atoms/index';
import { useEffect, useState } from 'react';
import { AvatarGenerateData } from '@/pages/api/avatar/generate';
import axios from 'axios';

export const useAvatarData = () => {
  const [avatarData, setAvatarData] = useRecoilState(avatarState);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (avatarData.imageUrl === null) {
      axios
        .get(`/api/avatar/generate`)
        .then((response) => {
          const data: AvatarGenerateData = response.data;
          setAvatarData(data);
          setIsError(false);
        })
        .catch((e) => {
          console.error(e);
          setIsError(true);
        });
    }
  });

  return { data: avatarData as AvatarGenerateData, isError: isError };
};
