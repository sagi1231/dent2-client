import styled from "styled-components";
import Link from "../common/Link";

const MenuItemBold = styled(Link)`
  background: white;
  border-radius: 600px;
  color: #0a2540;
  font-weight: 500;
  text-decoration: none;
  font-size: 14px;
  letter-spacing: -0.1px;
  text-transform: capitalize;
  transition: transform 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
  transition-property: background-color, opacity;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  cursor: pointer;
  display: flex;
  font-family: "Assistant";
  align-items: center;

  line-height: 100%; /* 0.875rem */
  letter-spacing: -0.02625rem;

  & svg {
    margin-right: 10px;
    height: 18px;
    width: 18px;
  }
  &:hover .HoverArrow__linePath {
    opacity: 1;
  }

  &:hover .HoverArrow__tipPath {
    opacity: 1;
    transition: transform 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translateX(3px);
  }

  & .HoverArrow {
    width: 10px;
    height: 10px;
    --arrowSpacing: 10px;
    --arrowHoverTransition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
    --arrowHoverOffset: translateX(3px);
    --arrowTipTransform: none;
    --arrowLineOpacity: 0;
    position: relative;
    top: 1px;

    margin-left: var(--arrowSpacing);
    stroke-width: 2px;
    fill: none;
    stroke: currentColor;
  }
  & .HoverArrow__linePath {
    opacity: var(--arrowLineOpacity);
    transition: opacity var(--hoverTransition, var(--arrowHoverTransition));
  }
  & .HoverArrow__tipPath {
    transform: var(--arrowTipTransform);
    transition: transform var(--hoverTransition, var(--arrowHoverTransition));
  }
`;

export default MenuItemBold;
