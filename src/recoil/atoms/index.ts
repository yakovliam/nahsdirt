import { atom } from 'recoil';
import { AvatarGenerateData } from '../../pages/api/avatar/generate';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const avatarState = atom({
  key: 'avatar',
  default: { imageUrl: null } as AvatarGenerateData,
  effects_UNSTABLE: [persistAtom],
});
