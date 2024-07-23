import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useMemo, useRef } from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  websiteState,
  websitesStateSelector,
} from "../../../../state/websitesState";
import WebsiteDropdownItem from "./WebsiteDropdownItem";
import { ReactComponent as PlusIcon } from "../../../../assets/Icons/PlusBorder.svg";
import Link from "../../Link";
import GWButton from "../../form/Button";
import e from "express";

const IconStyle = styled.i`
  font-size: 12px;
  transition-duration: 0.1s;
  padding-right: 8px;
`;

const IconWrapper = styled.div`
  width: 14px;
  height: 14px;
  svg {
    width: 14px;
    height: 14px;
  }
`;
const ButtonStyled = styled(Button)`
  border-radius: none !important;
  font-size: 14px;
  letter-spacing: -0.0225rem;
  font-weight: 500 !important;
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

const AddProject = styled(Link)`
  padding: 10px 1rem;
  display: flex;
  color: var(--primary-purple);
  align-items: center;
  gap: 10px;
  min-width: 300px;
  svg {
    fill: var(--primary-purple);
  }
  span {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.4px;
  }
`;

const MenuStyled = styled(Menu)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & li:nth-child(4n-3) .square-colored {
    background: #a960ee;
  }
  & li:nth-child(4n-2) .square-colored {
    background: #f92b75;
  }
  & li:nth-child(4n-1) .square-colored {
    background: #ffcb57;
  }
  & li:nth-child(4n) .square-colored {
    background: #90e0ff;
  }
`;

const WebsiteDropdownMenu: React.FC = () => {
  const websitesSelector = useRecoilValue(websitesStateSelector);
  const { websiteId } = useParams();

  const selectedWebsite = useRecoilValue(websiteState(websiteId as string));

  const menuWebsites = useRef<Menu>(null);

  const websites = useMemo(() => {
    const websitesTemplates = websitesSelector.map((website) => ({
      template: () => {
        return (
          <WebsiteDropdownItem
            isSelected={websiteId === website.id}
            websiteId={website.id}
          >
            {website.name || website.domain}
          </WebsiteDropdownItem>
        );
      },
    }));

    websitesTemplates.push({
      template: () => {
        return (
          <AddProject path="/websites/new" global>
            <GWButton
              icon={<PlusIcon />}
              textColor="purple"
              className="pl-0"
              color=""
              arrowPlacement="right"
            >
              הוסף עסק חדש{" "}
            </GWButton>
          </AddProject>
        );
      },
    });

    return websitesTemplates;
  }, [websiteId, websitesSelector]);

  return (
    <div className="flex align-items-center">
      <MenuStyled
        model={websites}
        popup
        ref={menuWebsites}
        id="popup_websites"
      />

      <ButtonStyled
        iconPos="right"
        onClick={(event) => menuWebsites.current?.toggle(event)}
        aria-controls="popup_websites"
        aria-haspopup
      >
        {selectedWebsite
          ? selectedWebsite.name || selectedWebsite.domain
          : "Choose Business"}
        <IconStyle className="pi pi-angle-down"></IconStyle>
      </ButtonStyled>
    </div>
  );
};

export default WebsiteDropdownMenu;
