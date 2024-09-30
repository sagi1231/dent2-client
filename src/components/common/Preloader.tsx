import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/Logo/DnetLogo.svg";

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
  disableFullPage?: boolean;
}

const LoadingContainer = styled.div<{ disableFullPage?: boolean }>`
  position: ${({ disableFullPage }) => (disableFullPage ? "unset" : "fixed")};
  width: ${({ disableFullPage }) => (disableFullPage ? "100%" : "100vw")};
  height: ${({ disableFullPage }) => (disableFullPage ? "90%" : "100vh")};
  background: white;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10;
`;

const Loader = styled.div`
  border-radius: 50%;
  position: relative;
  display: flex;
  width: 650px;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  & span {
    display: block;
    background: #ddd;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    perspective: 100000px;
    margin: 0 14px;
  }

  & span:nth-child(1) {
    animation: bounce2 1s cubic-bezier(0.04, 0.35, 0, 1) infinite;
    animation-delay: 0s;
    background: #a960ee;
  }
  & span:nth-child(2) {
    animation: bounce2 1s cubic-bezier(0.04, 0.35, 0, 1) infinite;
    animation-delay: 0.2s;
    background: #f92b75;
  }
  & span:nth-child(3) {
    animation: bounce2 1s cubic-bezier(0.04, 0.35, 0, 1) infinite;
    animation-delay: 0.4s;
    background: #ffcb57;
  }
  & span:nth-child(4) {
    animation: bounce2 1s cubic-bezier(0.04, 0.35, 0, 1) infinite;
    animation-delay: 0.6s;
    background: #90e0ff;
  }

  @keyframes bounce2 {
    0%,
    56%,
    100% {
      transform: translateY(0px);
    }
    25% {
      transform: translateY(-30px);
    }
  }
`;

const PreloaderText = styled.div`
  width: 30rem;
  color: #0a2540;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 1.5rem */
  letter-spacing: -0.045rem;
  text-align: center;
  margin-top: 60px;
`;

const LogoPos = styled.div`
  position: absolute;
  top: 40px;
`;

const Preloader: React.FC<Props> = ({ children, disableFullPage }) => {
  return (
    <LoadingContainer disableFullPage={disableFullPage}>
      <Loader>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </Loader>
      <PreloaderText>{children}</PreloaderText>
    </LoadingContainer>
  );
};

export default Preloader;
