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
  }
  .content {
    margin: 4rem 0;
    padding-bottom: 4rem;
    /* width: 60%; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2.5rem;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .item-img {
      width: 12.8rem;
      height: 12.8rem;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      color: #fff;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
      border: none;
      cursor: pointer;
      &.google {
        background-color: #fff;
      }
      &.github {
        background-color: #272e33;
      }
      &.kakao {
        background-color: #fae100;
      }
    }
    .desc {
      margin-top: 1rem;
      font-weight: 700;
      font-size: 1.6rem;
      text-align: center;
      color: #565656;
    }
  }
`;
