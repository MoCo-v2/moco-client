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
      padding: 5rem 0 0;
      font-size: 2rem;
    }
  }

  .comment-section {
    .comment-count {
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
      font-weight: 700;
      span {
        color: #939393;
      }
    }
    .comment-write {
      display: flex;
      align-items: start;
      gap: 1.5rem;
      img {
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
        object-fit: cover;
      }
      textarea {
        font-size: 1.6rem;
        font-family: inherit;
        padding: 1rem 1rem 1.5rem;
        outline: none;
        border: 2px solid #e1e1e1;
        border-radius: 1.6rem;
        width: 100%;
        min-height: 10rem;
        margin-bottom: 1rem;
        resize: none;
      }
    }
    .btn-wrapper {
      display: flex;
      justify-content: flex-end;
      margin: 1.6rem 0 2.4rem;
      .btn {
        min-width: 8rem;
        font-size: 1.6rem;
        font-weight: 600;
        padding: 0.8rem 1.5rem;
        border-radius: 5rem;
      }
    }
    .comment-list {
      .comment-item {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        padding: 2.4rem 0;
        border-bottom: 3px solid #f2f2f2;
        .comment-writer {
          display: flex;
          align-items: center;
          gap: 1rem;
          img {
            height: 4rem;
            width: 4rem;
            border-radius: 50%;
            object-fit: cover;
          }
          & > div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 1.4rem;
            .writer {
              color: #333;
              font-weight: 700;
            }
            .created {
              color: #717171;
            }
          }
          .comment-delete-btn {
            color: #ff4d4f;
            font-size: 1.4rem;
            cursor: pointer;
            margin-left: auto;
          }
        }
        .comment-content {
          font-size: 1.6rem;
        }
      }
    }
  }
`;
