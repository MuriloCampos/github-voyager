import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Title = styled.h1`
  margin-left: 10px;
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;
  animation: ${appearFromLeft} 1s;

  margin-top: 80px;
`;

export const Repositories = styled.div`
  margin-top: 40px;
  flex: 1;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      @media only screen and (max-width: 768px) {
        width: 32px;
        height: 32px;
      }
    }

    div {
      margin-left: 16px;

      strong {
        font-size: 20px;
        color: #3d3d4d;
        @media only screen and (max-width: 768px) {
          max-width: 200px;
        }
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
        max-width: 700px;
        @media only screen and (max-width: 768px) {
          max-width: 200px;
        }
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 8px;
      }

      span {
        align-self: flex-end;
        padding: 4px 8px 4px 4px;
        margin-left: 5px;
        background: #3172b7;
        border-radius: 4px;
        font-size: 14px;
        opacity: 0.7;
        line-height: 20px;
        color: #fff;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const PagesIndex = styled.div`
  display: flex;
  flex: 1;
  place-content: center;
  margin-top: 40px;
`;

export const SkeletonDiv = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  div {
    margin-left: 16px;
  }
`;

export const FabStyled = styled.div`
  margin: 0px;
  top: auto;
  right: 20px;
  bottom: 20px;
  left: auto;
  position: fixed;
`;
