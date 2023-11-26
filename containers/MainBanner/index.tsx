import {useMemo, useRef, useState} from 'react';

import styled from 'styled-components';
import Slider from 'react-slick';

import {getRandomColor} from '@/utils';

import {SlideIndicator, Wrapper} from './style';

const BannerContainer = styled.div`
  width: 100%;
  height: 40rem;
  cursor: pointer;
`;
const DummyContent = styled.div`
  width: 1200px;
  height: 40rem;
  cursor: pointer;
  margin: 0 auto;
`;

export const MainBanner = () => {
  const slickRef = useRef<Slider>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const DummyData = useMemo(() => {
    return Array(5)
      .fill('')
      .map((x, idx) => (
        <div key={idx}>
          <BannerContainer style={{background: getRandomColor()}}>
            <DummyContent />
          </BannerContainer>
        </div>
      ));
  }, []);

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
        fade
        infinite
        speed={400}
        slidesToShow={1}
        slidesToScroll={1}
        arrows={false}
        afterChange={v => setCurrentSlide(v)}
      >
        {DummyData}
      </Slider>

      <SlideIndicator>
        <button className="left" onClick={previous}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 16.34l4.58-4.59L9 7.16l1.41-1.41 6 6-6 6L9 16.34z"
            ></path>
          </svg>
        </button>
        <div className="pagination">
          <span className="page-index">{currentSlide + 1}</span>
          <span className="divider" />
          <span className="page-index">{DummyData.length}</span>
        </div>
        <button className="right" onClick={next}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 16.34l4.58-4.59L9 7.16l1.41-1.41 6 6-6 6L9 16.34z"
            ></path>
          </svg>
        </button>
      </SlideIndicator>
    </Wrapper>
  );
};
