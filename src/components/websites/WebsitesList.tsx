import React, { useEffect, useMemo } from "react";

import { useNavigate } from "react-router";

import styled from "styled-components";

const NotFoundWrapper = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  span {
    font-size: 18px;
    color: var(--text-color);
    letter-spacing: -0.5px;
  }
`;

const WebsitesList: React.FC = () => {
  const navigate = useNavigate();

  return <div className="grid p-0"></div>;
};

export default WebsitesList;
