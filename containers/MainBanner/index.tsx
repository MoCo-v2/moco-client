import {useMemo, useRef, useState} from 'react';

import Slider from 'react-slick';

import {BannerContainer, SlideIndicator, Wrapper} from './style';
import {useBannerList} from '@/hooks/useBannerList';

export const MainBanner = () => {
  const slickRef = useRef<Slider>(null);
  const {data} = useBannerList();

  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerList = useMemo(() => {
    if (!data?.length) return [<></>];
    return data.map((x, idx) => (
      <div key={x.id}>
        <BannerContainer
          bgcolor={x.backgroundColor}
          onClick={() => onClickBanner(x.pageLink)}
        >
          <div className="box">
            <div className="text-box">
              <div className="banner-title">{x.title}</div>
              <div className="banner-content">{x.content}</div>
              <div className="banner-description">{x.description}</div>
            </div>
            <img src={x.imageLink} alt="banner" />
          </div>
        </BannerContainer>
      </div>
    ));
  }, [data]);

  const onClickBanner = (link?: string) => {
    if (link) window.open(link, '_blank');
  };

  const previous = () => {
    slickRef?.current?.slickPrev();
  };
  const next = () => {
    slickRef?.current?.slickNext();
  };

  return (
    <Wrapper>
      <Slider
        ref={slickRef}
        initialSlide={0}
        fade
        infinite
        speed={400}
        slidesToShow={1}
        slidesToScroll={1}
        arrows={false}
        beforeChange={(_, v) => setCurrentSlide(v)}
        autoplay
        autoplaySpeed={3000}
      >
        {bannerList}
      </Slider>

      <SlideIndicator>
        <button className="left" onClick={previous}>
          <svg
            width="2.4rem"
            height="2.4rem"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 16.34l4.58-4.59L9 7.16l1.41-1.41 6 6-6 6L9 16.34z"
            ></path>
          </svg>
        </button>
        <div className="pagination">
          <span className="page-index">{currentSlide + 1}</span>
          <span className="divider" />
          <span className="page-index">{bannerList.length}</span>
        </div>
        <button className="right" onClick={next}>
          <svg
            width="2.4rem"
            height="2.4rem"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 16.34l4.58-4.59L9 7.16l1.41-1.41 6 6-6 6L9 16.34z"
            ></path>
          </svg>
        </button>
      </SlideIndicator>
    </Wrapper>
  );
};
