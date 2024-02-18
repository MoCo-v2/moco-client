import {useState} from 'react';
import Link from 'next/link';

import dayjs from 'dayjs';
import Pagination from 'react-js-pagination';
import {ToastContainer, toast} from 'react-toastify';
import {BsEye, BsChatLeft, BsBookmarkFill} from 'react-icons/bs';

import {ProfileDetailModal} from '../ProfileDetailModal';

import {useUser} from '@/hooks/useUser';
import {useBookmarkPost} from '@/hooks/useBookmarkPost';
import {useLoadingStore} from '@/store/loading';
import {bookmarkAPI} from '@/modules';
import {getModeColor, getStackImageUrl} from '@/utils';
import {ROUTE_POST} from '@/routes';
import {POSITIONS, WRITE_TYPE} from '@/consts';

import {PostItem, PostListWrapper, Wrapper} from './style';

interface Props {}

const limit = 10;

export const MyBookmarkList = (props: Props) => {
  const {} = props;

  const {showLoading, hideLoading} = useLoadingStore();
  const {user} = useUser();

  const [page, setPage] = useState(0);
  const [userId, setUserId] = useState<string | undefined>();

  const {
    data: postList,
    mutation,
    totalElements,
    totalPages,
  } = useBookmarkPost({
    offset: page,
    limit,
    recruit: false,
  });

  const handleScrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const onClickProfile = (userId: string) => {
    setUserId(userId);
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
                      <BsEye size="1.2rem" />
                      {post.view}
                    </div>
                    <div className="comments">
                      <BsChatLeft size="1.2rem" />
                      {post.commentCnt}
                    </div>
                    {user?.id && (
                      <div
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        <BsBookmarkFill
                          size={'1.2rem'}
                          onClick={() => onDeleteBookmark(post.id)}
                        />
                      </div>
                    )}
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
      <ToastContainer />
    </Wrapper>
  );
};
