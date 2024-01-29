import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  border: 1px solid #d2d2d2;
  border-radius: 1rem;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.8rem;
    font-weight: 800;
    .reset-btn {
      font-size: 1.4rem;
      font-weight: 500;
      color: #828282;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
