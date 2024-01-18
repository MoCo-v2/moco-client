import {useState} from 'react';

import dayjs from 'dayjs';
import {ToastContainer, toast} from 'react-toastify';

import {ResponseComment, ResponsePost, commentAPI} from '@/modules';

import {useComments} from '@/hooks/useComment';

import {getStackImageUrl} from '@/utils';

import {CommentList} from './CommentList';
import {WriteComment} from './WriteComment';
import {ProfileDetailModal} from '../ProfileDetailModal';
import {Tag} from '@/components';

import {useLoadingStore} from '@/store/loading';

import {Wrapper} from './style';

interface Props {
  post: ResponsePost;
}

export const PostDetail = (props: Props) => {
  const {post} = props;

  const {showLoading, hideLoading} = useLoadingStore();
  const {data: comments, mutation} = useComments(post.id);

  const [comment, setComment] = useState('');
  const [editCommentData, setEditCommentData] = useState<ResponseComment>();
  const [userId, setUserId] = useState<string | undefined>();

  const onClickProfile = (userId: string) => {
    setUserId(userId);
  };

  const onClickContactMethod = (type: string, link: string) => {
    if (type === '이메일') {
      navigator.clipboard.writeText(link);
      toast.success('이메일이 복사되었습니다.');
    } else {
      window.open(link, '_blank');
    }
  };

  const onCreateComment = async () => {
    try {
      showLoading();
      await commentAPI.createComment({
        postId: post.id,
        content: comment,
      });
      mutation.mutate();
      toast.success('댓글이 등록되었습니다.');
      setComment('');
    } catch (error) {
      console.log(error);
      toast.error('댓글 등록에 실패하였습니다.');
    } finally {
      hideLoading();
    }
  };

  const onDeleteComment = async (commentId: number) => {
    try {
      showLoading();
      await commentAPI.deleteComment(commentId);
      mutation.mutate();
      toast.success('댓글이 삭제되었습니다.');
    } catch (error) {
      console.log(error);
      toast.error('댓글 삭제에 실패하였습니다.');
    } finally {
      hideLoading();
    }
  };

  const onModifyComment = async () => {
    try {
      if (!editCommentData) return;
      showLoading();
      await commentAPI.modifiedComment({
        commentId: editCommentData.id,
        content: editCommentData.content,
      });
      mutation.mutate();
      toast.success('댓글이 수정되었습니다.');
      setEditCommentData(undefined);
    } catch (error) {
      console.log(error);
      toast.error('댓글 수정에 실패하였습니다.');
    } finally {
      hideLoading();
    }
  };

  return (
    <Wrapper>
      <section className="writer-section">
        <div className="title">{post.title}</div>
        <div
          className="writer-info"
          onClick={() => onClickProfile(post.userId)}
        >
          <img src={post.picture} alt="profile" draggable={false} />
          <div className="writer">{post.writer}</div>
          <div className="created">
            {dayjs(post.createdDate).format('YYYY.MM.DD')}
          </div>
        </div>
      </section>
      <section className="study-info-section">
        <div className="item">
          <div className="label">모집 구분</div>
          <div className="value">{post.type}</div>
        </div>
        <div className="item">
          <div className="label">진행 방식</div>
          <div className="value">{post.mode}</div>
        </div>
        <div className="item">
          <div className="label">모집 인원</div>
          <div className="value">{post.capacity}</div>
        </div>
        <div className="item">
          <div className="label">시작 예정</div>
          <div className="value">{post.deadLine}</div>
        </div>
        <div className="item">
          <div className="label">연락 방법</div>
          <div className="value">
            <Tag
              tag={post.contactMethod}
              onClick={() =>
                onClickContactMethod(post.contactMethod, post.link)
              }
            />
          </div>
        </div>
        <div className="item">
          <div className="label">예상 기간</div>
          <div className="value">{post.duration}</div>
        </div>
        <div className="item">
          <div className="label">모집 분야</div>
          <div className="value">
            {JSON.parse(post.recruitmentPosition).map((position: string) => (
              <Tag tag={position} key={position} />
            ))}
          </div>
        </div>
        <div className="item">
          <div className="label">사용 언어</div>
          <div className="value">
            {(JSON.parse(post.techStack) || []).map((stack: string) => (
              <img
                src={getStackImageUrl(stack)}
                key={stack}
                draggable={false}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="content-section">
        <div className="content-title">프로젝트 소개</div>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{__html: post.content}}
        />
        <div className="post-info">
          <span>조회수: {post.view}</span>
          <span>TODO:: 북마크</span>
        </div>
      </section>
      <section className="comment-section">
        <WriteComment
          post={post}
          comment={comment}
          setComment={setComment}
          onCreateComment={onCreateComment}
        />
        <CommentList
          comments={comments}
          editCommentData={editCommentData}
          setEditCommentData={setEditCommentData}
          onDeleteComment={onDeleteComment}
          onModifyComment={onModifyComment}
        />
      </section>
      <ToastContainer />
      <ProfileDetailModal userId={userId} setUserId={setUserId} />
    </Wrapper>
  );
};
