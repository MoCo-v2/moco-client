import styled from 'styled-components';

import {Form} from 'react-bootstrap';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
  margin: 0 auto;
  color: #333;
  grid-gap: 50px;
  gap: 50px;
  position: relative;

  .custom-radio-wrapper {
    margin-bottom: 4.5rem;
  }

  .flex-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.6rem;
    margin-bottom: 3.2rem;
    & > div {
      width: 100%;
    }
  }

  .ProseMirror {
    padding: 0;
    border-top: 1px solid #dce1e6;
    border-bottom: 1px solid #dce1e6;
    border-radius: 0;
    padding: 1.2rem 1.4rem;
  }
`;

export const StyledForm = styled(Form)`
  width: 1024px;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  .form-label {
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.7;
  }
  .form-control {
    padding: 1.2rem 1.4rem;
    border: 1px solid #dce1e6;
    border-radius: 0.6rem;
    font-size: 1.6rem;
    margin-bottom: 1.6rem;
  }
  .form-control:valid {
    border: 1px solid #dce1e6;
    background-image: none;
  }
  .btn-wrapper {
    margin: 2rem 0 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75rem;
    .btn {
      min-width: 8rem;
      font-size: 1.6rem;
      font-weight: 600;
      padding: 0.8rem 1rem;
    }
  }
`;
