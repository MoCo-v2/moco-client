import {useState} from 'react';
import {useRouter} from 'next/router';

import dayjs from 'dayjs';
import {ToastContainer, toast} from 'react-toastify';
import {BsEye, BsBookmark, BsBookmarkFill} from 'react-icons/bs';

import {
  ResponseComment,
  ResponsePost,
  bookmarkAPI,
  commentAPI,
  postAPI,
} from '@/modules';

import {useComments} from '@/hooks/useComment';
import {useUser} from '@/hooks/useUser';
import {useBookmarkIds} from '@/hooks/useBookmarkIds';

import {getStackImageUrl} from '@/utils';
import {ROUTE_WRITE} from '@/routes';
import {POSITIONS, WRITE_MODE, WRITE_TYPE} from '@/consts';

import {CommentList} from './CommentList';
import {WriteComment} from './WriteComment';
import {ProfileDetailModal} from '../ProfileDetailModal';
import {ConfirmModal, Tag} from '@/components';

import {useLoadingStore} from '@/store/loading';

import {Wrapper} from './style';

interface Props {
  post: ResponsePost;
}

export const PostDetail = (props: Props) => {
  const {post} = props;

  const router = useRouter();
  const {user} = useUser();
  const {showLoading, hideLoading} = useLoadingStore();
  const {data: comments, mutation} = useComments(post.id);
  const {data: bookmarkIds, mutation: bookmarkMutation} = useBookmarkIds();

  const [comment, setComment] = useState('');
  const [editCommentData, setEditCommentData] = useState<ResponseComment>();
  const [userId, setUserId] = useState<string | undefined>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modifyType, setModifyType] = useState<string>();

  const onClickModifyItem = (type: string) => {
    setModifyType(type);
    setShowConfirmModal(true);
  };

  const onOkConfirmModal = async () => {
    try {
      if (!modifyType) throw new Error('modifyType is undefined');
      showLoading();
      if (modifyType === 'endRecruitment') {
        await postAPI.endRecruitmentPost(post.id);
        toast.success('마감되었습니다.');
        router.replace(router.asPath);
      } else if (modifyType === 'modify') {
        router.push({pathname: ROUTE_WRITE, query: {id: post.id}});
      } else if (modifyType === 'delete') {
        await postAPI.deletePost(post.id);
        toast.success('삭제되었습니다.');
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error('오류가 발생하였습니다.');
    } finally {
      setShowConfirmModal(false);
      setModifyType(undefined);
      hideLoading();
    }
  };

  const onClickProfile = (userId: string) => {
    setUserId(userId);
  };

  const onClickContactMethod = (type: string, link: string) => {
    if (type === '이메일') {
      navigator.clipboard.writeText(link);
      toast.success('이메일이 복사되었습니다.');
    } else {
      let url = link;
      if (url.indexOf('//') < 0) {
        url = 'http://' + url;
      }
      window.open(url, '_blank');
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

  const onClickBookmark = async (postId: number) => {
    try {
      if (!user) throw new Error('user is undefined');
      showLoading();
      await bookmarkAPI.createBookmark(postId);
      toast.success('북마크에 추가되었습니다.');
      bookmarkMutation.mutate();
    } catch (error) {
      console.log(error);
      toast.error('북마크 추가에 실패했습니다.');
    } finally {
      hideLoading();
    }
  };

  const onDeleteBookmark = async (postId: number) => {
    try {
      if (!user) throw new Error('user is undefined');
      showLoading();
      await bookmarkAPI.deleteBookmark(postId);
      toast.success('북마크에서 삭제되었습니다');
      bookmarkMutation.mutate();
    } catch (error) {
      console.log(error);
      toast.error('북마크 삭제에 실패했습니다.');
    } finally {
      hideLoading();
    }
  };

  return (
    <Wrapper>
      <section className="post-info-section">
        <div className="writer-image">
          <img src={post.picture} alt="profile" draggable={false} />
          {user?.id === post.userId && (
            <div className="modify-box">
              {!post.full && (
                <span onClick={() => onClickModifyItem('endRecruitment')}>
                  마감
                </span>
              )}
              <span onClick={() => onClickModifyItem('modify')}>수정</span>
              <span onClick={() => onClickModifyItem('delete')}>삭제</span>
            </div>
          )}
        </div>
        <div className="post-title">
          <div className="title">{post.title}</div>
          <div className="bookmark-btn">
            <span>
              <BsEye size={'1.8rem'} /> {post.view}
            </span>
            {user?.id && (
              <span
                style={{
                  cursor: 'pointer',
                }}
              >
                {bookmarkIds?.find(id => id === post.id) ? (
                  <BsBookmarkFill
                    size={'1.8rem'}
                    onClick={() => onDeleteBookmark(post.id)}
                  />
                ) : (
                  <BsBookmark
                    size={'1.8rem'}
                    onClick={() => onClickBookmark(post.id)}
                  />
                )}
              </span>
            )}
          </div>
        </div>
        <div className="writer-info">
          <div
            className="writer-name"
            onClick={() => onClickProfile(post.userId)}
          >
            {post.writer}
          </div>
          <div className="post-created">
            {dayjs(post.createdDate).format('YYYY.MM.DD HH:mm')}
          </div>
        </div>
        <div className="post-detail-info">
          <div className="box">
            <div className="box-item">
              <div className="label">모집 구분</div>
              <div className="value">
                {WRITE_TYPE.find(x => x.value === post.type)?.label}
              </div>
            </div>
            <div className="box-item">
              <div className="label">진행 방식</div>
              <div className="value">
                {WRITE_MODE.find(x => x.value === post.mode)?.label}
              </div>
            </div>
            <div className="box-item">
              <div className="label">모집 인원</div>
              <div className="value">{post.capacity}</div>
            </div>
            <div className="box-item">
              <div className="label">시작 예정</div>
              <div className="value">{post.deadLine}</div>
            </div>
          </div>
          <div className="box">
            <div className="box-item">
              <div className="label">연락 방법</div>
              <div
                className="value"
                style={{cursor: 'pointer', textDecoration: 'underline'}}
                onClick={() =>
                  onClickContactMethod(post.contactMethod, post.link)
                }
              >
                {post.contactMethod}
              </div>
            </div>
            <div className="box-item">
              <div className="label">예상 기간</div>
              <div className="value">{post.duration}</div>
            </div>
            <div className="box-item">
              <div className="label">모집 분야</div>
              <div className="value">
                {JSON.parse(post.recruitmentPosition).map(
                  (position: string, index: number) => (
                    <span
                      key={position}
                      style={{
                        marginRight: '0.5rem',
                      }}
                    >
                      {POSITIONS.find(x => x.value === position)?.label || ''}
                      {JSON.parse(post.recruitmentPosition).length > index + 1
                        ? ','
                        : ''}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="box-item">
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
          </div>
        </div>
      </section>
      <section className="content-section">
        <div className="content-title">
          {WRITE_TYPE.find(x => x.value === post.type)?.label} 소개
        </div>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{__html: post.content}}
        />
      </section>
      <section className="comment-section">
        <WriteComment
          commentCount={comments?.length || 0}
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
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => {
          setModifyType(undefined);
          setShowConfirmModal(false);
        }}
        onOk={onOkConfirmModal}
      >
        <div>
          {modifyType === 'endRecruitment'
            ? '마감하시겠습니까?'
            : modifyType === 'modify'
            ? '수정하시겠습니까?'
            : modifyType === 'delete'
            ? '삭제하시겠습니까?'
            : ''}
        </div>
      </ConfirmModal>
    </Wrapper>
  );
};
