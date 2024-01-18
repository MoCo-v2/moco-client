import {useState} from 'react';
import Link from 'next/link';

import dayjs from 'dayjs';
import Pagination from 'react-js-pagination';

import {ProfileDetailModal} from '../ProfileDetailModal';

import {usePost} from '@/hooks/usePost';
import {getStackImageUrl} from '@/utils';
import {ROUTE_POST} from '@/routes';

import {PostItem, PostListWrapper, Wrapper} from './style';
import {useUser} from '@/hooks/useUser';

interface Props {}

const limit = 10;

export const MyPostList = (props: Props) => {
  const {} = props;

  const {user} = useUser();

  const [page, setPage] = useState(0);
  const [userId, setUserId] = useState<string | undefined>();

  const {
    data: postList,
    totalElements,
    totalPages,
  } = usePost({
    offset: page,
    limit,
    recruit: false,
    username: user?.name,
  });

  const handleScrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const onClickProfile = (userId: string) => {
    setUserId(userId);
  };

  if (!user) return null;

  return (
    <Wrapper>
      <PostListWrapper>
        {postList?.map(post => {
          return (
            <PostItem key={post.id}>
              <div className="writer-info">
                <div
                  className="profile"
                  onClick={() => onClickProfile(post.userId)}
                >
                  <img src={post.picture} alt="profile" draggable={false} />
                  <div className="name">{post.writer}</div>
                </div>
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
        <Pagination
          activePage={page + 1}
          itemsCountPerPage={limit}
          totalItemsCount={totalElements || 0}
          pageRangeDisplayed={5}
          prevPageText={'‹'}
          nextPageText={'›'}
          firstPageText={'«'}
          lastPageText={'»'}
          onChange={number => {
            setPage(number - 1);
            handleScrollToTop();
          }}
        />
      </PostListWrapper>
      <ProfileDetailModal userId={userId} setUserId={setUserId} />
    </Wrapper>
  );
};
