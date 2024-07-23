import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../common/Card";
import { ReactComponent as LogoIcon } from "../../assets/Logo/ColoredIcon.svg";

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
}

const UiBlcok = styled.div`
  position: fixed;
  overflow: hidden;
  background: rgb(255 255 255 / 91%);
  width: 100%;
  height: 100%;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;

  .card {
    padding: 5rem;
    width: 85%;
    display: flex;
    gap: 45px;
    align-items: center;
    flex-direction: column;
    height: auto;

    svg {
      width: 120px;
      height: 120px;
    }
    div {
      text-align: center;
      font-size: 48px;
      font-weight: bold;
      letter-spacing: -0.6px;
    }
  }
`;

const Wrapper = styled.div`
  @media only screen and (min-device-width: 600px) {
    .asd {
      display: none;
    }
  }
`;

const IsMobile: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Wrapper>
        <UiBlcok className="asd">
          <Card className="card">
            <div>
              This platform does not support mobile devices. Please use a
              desktop device instead.
            </div>
          </Card>
        </UiBlcok>
      </Wrapper>
      {children}
    </>
  );
};

export default IsMobile;
