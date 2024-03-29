import styled from 'styled-components';

import {Form} from 'react-bootstrap';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 1.6rem;

  .content {
    display: flex;
    width: 100%;
    max-width: 60rem;
    flex-direction: column;
    padding-top: 8rem;
    color: #0f1317;
    gap: 4rem;

    .title {
      text-align: center;
      font-size: 2.6rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      line-height: 1.5;
    }
  }
  .form-control:valid {
    border: 1px solid #dce1e6;
    background-image: none;
    &:focus {
      border: 1px solid #2684ff;
      box-shadow: none;
    }
  }

  .form-control:invalid {
    border: 1px solid #dce1e6;
    background-image: none;
    &:focus {
      border: 1px solid #2684ff;
      box-shadow: none;
    }
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  .form-label {
    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: -0.01em;
    line-height: 1.7;
  }
  .form-control {
    padding: 1.2rem 1.4rem;
    border: 1px solid #dce1e6;
    border-radius: 0.6rem;
    font-size: 1.6rem;
  }
  .btn {
    margin-top: 1.6rem;
    width: 100%;
    padding: 1.5rem 0;
    border-radius: 0.4rem;
    background-color: #0078ff;
    color: #fff;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.5;
  }
`;

export const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 0 3rem;
  font-size: 2.8rem;
  font-weight: bold;
  text-align: center;

  .btn {
    margin-top: 3rem;
    font-size: 1.6rem;
    font-weight: 600;
    padding: 0.8rem 1rem;
  }
`;
