import styled from "styled-components";

interface Props {
  isActive?: boolean;
  isBold?: boolean;
  isSubMenuItem?: boolean;
}

const getItemColor = (props: Props) => {
  if (props.isActive) {
    if (props.isBold) return "white";
    return "#A960EE";
  } else {
    if (props.isBold) return "#741fff";
    return "var(--text-color)";
  }
};

const getIconColor = (props: Props) => {
  if (props.isActive) {
    if (props.isBold) return "white";
    return "#A960EE";
  } else {
    if (props.isBold) return "#741fff";
    return "var(--text-color)";
  }
};
const MenuItem = styled.div<Props>`
  /* Adapt the colors based on primary prop */
  /* padding: 0.75em 1em; */
  padding: ${(props) => (props.isSubMenuItem ? "0" : "14px 16px")};
  gap: 0.8rem;
  display: flex;
  align-items: center;

  background: ${(props) =>
    props.isActive
      ? props.isSubMenuItem
        ? "white"
        : "#a960ee1f"
      : "transparent"};
  border-radius: 6px;
  font-size: 14px;
  letter-spacing: -0.03rem;

  color: ${(props) => getItemColor(props)};
  cursor: pointer;
  transition-duration: 0.1s;
  border: solid 1px white;
  border-color: ${(props) =>
    props.isActive
      ? props.isSubMenuItem
        ? "white"
        : "var(--primary-purple) !important"
      : "white"};
  svg {
    fill: ${(props) => getIconColor(props)};
    width: 14px;
    height: 14px;
  }
  font-weight: ${(props) => (props.isSubMenuItem ? "400" : "600")};
  &:hover {
    border: solid 1px
      ${(props) => (props.isSubMenuItem ? "white" : "var(--text-color)")};

    color: ${(props) => props.isSubMenuItem && "var(--primary-purple)"};
    svg {
      color: ${(props) => props.isBold && "white"};
    }
  }
`;

export default MenuItem;
