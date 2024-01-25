import Link from 'next/link';

import {useRecommendPost} from '@/hooks/useRecommendPost';
import {ROUTE_POST} from '@/routes';

import {Wrapper} from './style';

interface Props {}

export const RecommendPostList = (props: Props) => {
  const {data} = useRecommendPost();

  return (
    <Wrapper>
      <div className="title">🔥 이번주 인기 게시글</div>
      {data?.map((post, index) => (
        <div key={post.id} className="item">
          <Link
            className="item-title"
            href={{
              pathname: `${ROUTE_POST}`,
              query: {
                id: post.id,
              },
            }}
          >
            <div className="item-title">{post.title}</div>
          </Link>
          <div className="item-type">
            <div className="item-type-symbol" />
            {post.type}
          </div>
        </div>
      ))}
    </Wrapper>
  );
};
