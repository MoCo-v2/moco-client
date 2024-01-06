import {Button} from 'react-bootstrap';

import {useUser} from '@/hooks/useUser';

import {ResponsePost} from '@/modules';
import {StyledWriteComment} from './style';

interface Props {
  post: ResponsePost;
  comment: string;
  setComment: (comment: string) => void;
  onCreateComment: () => void;
}

export const WriteComment = (props: Props) => {
  const {post, comment, setComment, onCreateComment} = props;

  const {user} = useUser();

  return (
    <StyledWriteComment>
      <div className="comment-count">
        댓글 <span>{post.commentCnt}</span>
      </div>
      <div className="comment-write">
        <img src={user?.picture} alt="profile" draggable={false} />
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="댓글을 입력해주세요."
        />
      </div>
      <div className="btn-wrapper">
        <Button onClick={onCreateComment}>댓글 등록</Button>
      </div>
    </StyledWriteComment>
  );
};
