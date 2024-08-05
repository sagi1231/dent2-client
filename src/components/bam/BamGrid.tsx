import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../common/Card";
import { ReactComponent as LogoIcon } from "../../assets/Logo/ColoredIcon.svg";

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
}
const Wrapper = styled.div`
  width: 100%;
`;

const BamGrid: React.FC<Props> = () => {
  return (
    <>
      <Wrapper></Wrapper>
    </>
  );
};

export default BamGrid;
