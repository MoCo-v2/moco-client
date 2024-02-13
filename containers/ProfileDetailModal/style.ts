import {Modal} from 'react-bootstrap';
import styled from 'styled-components';

export const CustomModal = styled(Modal)`
  --bs-modal-header-padding: 1.5rem;
  --bs-modal-padding: 1.5rem;
  --bs-modal-border-radius: 2rem;
  --bs-modal-border-color: linear-gradient(45deg, #bfbfd9, #fff);
  --bs-modal-width: 54rem;

  .modal-content {
    background: linear-gradient(45deg, #bfbfd9, #fff);
  }
`;

export const CustomBody = styled.div`
  padding: 5rem 3rem;

  .top {
    display: flex;
    gap: 3.5rem;
    margin-bottom: 1.5rem;
    .top-left {
      img {
        width: 14rem;
        height: 14rem;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .top-right {
      display: flex;
      flex-direction: column;
      .info {
        display: flex;
        gap: 0.4rem;
        margin-bottom: 1rem;
        font-size: 1.6rem;
        font-weight: 700;
        .position {
          color: #0d6efd;
        }
        .career {
          color: #6c757d;
        }
      }
      .name {
        font-size: 2rem;
        margin-bottom: 1rem;
        font-weight: 700;
      }
      .intro {
        font-size: 1.4rem;
        color: #555;
        white-space: pre-line;
      }
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    border-top: 2px solid #d1d1d1;
    padding-top: 1.5rem;
    .label {
      font-size: 1.6rem;
      font-weight: 700;
      color: #333;
      margin-right: 1rem;
      min-width: fit-content;
    }
    .stacks {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      .stack {
        display: inline-block;
        padding: 0.5rem 1rem;
        color: #333;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 6rem;
        font-size: 1.3rem;
      }
    }
  }
`;
