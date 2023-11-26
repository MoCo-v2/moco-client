import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
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
