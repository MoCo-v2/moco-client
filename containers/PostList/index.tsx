import {usePost} from '@/hooks/usePost';
import {PostItem, PostListWrapper, Wrapper} from './style';
import dayjs from 'dayjs';
import {getStackImageUrl} from '@/utils';
import {ROUTE_POST} from '@/routes';
import Link from 'next/link';

interface Props {}

export const PostList = (props: Props) => {
  const {} = props;

  const {data: postList} = usePost({
    offset: 0,
    limit: 20,
    recruit: false,
  });
  console.log(postList);

  return (
    <Wrapper>
      <div className="test">TODO:: 검색 필터</div>
      <PostListWrapper>
        {postList?.map(post => {
          return (
            <PostItem key={post.id}>
              <div className="writer-info">
                <img src={post.picture} alt="profile" draggable={false} />
                <div className="name">{post.writer}</div>
                <div className="dead-line">
                  마감일 | {dayjs(post.deadLine).format('YYYY.MM.DD')}
                </div>
                <div className="type">{post.type}</div>
              </div>
              <div className="content">
                <Link
                  className="title"
                  href={{
                    pathname: `${ROUTE_POST}`,
                    query: {
                      id: post.id,
                    },
                  }}
                >
                  <div>{post.title}</div>
                </Link>
              </div>
              <div className="post-info">
                <div className="recruitment-position">
                  {JSON.parse(post.recruitmentPosition).map((x: string) => {
                    return <div key={x}>{x}</div>;
                  })}
                </div>
                <div className="tech-stack">
                  {JSON.parse(post.techStack).map((x: string) => {
                    return (
                      <img
                        src={getStackImageUrl(x)}
                        key={x}
                        draggable={false}
                      />
                    );
                  })}
                  <div className="comment-section">
                    <div className="view-count">조회: {post.view}</div>
                    <div className="comments">댓글: {post.commentCnt}</div>
                  </div>
                </div>
              </div>
            </PostItem>
          );
        })}
      </PostListWrapper>
      <div className="test">TODO:: 인기 게시글</div>
    </Wrapper>
  );
};
