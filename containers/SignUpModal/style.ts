import styled from 'styled-components';

export const StyledModalTitle = styled.div`
  font-size: 2.4rem;
  font-weight: 900;
  .point-color {
    color: ${({theme}) => theme.color.blue};
  }
`;

export const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    margin: 2rem 0;
    font-size: 2.8rem;
    font-weight: bold;
    text-align: center;
  }
  .btn-wrapper {
    margin: 2rem 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    .btn {
      font-size: 1.6rem;
      font-weight: 600;
      padding: 0.8rem 1rem;
    }
  }
`;
