import {useUserProfile} from '@/hooks/useUserProfile';

import {POSITIONS, STACKS} from '@/consts';

import {CustomModal, CustomBody} from './style';

interface Props {
  userId?: string;
  setUserId: (userId?: string) => void;
}

export const ProfileDetailModal = (props: Props) => {
  const {userId, setUserId} = props;

  const {user} = useUserProfile(userId);

  if (!user) return null;

  return (
    <CustomModal show={!!userId} onHide={() => setUserId(undefined)} centered>
      <CustomBody>
        <div className="top">
          <div className="top-left">
            <img src={user.picture} alt="profile" draggable={false} />
          </div>
          <div className="top-right">
            <div className="info">
              <span className="position">
                {POSITIONS.find(x => x.value === user.position)?.label}
              </span>
              <span className="career">{user.career}차</span>
            </div>
            <div className="name">{user.name}</div>
            <div className="intro">{user.intro || '자기소개가 없습니다.'}</div>
          </div>
        </div>
        <div className="bottom">
          <div className="label">관심 스택</div>
          <div className="stacks">
            {JSON.parse(user.stack || '[]').map((x: string) => (
              <span className="stack" key={x}>
                {STACKS.find(stack => stack.value === x)?.label}
              </span>
            ))}
          </div>
        </div>
      </CustomBody>
    </CustomModal>
  );
};
