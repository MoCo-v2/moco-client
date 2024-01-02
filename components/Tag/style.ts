import styled from 'styled-components';

export const StyledTag = styled.div<{underline?: boolean}>`
  padding: 0.6rem 1rem;
  background: #f2f4f8;
  border-radius: 1.5rem;
  font-weight: 700;
  font-size: 1.4rem;
  text-align: center;
  color: #4a5e75;
  text-decoration: ${props => (props.underline ? 'underline' : 'none')};
  cursor: ${props => (props.underline ? 'pointer' : 'default')};
`;
