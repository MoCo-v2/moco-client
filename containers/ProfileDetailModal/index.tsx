import {Modal} from '@/components';

import {useUserProfile} from '@/hooks/useUserProfile';
import {POSITIONS, STACKS} from '@/consts';

import {Wrppaepr} from './style';

interface Props {
  userId?: string;
  setUserId: (userId?: string) => void;
}

export const ProfileDetailModal = (props: Props) => {
  const {userId, setUserId} = props;

  const {user} = useUserProfile(userId);

  if (!user) return null;

  return (
    <Modal show={!!userId} onHide={() => setUserId(undefined)}>
      <Wrppaepr>
        <div className="top">
          <img src={user.picture} alt="profile" draggable={false} />
          <div className="user-info">
            <div className="user-info-top">
              <span className="name">{user.name}</span>
            </div>
            <div className="user-info-middle">
              <span className="position">
                {POSITIONS.find(x => x.value === user.position)?.label}
              </span>
              <span className="career">{user.career}차</span>
            </div>
            <div className="user-info-bottom">
              <span className="label">관심 스택</span>
              {JSON.parse(user.stack || '[]').map((x: string) => (
                <span className="stack" key={x}>
                  {STACKS.find(stack => stack.value === x)?.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="bottom">{user.intro || '자기소개가 없습니다.'}</div>
      </Wrppaepr>
    </Modal>
  );
};
