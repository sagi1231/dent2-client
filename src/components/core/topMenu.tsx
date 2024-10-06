import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup"; //Optional for grouping
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { formatUserName } from "../../common/utils/formatUserName";
import { userState } from "../../state/userState";
import styled from "styled-components";
import React, { useMemo, useRef, useState } from "react";
//import { useRouter } from 'next/router';
import { Menu } from "primereact/menu";
import userService from "../../core/services/user.service";
import { useNavigate, useParams } from "react-router";
import GWButton from "../common/form/Button";
import Link from "../common/Link";
import { Button } from "primereact/button";

import { ReactComponent as GlobeIcon } from "../../assets/Icons/Globe.svg";
import { ReactComponent as TeamIcon } from "../../assets/Icons/Team.svg";
import { ReactComponent as DownloadIcon } from "../../assets/Icons/Download.svg";

import IconButton from "../common/IconButton";
import { Tooltip } from "primereact/tooltip";
import { Divider } from "primereact/divider";
import useNavigator from "../../hooks/useNavigator";
import authService from "../../core/services/auth.service";

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  flex-direction: row-reverse;
  align-items: center;
  background: white;
  border-radius: 0px;
  min-height: 75px;
  border-bottom: 1px solid #e2e8f0;
`;

const AvatarStyled = styled(Avatar)`
  background-color: var(--yellow);
`;

const IconStyle = styled.i`
  font-size: 12px;
  transition-duration: 0.1s;
  padding-right: 8px;
`;
const ButtonAvatarStyled = styled(Button)`
  font-size: 14px;
  padding: 0;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: black !important;

  &:hover {
    ${IconStyle} {
      margin-top: 7px !important;
    }
  }
`;

const EmailText = styled.span`
  font-size: 14px;
  letter-spacing: -0.3px;
`;

const RoleText = styled.span`
  margin-top: 2px;
  font-size: 10px;
  letter-spacing: -0.3px;
`;

const TopMenu: React.FC = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigator();
  const menuLeft = useRef<Menu>(null);
  const [upgradePackageModal, setUpgradePackageModal] = useState(false);

  let items = [
    {
      template: () => {
        return (
          <button
            onClick={(e) => navigate("/")}
            className="w-full p-link flex align-items-center p-3"
          >
            <div className="flex flex-column">
              <EmailText>{user?.pNumber}</EmailText>
              <RoleText>{user?.role}</RoleText>
            </div>
            <AvatarStyled
              label={user?.firstname.at(0)?.toLocaleUpperCase()}
              shape="circle"
              className="mr-2"
            />
          </button>
        );
      },
    },
    { separator: true },

    {
      label: "הגדרות משתמש",

      command: () => {
        navigate(`/overview/user-settings`);
      },
    },

    // {
    //   label: "Add Website",
    //   icon: "pi pi-fw pi-plus",
    //   command: () => {
    //     navigate("/websites/new");
    //   },
    // },
    {
      template: () => {
        return (
          <>
            <Divider className="m-0"></Divider>
          </>
        );
      },
    },
    {
      label: "התנתק",

      command: async () => {
        await authService.logout();
        document.location.href = "/login";
      },
    },
  ];

  return (
    <>
      <TopWrapper>
        <React.Suspense fallback={<></>}></React.Suspense>
        <div>
          <div className="flex align-items-center">
            {/* add top menu items here */}
            <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
            <ButtonAvatarStyled
              iconPos="right"
              onClick={(event) => menuLeft.current?.toggle(event)}
              aria-controls="popup_menu_left"
              aria-haspopup
            >
              <AvatarStyled
                label={user?.firstname.at(0)?.toLocaleUpperCase()}
                shape="circle"
              />
              <IconStyle className="pi pi-angle-down"></IconStyle>
            </ButtonAvatarStyled>
          </div>
        </div>
      </TopWrapper>

      {upgradePackageModal && <React.Suspense></React.Suspense>}
    </>
  );
};

export default TopMenu;
