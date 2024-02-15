import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 150%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
  @keyframes fadeInSide {
    0% {
      opacity: 0;
      transform: translate3d(20%, 0, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }

  .slick-current {
    .banner-title {
      position: relative;
      animation: fadeInUp 0.5s;
    }
    .banner-content {
      position: relative;
      animation: fadeInUp 1s;
    }
    .banner-description {
      position: relative;
      animation: fadeInUp 1.2s;
    }
    img {
      position: relative;
      animation: fadeInSide 1.5s;
    }
  }
`;

export const SlideIndicator = styled.div`
  position: absolute;
  bottom: 10rem;
  left: calc((100% - 1200px) / 2);
  @media (max-width: 1200px) {
    left: 0;
  }

  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.4rem 0.8rem;
  letter-spacing: -1px;
  line-height: 1.5;
  background-color: #2c323b;
  color: #fff;
  font-size: 1.4rem;
  border-radius: 10rem;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background: none;
    cursor: pointer;
  }

  .left {
    transform: rotate(180deg);
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;

    .page-index {
      width: 0.9rem;
      text-align: center;
    }

    .divider {
      width: 0.1rem;
      height: 1.2rem;
      border: 0 solid rgba(255, 255, 255, 0.2);
      border-left-width: 0.1rem;
      margin: 0 0.7rem;
      transform: rotate(16deg);
    }
  }
`;

export const BannerContainer = styled.div<{bgcolor: string}>`
  width: 100%;
  height: 40rem;
  cursor: pointer;
  background: ${props => (props.bgcolor ? `${props.bgcolor}` : '#fff')};
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
    gap: 10rem;
    .text-box {
      .banner-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #000;
      }
      .banner-content {
        font-size: 2.8rem;
        font-weight: 700;
        color: #000;
        margin-bottom: 0.8rem;
      }
      .banner-description {
        font-size: 2.1rem;
        color: #000;
      }
    }
    img {
      width: 30rem;
      height: 30rem;
      object-fit: contain;
      cursor: pointer;
    }
  }
`;
