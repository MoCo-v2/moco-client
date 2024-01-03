import {useState} from 'react';

import dayjs from 'dayjs';
import {ToastContainer, toast} from 'react-toastify';
import {Button} from 'react-bootstrap';

import {ResponsePost, commentAPI} from '@/modules';

import {useUser} from '@/hooks/useUser';
import {useComments} from '@/hooks/useComment';

import {getStackImageUrl} from '@/utils';

import {Tag} from '@/components';

import {Wrapper} from './style';

interface Props {
  post: ResponsePost;
}

export const PostDetail = (props: Props) => {
  const {post} = props;

  const {user} = useUser();
  const {data: comments, mutation} = useComments(post.id);

  const [comment, setComment] = useState('');

  console.log({post, user});
  console.log(comments);

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
      const data = await commentAPI.createComment({
        postId: post.id,
        content: comment,
      });
      toast.success('댓글이 등록되었습니다.');
      mutation.mutate();
    } catch (error) {
      console.log(error);
      toast.error('댓글 등록에 실패하였습니다.');
    }
  };

  return (
    <Wrapper>
      <section className="writer-section">
        <div className="title">{post.title}</div>
        <div className="writer-info">
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
      </section>
      <section className="comment-section">
        <div className="comment-count">
          댓글 <span>{post.commentCnt}</span>
        </div>
        <div className="comment-write">
          <img src={user?.picture} alt="profile" draggable={false} />
          <textarea
            onChange={e => setComment(e.target.value)}
            placeholder="댓글을 입력해주세요."
          />
        </div>
        <div className="btn-wrapper">
          <Button onClick={onCreateComment}>댓글 등록</Button>
        </div>
        <div className="comment-list"></div>
      </section>
      <ToastContainer />
    </Wrapper>
  );
};
