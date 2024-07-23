import styled from "styled-components";
import Link, { LinkProps } from "../Link";
import { ReactComponent as ArrowRight } from "../../../assets/Icons/ArrowRight.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/Icons/ArrowLeft.svg";
import {
  useCallback,
  MouseEvent as MouseEventGeneric,
  useId,
  useMemo,
} from "react";
import { Tooltip } from "primereact/tooltip";
import { ProgressSpinner } from "primereact/progressspinner";
import { Color } from "../../../core/theme/types/color";
import { Theme } from "../../../core/theme/theme";

interface Attributes extends React.AllHTMLAttributes<HTMLDivElement> {
  arrowPlacement?: "left" | "right";
  primary?: boolean;
  loading?: boolean;
  icon?: JSX.Element;
  textColor?: Color;
  bgColor?: Color;
  hoverComponent?: JSX.Element;
  fullWidth?: boolean;
  disabledButton?: boolean;
  borderColor?: Color;
}

const IconWrapper = styled.div<Attributes>`
  display: flex;
  justify-content: center;
  align-items: "center";

  & svg {
    width: 14px;
    height: 14px;
    fill: ${(props) => {
      if (props.textColor) {
        return Theme.colors[props.textColor];
      } else {
        if (props.primary) {
          return Theme.colors.white;
        } else {
          return Theme.colors.title;
        }
      }
    }};
    margin-left: 10px;
  }
`;

const HoverComponent = styled.div`
  opacity: 0;
`;

const StyledButton = styled.div<Attributes>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};
  justify-content: ${({ fullWidth }) => (fullWidth ? "space-between" : "")};
  display: flex;
  align-items: center;
  padding: 15px 25px;
  border: ${({ borderColor }) =>
    borderColor ? "1px solid " + Theme.colors[borderColor] : "none"};
  background: ${(props) =>
    props.bgColor
      ? Theme.colors[props.bgColor]
      : props.primary
      ? Theme.colors.title
      : Theme.colors.white};
  border-radius: 8px;

  color: ${(props) =>
    props.textColor
      ? Theme.colors[props.textColor]
      : props.primary
      ? Theme.colors.white
      : Theme.colors.title};
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
  letter-spacing: -0.1px;
  text-transform: capitalize;
  transition: transform 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
  transition-property: background-color, opacity;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  cursor: ${({ disabledButton }) =>
    disabledButton ? "not-allowed" : "pointer"};

  &:hover {
    background: ${(props) =>
      props.primary ? "#061b2d" : Theme.colors[props.bgColor ?? "transparent"]};

    ${HoverComponent} {
      opacity: 1;
    }
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
    --arrowSpacing: 5px;
    --arrowHoverTransition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
    --arrowHoverOffset: translateX(3px);
    --arrowTipTransform: none;
    --arrowLineOpacity: 0;
    position: relative;
    top: 1px;
    margin-right: ${({ arrowPlacement }) =>
      arrowPlacement == "right" ? "var(--arrowSpacing);" : "0;"};
    margin-left: ${({ arrowPlacement }) =>
      arrowPlacement == "left" ? "var(--arrowSpacing);" : "0;"};
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

const LoaderStyled = styled(ProgressSpinner)<{ primary?: boolean }>`
  .p-progress-spinner-circle {
    stroke: ${({ primary }) =>
      primary ? "white !important" : "black !important"};
    width: 20px !important;
    height: 20px !important;
    padding: 0px;
  }

  width: 20px !important;
  height: 20px !important;
  padding: 0px;
  margin: 0px;
`;

const ArrowAndComponentWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const Button: React.FC<Attributes> = (props) => {
  const onClickInternal = useCallback(
    (e: MouseEventGeneric<HTMLDivElement, MouseEvent>) => {
      if (!props.disabled) {
        return props.onClick && props.onClick(e);
      }
    },
    [props]
  );

  return (
    <>
      {props["data-pr-tooltip"] && (
        <Tooltip target={`#gw-button${props.name || ""}`} />
      )}
      <StyledButton
        id={`gw-button${props.name || ""}`}
        {...props}
        disabledButton={props.disabled || props.loading}
        onClick={onClickInternal}
        as={undefined}
        disabled={false}
      >
        {props.loading && (
          <IconWrapper>
            <LoaderStyled primary={props.primary} strokeWidth="8px" />
          </IconWrapper>
        )}

        {!props.loading && (
          <>
            {props.arrowPlacement === "left" && <ArrowRight />}
            {props.icon && (
              <IconWrapper primary={props.primary}>{props.icon}</IconWrapper>
            )}
          </>
        )}

        {props.children}
        <ArrowAndComponentWrapper>
          {props.hoverComponent && (
            <HoverComponent>{props.hoverComponent}</HoverComponent>
          )}
          {!props.loading && props.arrowPlacement === "right" && <ArrowLeft />}
        </ArrowAndComponentWrapper>
      </StyledButton>
    </>
  );
};

export default Button;
