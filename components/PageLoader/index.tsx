import styled from 'styled-components';
import {Spinner} from 'react-bootstrap';

const SpinContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  .spinner-border {
    --bs-spinner-width: 5rem;
    --bs-spinner-height: 5rem;
    --bs-spinner-border-width: 0.5rem;
  }
`;

export const PageLoader = () => {
  return (
    <SpinContainer>
      <Spinner animation="border" variant="primary" />
    </SpinContainer>
  );
};
