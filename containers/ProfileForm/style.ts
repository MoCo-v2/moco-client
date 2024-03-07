import styled from 'styled-components';
import {Form} from 'react-bootstrap';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 1.6rem;
  color: #333;
  min-height: calc(100vh - 8.5rem - 20rem);
  justify-content: center;

  .ProseMirror {
    padding: 0;
    border-top: 1px solid #dce1e6;
    border-bottom: 1px solid #dce1e6;
    border-radius: 0;
    padding: 1.2rem 1.4rem;
  }
`;

export const StyledForm = styled(Form)`
  width: 100%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  .picture-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;

    #fileInput {
      display: none;
    }

    img {
      cursor: pointer;
      padding: 1rem;
      display: block;
      height: 15rem;
      width: 15rem;
      border: 1px solid #e1e1e1;
      border-radius: 50%;
      object-fit: cover;
    }

    & > div {
      font-size: 2.6rem;
      font-weight: 500;
      letter-spacing: -0.78px;
    }
    .user-intro {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      width: 100%;
    }
  }

  .form-label {
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.7;
  }
  .required::after {
    content: '*';
    margin-left: 0.4rem;
    color: #ea726f;
  }
  .form-control {
    padding: 1.2rem 1.4rem;
    border: 1px solid #dce1e6;
    border-radius: 0.6rem;
    font-size: 1.6rem;
  }
  .form-control:valid {
    border: 1px solid #dce1e6;
    background-image: none;
  }
  .btn-wrapper {
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    .btn {
      /* min-width: 8rem; */
      font-size: 1.6rem;
      font-weight: 600;
      padding: 0.8rem 1rem;
      border-radius: 5rem;
    }
  }

  .flex-box {
    display: flex;
    justify-content: space-between;
    gap: 2rem;

    & > div {
      width: 100%;
    }
  }
`;
