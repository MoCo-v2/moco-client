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

  .post-info-section {
    .writer-image {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3rem;
      img {
        width: 8rem;
        height: 8rem;
        object-fit: cover;
        border-radius: 1rem;
      }
      .modify-box {
        display: flex;
        justify-content: flex-end;
        gap: 2rem;
        font-size: 1.6rem;
        font-weight: 500;
        span {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
            font-weight: 600;
          }
        }
      }
    }
    .post-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3rem;
      .title {
        max-width: 80%;
        font-size: 2.4rem;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .bookmark-btn {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1rem;
        font-size: 1.4rem;
        font-weight: 600;
        color: #939393;
        span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      }
    }
    .writer-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3rem;
      .writer-name {
        font-size: 1.8rem;
        color: #0d6efd;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .post-created {
        font-size: 1.4rem;
        color: #717171;
      }
    }
    .post-detail-info {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      .box {
        border: 1px solid #d8d8d8;
        border-radius: 0.8rem;
        display: flex;
        height: 10rem;
        padding: 0 2rem;
        align-items: center;
        justify-content: space-between;
        .box-item {
          min-width: 20rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.5rem;
          .label {
            font-size: 1.6rem;
            color: #717171;
          }
          .value {
            font-size: 1.8rem;
            color: #333;
            display: flex;
            align-items: center;
            img {
              width: 3.2rem;
              height: 3.2rem;
              margin-right: 1rem;
            }
          }
        }
        .box-item + .box-item {
          border-left: 1px solid #d8d8d8;
          padding-left: 2rem;
        }
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
`;

export const StyledWriteComment = styled.div`
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
`;

export const StyledCommentList = styled.div`
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
        cursor: pointer;
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
      .comment-modify-btn-wrap {
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 1rem;
        margin-left: auto;
        font-size: 1.4rem;
        cursor: pointer;
        .comment-delete-btn {
          color: #ff4d4f;
        }
      }
    }
    .comment-content {
      font-size: 1.6rem;
      white-space: pre;
    }
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
    resize: none;
  }
  .btn-wrapper {
    display: flex;
    justify-content: flex-end;
    margin: 1.6rem 0 2.4rem;
    gap: 1rem;
    .btn {
      min-width: 8rem;
      font-size: 1.6rem;
      font-weight: 600;
      padding: 0.8rem 1.5rem;
      border-radius: 5rem;
    }
  }
`;
