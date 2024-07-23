import { Divider } from "primereact/divider";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { validateUserAccess } from "../../middleware/validateUserAccess";
import { userState } from "../../state/userState";
import MenuItem from "../menu/MenuItem";
import { MenuItemProps } from "../menu/types/MenuItemProps";
import { useCallback } from "react";
import useNavigator from "../../hooks/useNavigator";

interface Props {
  items: MenuItemProps[];
  prefix?: string;
  isSubMenu?: boolean;
}

const Wrapper = styled.div<{ isSubMenu?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${(props) => (props.isSubMenu ? "1.2rem" : "10px")};
  background: white;
  z-index: 5;
`;

const Title = styled.div`
  font-size: 16px;
  letter-spacing: -0.03rem;
  font-weight: 700;
`;

const TabsNav: React.FC<Props> = ({ items, prefix, isSubMenu }) => {
  const navigate = useNavigator();
  const { pathname } = useLocation();
  const user = useRecoilValue(userState)!!;
  const routePrefix = prefix || "";

  const isRouteActive = useCallback(
    (route: string, parentRoute?: string) => {
      if (parentRoute) {
        return pathname.startsWith(routePrefix + parentRoute);
      }
      return (
        pathname.endsWith(routePrefix + route) ||
        pathname.endsWith(routePrefix + route + "/")
      );
    },
    [pathname, routePrefix]
  );

  return (
    <Wrapper isSubMenu={isSubMenu}>
      {items
        .filter((item) => validateUserAccess(user.role, item.role))
        .map((menuItem) =>
          menuItem.isTitle ? (
            <Title>{menuItem.displayName}</Title>
          ) : (
            <MenuItem
              isSubMenuItem={isSubMenu}
              key={menuItem.route}
              onClick={() => navigate(routePrefix + menuItem.route, true)}
              isActive={isRouteActive(menuItem.route, menuItem.parentRoute)}
              className=""
              isBold={menuItem.bold}
            >
              <>
                {menuItem.icon}
                <span className="">{menuItem.displayName}</span>
              </>
            </MenuItem>
          )
        )}
    </Wrapper>
  );
};

export default TabsNav;
