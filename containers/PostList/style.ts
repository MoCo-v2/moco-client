import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding: 2rem 6rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  .side-box {
    position: sticky;
    top: 2rem;
    min-width: 25rem;
    width: 60rem;
    height: 100%;
  }

  @media screen and (max-width: 1080px) {
    width: 100%;
    padding: 3rem 1.5rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 2rem;

    .side-box {
      position: relative;
      top: 0;
      min-width: 100%;
      width: 100%;
      height: 100%;
    }
  }
`;

export const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  min-width: 40rem;

  a {
    text-decoration: none;
    color: #000;
  }

  .pagination {
    align-items: center;
    justify-content: center;

    li {
      width: 3.2rem;
      height: 3.2rem;
      margin: 0 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      cursor: pointer;
      &.active {
        background: #0d6efd;
        border-radius: 100%;
        a {
          color: #fff;
        }
      }
      a {
        color: #000;
        text-decoration: none;
      }
    }
  }
`;

export const PostItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border: 1px solid #d1d1d1;
  border-radius: 1rem;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
  }

  .writer-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    .profile {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      img {
        width: 4rem;
        height: 4rem;
        object-fit: cover;
        border-radius: 100%;
      }
      .name {
        font-size: 1.5rem;
        font-weight: 700;
      }
    }
    .dead-line {
      font-size: 1.2rem;
      color: #a1a1a1;
    }
    .type {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-left: auto;
      color: #4a5e75;
      font-weight: 700;
      font-size: 1.2rem;
      .item-type-symbol {
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
      }
    }
  }
  .content {
    overflow: hidden;
    border-top: 1px solid #d1d1d1;
    padding: 1rem 0;
    .title {
      font-size: 1.8rem;
      font-weight: 700;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
  .post-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .recruitment-position {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      div {
        padding: 0.5rem 1rem;
        border-radius: 1.5rem;
        background: #f2f4f8;
        color: #4a5e75;
        font-weight: 700;
      }
    }
    .tech-stack {
      display: flex;
      align-items: flex-end;
      gap: 1rem;
      img {
        width: 4rem;
        height: 4rem;
        object-fit: cover;
      }
      .tech-stack-count {
        font-size: 1.6rem;
        color: #4a5e75;
        font-weight: 700;
      }
    }
  }
  .comment-section {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    & > div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;
