import { useMemo } from "react";
import { useLocation } from "react-router";
import { useRecoilValue } from "recoil";
import { getPreviousPath } from "../../common/utils/getPreviousPath";
import { validateUserAccess } from "../../middleware/validateUserAccess";
import { userState } from "../../state/userState";
import Link from "../common/Link";
import MenuItem from "./MenuItem";
import { MenuItemProps } from "./types/MenuItemProps";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styled from "styled-components";
import useNavigator from "../../hooks/useNavigator";
interface Props {
  menuItems: MenuItemProps[];
  prefix?: string;
}

const SideMenu: React.FC<Props> = ({ menuItems, prefix }) => {
  const navigate = useNavigator();
  const { pathname } = useLocation();
  const user = useRecoilValue(userState)!!;
  const routePrefix = prefix || "";
  const previousPath = useMemo(
    () => getPreviousPath(routePrefix),
    [routePrefix]
  );

  const GoBackStyle = styled.div`
    svg {
      font-size: 10px;
    }
    span {
      font-size: 12px;
    }
    margin-left: 5px;
    margin-top: 10px;
    margin-bottom: 20px;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
  `;
  return (
    <div className="menu-wrapper p-0">
      <Link path={previousPath}>
        <GoBackStyle>
          <ArrowBackIosIcon />
          <span>back</span>
        </GoBackStyle>
      </Link>
      {menuItems
        .filter((item) => validateUserAccess(user.role, item.role))
        .map((menuItem) => (
          <MenuItem
            key={menuItem.route}
            onClick={() => navigate(routePrefix + menuItem.route)}
            isActive={
              pathname.endsWith(routePrefix + menuItem.route) ||
              pathname.endsWith(routePrefix + menuItem.route + "/")
            }
            className="flex justify-content-start align-items-center"
            isBold={menuItem.bold}
          >
            <>
              {menuItem.icon}
              <span className="pl-2">{menuItem.displayName}</span>
            </>
          </MenuItem>
        ))}
    </div>
  );
};

export default SideMenu;
