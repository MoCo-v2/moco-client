import {useState} from 'react';
import Link from 'next/link';

import dayjs from 'dayjs';
import Pagination from 'react-js-pagination';
import {BsEye, BsChatLeft, BsBookmark, BsBookmarkFill} from 'react-icons/bs';
import {ToastContainer, toast} from 'react-toastify';

import {ProfileDetailModal} from '../ProfileDetailModal';
import {RecommendPostList} from '../RecommendPostList';
import {SearchBox} from '../SearchBox';

import {usePost} from '@/hooks/usePost';
import {useUser} from '@/hooks/useUser';
import {useBookmarkIds} from '@/hooks/useBookmarkIds';

import {useLoadingStore} from '@/store/loading';

import {getModeColor, getStackImageUrl} from '@/utils';
import {ROUTE_POST} from '@/routes';
import {bookmarkAPI} from '@/modules';
import {POSITIONS, WRITE_TYPE} from '@/consts';

import {PostItem, PostListWrapper, Wrapper} from './style';

interface Props {}

const limit = 10;

export const PostList = (props: Props) => {
  const {} = props;

  const {showLoading, hideLoading} = useLoadingStore();
  const {user} = useUser();
  const {data: bookmarkIds, mutation} = useBookmarkIds();

  const [userId, setUserId] = useState<string | undefined>();

  const [filter, setFilter] = useState<{
    offset: number;
    limit: number;
    recruit?: boolean;
    type?: string;
    position?: string;
    mode?: string;
    language?: string;
  }>({
    offset: 0,
    limit,
    recruit: false,
    type: 'all',
    position: 'all',
    mode: 'all',
    language: undefined,
  });

  const {
    data: postList,
    mutation: postMutation,
    totalElements,
    totalPages,
  } = usePost({
    ...filter,
    language: filter.language
      ? JSON.parse(filter.language).join(',')
      : undefined,
  });

  const handleScrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'instant'});
  };

  const onClickProfile = (userId: string) => {
    setUserId(userId);
  };

  const onClickBookmark = async (postId: number) => {
    try {
      if (!user) throw new Error('user is undefined');
      showLoading();
      await bookmarkAPI.createBookmark(postId);
      toast.success('북마크에 추가되었습니다.');
      mutation.mutate();
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
      mutation.mutate();
    } catch (error) {
      console.log(error);
      toast.error('북마크 삭제에 실패했습니다.');
    } finally {
      hideLoading();
    }
  };

  return (
    <Wrapper>
      <div className="side-box">
        <SearchBox filter={filter} setFilter={setFilter} />
      </div>
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
                <div className="type">
                  <div
                    className="item-type-symbol"
                    style={{
                      backgroundColor: getModeColor(post.type),
                    }}
                  />
                  {WRITE_TYPE.find(x => x.value === post.type)?.label}
                </div>
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
                    return (
                      <div key={x}>
                        {
                          POSITIONS.find(position => position.value === x)
                            ?.label
                        }
                      </div>
                    );
                  })}
                </div>
                <div className="tech-stack">
                  {JSON.parse(post.techStack).map(
                    (x: string, index: number) => {
                      if (index > 4) return null;
                      return (
                        <img
                          src={getStackImageUrl(x)}
                          key={x}
                          draggable={false}
                        />
                      );
                    },
                  )}
                  {!!(JSON.parse(post.techStack).length > 5) && (
                    <div className="tech-stack-count">
                      +{JSON.parse(post.techStack).length - 5}
                    </div>
                  )}
                  <div className="comment-section">
                    <div className="view-count">
                      <BsEye size="1.2rem" /> {post.view}
                    </div>
                    <div className="comments">
                      <BsChatLeft size="1.2rem" /> {post.commentCnt}
                    </div>
                    {user?.id && (
                      <div
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        {bookmarkIds?.find(id => id === post.id) ? (
                          <BsBookmarkFill
                            size={'1.2rem'}
                            onClick={() => onDeleteBookmark(post.id)}
                          />
                        ) : (
                          <BsBookmark
                            size={'1.2rem'}
                            onClick={() => onClickBookmark(post.id)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </PostItem>
          );
        })}
        <Pagination
          activePage={filter.offset + 1}
          itemsCountPerPage={limit}
          totalItemsCount={totalElements || 0}
          pageRangeDisplayed={5}
          prevPageText={'‹'}
          nextPageText={'›'}
          firstPageText={'«'}
          lastPageText={'»'}
          onChange={number => {
            setFilter({
              ...filter,
              offset: number - 1,
            });
            handleScrollToTop();
          }}
        />
      </PostListWrapper>
      <div className="side-box">
        <RecommendPostList />
      </div>
      <ProfileDetailModal userId={userId} setUserId={setUserId} />
      <ToastContainer />
    </Wrapper>
  );
};
