import { atom } from 'recoil';
import { AvatarGenerateData } from '../../pages/api/avatar/generate';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const defaultAvatarState: AvatarGenerateData = { imageUrl: null };
export const avatarState = atom({
  key: 'avatar',
  default: defaultAvatarState,
  effects_UNSTABLE: [persistAtom],
});
