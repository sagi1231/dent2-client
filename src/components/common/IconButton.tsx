import styled from "styled-components";
import Link from "./Link";

interface Props {
  icon?: JSX.Element;
  width?: string;
  className?: string;
  path?: string;
  global?: boolean;
}

const ButtonWrapper = styled.div<Props>`
  transition-duration: 0.3s;
  border-radius: 50%;
  width: ${(props) => (props.width ? `calc(${props.width}px + 15px)` : "15px")};
  height: ${(props) =>
    props.width ? `calc(${props.width}px + 15px)` : "15px"};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: var(--light-bg);
  }
  svg {
    width: ${(props) => (props.width ? `${props.width}px` : "10px")};
    height: ${(props) => (props.width ? `${props.width}px` : "10px")};
  }
`;

const IconButton: React.FC<Props> = (props) => {
  return (
    <Link global={props.global} path={props.path}>
      <ButtonWrapper {...props} className={props.className}>
        {props.icon && <>{props.icon}</>}
      </ButtonWrapper>
    </Link>
  );
};

export default IconButton;
