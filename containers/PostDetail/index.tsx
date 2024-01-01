import {ResponsePost} from '@/modules';

import {Wrapper} from './style';

interface Props {
  post: ResponsePost;
}

export const PostDetail = (props: Props) => {
  const {post} = props;
  console.log(post);
  return (
    <Wrapper>
      <section>
        <div className="title">{post.title}</div>
        <div className="writer-info">
          <img src={post.picture} alt="profile" draggable={false} />
          <div className="writer">{post.writer}</div>
          <div className="created">{post.createdDate}</div>
        </div>
      </section>
      <section className="study-info">
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
          <div className="value">{post.contactMethod}</div>
        </div>
        <div className="item">
          <div className="label">예상 기간</div>
          <div className="value">{post.duration}</div>
        </div>
        <div className="item">
          <div className="label">모집 분야</div>
          <div className="value">{post.recruitmentPosition}</div>
        </div>
        <div className="item">
          <div className="label">사용 언어</div>
          <div className="value">{post.techStack}</div>
        </div>
        {/* <img src="https://skillicons.dev/icons?i=nodejs,kubernetes,docker,c,vim" /> */}
      </section>
      <section>
        <div className="content-title">프로젝트 소개</div>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{__html: post.content}}
        />
      </section>
    </Wrapper>
  );
};
