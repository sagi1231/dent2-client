import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup"; //Optional for grouping
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { userState } from "../../../state/userState";
import styled from "styled-components";
import React, { useRef } from "react";
//import { useRouter } from 'next/router';
import { Menu } from "primereact/menu";
import userService from "../../../core/services/user.service";
import { Button } from "primereact/button";
import Announcement from "../../common/Announcement";
import { announcementState } from "../../../state/announcementState";
import LogoIcon from "../../../assets/Logo/LogoIcon.png";

import { Divider } from "primereact/divider";
import useNavigator from "../../../hooks/useNavigator";
import WebsiteDropdownMenu from "../../common/form/WebsitesDropdownMenu/WebsiteDropdownMenu";

interface Props {
  title?: string;
  showAvater?: boolean;
  showWebsitesDropdown?: boolean;
}

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
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

const BoxImage = styled.img`
  width: 35px;
  padding-left: 25px;
  margin-left: 25px;
  box-sizing: content-box;
  object-fit: contain;
  border-left: solid 1px var(--border-color);
  transition-duration: 0.25s;
`;

const SmallText = styled.div`
  font-size: 16px;
`;
const MinimalTopMenu: React.FC<Props> = (props) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigator();
  const menuLeft = useRef<Menu>(null);

  let items = [
    {
      template: () => {
        return (
          <button
            onClick={(e) => navigate("/")}
            className="w-full p-link flex align-items-center p-3"
          >
            <AvatarStyled
              label={user?.email.at(0)?.toLocaleUpperCase()}
              shape="circle"
              className="mr-2"
            />
            <div className="flex flex-column">
              <EmailText>{user?.email}</EmailText>
              <RoleText>{user?.role}</RoleText>
            </div>
          </button>
        );
      },
    },
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
      label: "Sign out",

      command: async () => {
        await userService.logout();
        document.location.href = "/login";
      },
    },
  ];

  const announcementStateValue = useRecoilValue(announcementState);

  return (
    <>
      <TopWrapper>
        <div className="flex justift-content-center align-items-center">
          <BoxImage src={LogoIcon} />
          {props.title && <SmallText>{props.title}</SmallText>}
          {props.showWebsitesDropdown && (
            <React.Suspense fallback={<></>}>
              <WebsiteDropdownMenu />
            </React.Suspense>
          )}
        </div>

        <div>
          {props.showAvater && (
            <div className="flex align-items-center">
              <Menu model={items} popup ref={menuLeft} id="popup_menu_right" />
              <ButtonAvatarStyled
                iconPos="right"
                onClick={(event) => menuLeft.current?.toggle(event)}
                aria-controls="popup_menu_right"
                aria-haspopup
              >
                <AvatarStyled
                  label={user?.email.at(0)?.toLocaleUpperCase()}
                  shape="circle"
                />
                <IconStyle className="pi pi-angle-down"></IconStyle>
              </ButtonAvatarStyled>
            </div>
          )}
        </div>
      </TopWrapper>
      {announcementStateValue && (
        <Announcement>
          <div className="flex align-items-center">
            {announcementStateValue}
          </div>
        </Announcement>
      )}
    </>
  );
};

export default MinimalTopMenu;
