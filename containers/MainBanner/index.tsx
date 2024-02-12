import {useMemo, useRef, useState} from 'react';

import styled from 'styled-components';
import Slider from 'react-slick';

import {SlideIndicator, Wrapper} from './style';
import {useBannerList} from '@/hooks/useBannerList';

const BannerContainer = styled.div`
  width: 100%;
  height: 40rem;
  cursor: pointer;

  img {
    width: 100%;
    height: 40rem;
    object-fit: cover;
    cursor: pointer;
    margin: 0 auto;
  }
`;

export const MainBanner = () => {
  const slickRef = useRef<Slider>(null);
  const {data} = useBannerList();

  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerList = useMemo(() => {
    if (!data?.items?.length) return [<></>];
    return data.items.map((x, idx) => (
      <div key={idx}>
        <BannerContainer>
          <img src={x} alt="banner" />
        </BannerContainer>
      </div>
    ));
  }, [data]);

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
