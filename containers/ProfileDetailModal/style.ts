import styled from 'styled-components';

export const Wrppaepr = styled.div`
  padding: 3rem;
  .top {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #d1d1d1;
    img {
      width: 9rem;
      height: 9rem;
      object-fit: cover;
      border-radius: 50%;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      &-top {
        font-size: 2.4rem;
        font-weight: 700;
      }
      &-middle {
        display: flex;
        gap: 0.4rem;
        font-size: 1.6rem;
        font-weight: 700;
        .position {
          color: #0d6efd;
        }
        .career {
          color: #6c757d;
        }
      }
      &-bottom {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        .label {
          font-size: 1.4rem;
          font-weight: 700;
          padding-right: 0.5rem;
          color: #6c757d;
        }
        .stack {
          padding: 0.5rem 1rem;
          border-radius: 1.5rem;
          background: #f2f4f8;
          color: #4a5e75;
          font-weight: 700;
        }
      }
    }
  }

  .bottom {
    min-height: 10rem;
    padding: 2rem 0 0;
    font-size: 1.6rem;
    color: #333;
    white-space: pre;
  }
`;
