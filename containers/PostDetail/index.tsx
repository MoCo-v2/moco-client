import {ResponsePost} from '@/modules';

import {Wrapper} from './style';

interface Props {
  post: ResponsePost;
}

export const PostDetail = (props: Props) => {
  const {post} = props;

  return (
    <Wrapper>
      <section>
        <div className="title">{post.title}</div>
      </section>
    </Wrapper>
  );
};
