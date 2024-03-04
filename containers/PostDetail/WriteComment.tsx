import {Button} from 'react-bootstrap';

import {useUser} from '@/hooks/useUser';

import {ResponsePost} from '@/modules';
import {StyledWriteComment} from './style';

interface Props {
  commentCount: number;
  comment: string;
  setComment: (comment: string) => void;
  onCreateComment: () => void;
}

export const WriteComment = (props: Props) => {
  const {commentCount, comment, setComment, onCreateComment} = props;

  const {user} = useUser();

  return (
    <StyledWriteComment>
      <div className="comment-count">
        댓글 <span>{commentCount}</span>
      </div>
      {user && (
        <>
          <div className="comment-write">
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="댓글을 입력해주세요."
            />
          </div>
          <div className="btn-wrapper">
            <Button onClick={onCreateComment}>등록</Button>
          </div>
        </>
      )}
    </StyledWriteComment>
  );
};
