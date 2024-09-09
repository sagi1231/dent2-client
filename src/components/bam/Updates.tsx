import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Card from "../common/Card";
import { ReactComponent as LogoIcon } from "../../assets/Logo/ColoredIcon.svg";
import bamService from "../../core/services/bam.service";
import { useRecoilValue } from "recoil";
import { bamTableState } from "../../state/bamTableState";

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
}
const Wrapper = styled.div`
  width: 100%;
`;

const BamUpdates: React.FC<Props> = () => {
  const bamTable = useRecoilValue(bamTableState);
  return (
    <>
      {bamTable.map((item) => (
        <a>{item.malshabBase.firstname}</a>
      ))}
      <Wrapper></Wrapper>
    </>
  );
};

export default BamUpdates;
