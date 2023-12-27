import styled from 'styled-components';

import {Form} from 'react-bootstrap';

export const Wrapper = styled.div`
  max-width: 1040px;
  display: flex;
  flex-direction: column;
  padding: 60px 16px;
  width: 1024px;
  margin: 0 auto;
  color: #333;
  grid-gap: 50px;
  gap: 50px;
  position: relative;

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
`;

export const StyledForm = styled(Form)`
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
`;
