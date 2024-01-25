import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 2rem;
  border: 1px solid #d2d2d2;
  border-radius: 1rem;
  .title {
    font-size: 1.8rem;
    font-weight: 800;
  }

  .item {
    /* margin: 1rem 0; */
    padding: 1.4rem 0;
    border-bottom: 1px solid #d2d2d2;
    .item-title {
      text-decoration: none;
      color: #000;
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      white-space: pre-wrap;
      word-wrap: break-word;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .item-type {
      font-size: 1.2rem;
      font-weight: 500;
      opacity: 0.8;
      display: flex;
      align-items: center;
      gap: 0.6rem;

      .item-type-symbol {
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        background: #0d6efd;
      }
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;
