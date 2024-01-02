import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 90rem;
  display: flex;
  flex-direction: column;
  padding: 60px 0;
  margin: 0 auto;
  color: #333;
  grid-gap: 50px;
  gap: 50px;
  position: relative;

  .bn-inline-content {
    min-height: 2rem;
  }

  .Toastify__toast-body {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .writer-section {
    .title {
      font-weight: 800;
      font-size: 3.6rem;
      color: #000;
    }
    .writer-info {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 3.2rem 0;
      border-bottom: 3px solid #f2f2f2;
      img {
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
        object-fit: cover;
      }
      .writer {
        font-size: 1.8rem;
        font-weight: 700;
      }
      .created {
        font-size: 1.8rem;
        color: #717171;
      }
    }
  }

  .study-info-section {
    font-size: 2rem;
    font-weight: 700;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 50%;
      margin-bottom: 2.4rem;
      display: flex;
      align-items: center;
      .label {
        color: #717171;
        margin-right: 3.6rem;
      }
      .value {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }
  }

  .content-section {
    .content-title {
      font-size: 2.4rem;
      font-weight: bold;
      padding: 3.2rem 0;
      border-bottom: 3px solid #f2f2f2;
    }
    .post-content {
      padding: 5rem 0;
      font-size: 2rem;
    }
  }

  .comment-section {
    .comment-count {
    }
    .comment-write {
      .btn {
        min-width: 8rem;
        font-size: 1.6rem;
        font-weight: 600;
        padding: 0.8rem 1rem;
      }
    }
  }
`;
