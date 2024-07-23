import styled from "styled-components";
import { ReactComponent as LogoIcon } from "../../assets/Logo/ColoredIcon.svg";
import { ReactComponent as CloseIcon } from "../../assets/Icons/Close.svg";

interface Props {
  OnClose: () => void;
  title?: string;
  right?: boolean;
  logo?: boolean;
}

const Title = styled.h1`
  font-size: 26px;
  margin: 30px 0;
  color: #0a2540;
  font-weight: 700;
  line-height: 100%; /* 3rem */
  letter-spacing: -0.1rem;
`;

const LogoWrapper = styled.div`
  margin-right: 20px;
  svg {
    width: 35px;
    height: 35px;
  }
`;

const IconWrapper = styled.div<{ right: boolean }>`
  position: absolute;
  ${(props) => (props.right ? "left:-20px" : "right:-20px")};
  cursor: pointer;
  background: white;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition-duration: 0.1s;
  border: solid 1px var(--border-color);
  svg {
    height: 20px;
    width: 20px;

    path {
      transition-duration: 0.1s;
      fill: var(--title-color);
    }
  }

  &:hover {
    /* background: var(--text-color); */

    /* svg path {
      fill: var(--title-color);
    } */
  }
`;

const ModalHeader: React.FC<Props> = (props) => {
  return (
    <div className="flex justify-content-between align-items-center">
      <div className="flex align-items-center">
        {props.logo && (
          <LogoWrapper>
            <LogoIcon />
          </LogoWrapper>
        )}
        <Title>{props.title}</Title>
      </div>
      <IconWrapper onClick={props.OnClose} right={props.right || false}>
        <CloseIcon />
      </IconWrapper>
    </div>
  );
};

export default ModalHeader;
