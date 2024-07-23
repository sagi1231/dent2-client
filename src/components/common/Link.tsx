import { Button } from "primereact/button";
import {
  HtmlHTMLAttributes,
  MouseEvent as MouseEventGeneric,
  useCallback,
} from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import useNavigator from "../../hooks/useNavigator";

type child = React.ReactElement | string;
export interface LinkProps extends React.AllHTMLAttributes<HTMLAnchorElement> {
  path?: string;
  global?: boolean;
  children?: child | child[];
  differentTab?: boolean;
}

const Link: React.FC<LinkProps> = (props) => {
  const navigate = useNavigator();
  const onClick = useCallback(
    (e: MouseEventGeneric<HTMLAnchorElement, MouseEvent>) => {
      if (props.path) {
        if (props.differentTab) {
          window.open(props.path);
        } else {
          navigate(props.path, props.global);
        }
      } else if (props.onClick) {
        props.onClick(e);
      }
    },
    [navigate, props]
  );

  return (
    <a style={{ cursor: "pointer" }} {...props} onClick={onClick}>
      {props.children}
    </a>
  );
};

export default Link;
