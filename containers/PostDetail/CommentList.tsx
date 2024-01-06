import {Button} from 'react-bootstrap';
import dayjs from 'dayjs';

import {useUser} from '@/hooks/useUser';

import {ResponseComment} from '@/modules';
import {StyledCommentList} from './style';

interface Props {
  comments?: ResponseComment[];
  editCommentData?: ResponseComment;
  setEditCommentData: (comment?: ResponseComment) => void;
  onDeleteComment: (commentId: number) => void;
  onModifyComment: () => void;
}

export const CommentList = (props: Props) => {
  const {
    comments,
    editCommentData,
    setEditCommentData,
    onDeleteComment,
    onModifyComment,
  } = props;

  const {user} = useUser();

  return (
    <StyledCommentList>
      {comments?.map(comment => (
        <div className="comment-item" key={comment.id}>
          <div className="comment-writer">
            <img src={comment.picture} alt="profile" draggable={false} />
            <div>
              <div className="writer">{comment.name}</div>
              <div className="created">
                {dayjs(comment.createdDate).format('YYYY.MM.DD HH:mm')}
              </div>
            </div>
            {comment.name === user?.name &&
            comment.id !== editCommentData?.id ? (
              <div className="comment-modify-btn-wrap">
                <div
                  className="comment-edit-btn"
                  onClick={() => setEditCommentData(comment)}
                >
                  수정
                </div>
                <div
                  className="comment-delete-btn"
                  onClick={() => onDeleteComment(comment.id)}
                >
                  삭제
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          {editCommentData?.id === comment.id ? (
            <>
              <textarea
                onChange={e =>
                  setEditCommentData({
                    ...editCommentData,
                    content: e.target.value,
                  })
                }
                value={editCommentData?.content}
                placeholder="댓글을 입력해주세요."
              />
              <div className="btn-wrapper">
                <Button
                  variant="secondary"
                  onClick={() => setEditCommentData(undefined)}
                >
                  취소
                </Button>
                <Button onClick={onModifyComment}>수정</Button>
              </div>
            </>
          ) : (
            <div className="comment-content">{comment.content}</div>
          )}
        </div>
      ))}
    </StyledCommentList>
  );
};
