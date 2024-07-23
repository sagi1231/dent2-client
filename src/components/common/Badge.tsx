import styled from "styled-components";
import { ReactComponent as SpeaklesIcon } from "../../assets/Icons/Sparkles.svg";
import { Color } from "../../core/theme/types/color";
import { Theme } from "../../core/theme/theme";

interface Props {
  children: JSX.Element | string;
  icon?: JSX.Element;
  bgColor: Color;
  textColor?: Color;
  large?: boolean;
  onClick?: () => void;
  clickable?: boolean;
  hover?: boolean;
}

const BadgeStyle = styled.div<{
  bgColor: Color;
  textColor?: Color;
  large?: boolean;
  hover?: boolean;
  clickable?: boolean;
}>`
  display: flex;
  padding: ${(props) => (props.large ? "0.7rem 0.95rem;" : "0.25rem 0.75rem")};
  justify-content: center;
  align-items: center;
  gap: 0.3125rem;
  border-radius: 6px;
  font-size: ${(props) => (props.large ? "0.75rem;" : "0.625rem")};
  ${(props) => (props.clickable ? "cursor:pointer" : "cursor:auto")};
  font-style: normal;
  color: ${(props) =>
    props.textColor ? Theme.colors[props.textColor] : "white"};
  font-weight: 400;
  letter-spacing: -0.01875rem;
  text-transform: capitalize;
  position: relative;
  background: ${(props) => Theme.colors[props.bgColor]};
  border: solid 1px transparent;
  &:hover {
    border-color: ${(props) =>
      props.hover ? "var(--primary-purple);" : "transparent"};
  }

  &:hover .kw-overly {
    opacity: 1;
  }

  &:hover .kw-overly svg path {
    opacity: 1;
  }
`;

const Badge: React.FC<Props> = ({
  bgColor,
  textColor,
  icon,
  children,
  large,
  onClick,
  hover,
  clickable,
}) => {
  return (
    <BadgeStyle
      textColor={textColor}
      bgColor={bgColor}
      large={large}
      onClick={onClick}
      clickable={clickable}
      hover={hover}
    >
      {icon || null}
      {children}
    </BadgeStyle>
  );
};

export default Badge;
