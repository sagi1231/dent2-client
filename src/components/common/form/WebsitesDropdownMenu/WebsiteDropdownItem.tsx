import styled from "styled-components";
import { ReactComponent as SettingsIcon } from "../../../../assets/Icons/Settings.svg";
import Link from "../../Link";
import { useLocation, useNavigate, useParams } from "react-router";
import { useCallback, useMemo } from "react";

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
  isSelected?: boolean;
  websiteId: string;
}

const WebsiteText = styled.div<{ isSelected?: boolean }>`
  font-weight: ${({ isSelected }) => (isSelected ? 600 : 400)};
  color: var(--title-color);
  font-size: 14px;
  letter-spacing: -0.5px;
`;

const IconWrapper = styled.div`
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translate(-50%, -50%);
  svg {
    width: 15px;
    height: 15px;
  }
  cursor: pointer;
  transition-duration: 0.2s;
  border-radius: 6px;
  border: solid 1px var(--border-color);
  &:hover {
    border-color: var(--title-color);
  }
  z-index: 10;
`;

const ClickableBlock = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 300px;
  padding: 16px;
  position: relative;
`;

const Wrapper = styled.div`
  border-bottom: solid 1px var(--border-color);

  position: relative;
  &:hover ${WebsiteText} {
    text-decoration: underline;
  }

  &:hover ${IconWrapper} {
    opacity: 1;
  }
`;

const SmallText = styled.div`
  color: var(--text-color);
  margin-bottom: 5px;
  font-size: 10px;
`;

const Square = styled.span`
  width: 7px;
  height: 7px;

  border-radius: 2px;
`;

const WebsiteDropdownItem: React.FC<Props> = (props) => {
  const location = useLocation();
  const { websiteId } = useParams();

  const navigate = useNavigate();

  const newPath = useMemo(() => {
    if (websiteId) {
      return location.pathname.replace(websiteId, props.websiteId);
    } else return `/websites/${props.websiteId}`;
  }, [location.pathname, props.websiteId, websiteId]);

  const onClickWebsite = useCallback(() => {
    localStorage.setItem("websiteId", props.websiteId);
    navigate(newPath);
  }, [newPath, props.websiteId]);

  return (
    <>
      <Wrapper>
        <ClickableBlock onClick={onClickWebsite}>
          <div className="flex align-items-center">
            <Square className="square-colored ml-3" />
            <WebsiteText isSelected={props.isSelected}>
              {props.children}
            </WebsiteText>
          </div>
        </ClickableBlock>

        <IconWrapper
          onClick={() => navigate(`/websites/${props.websiteId}/business-info`)}
        >
          <SettingsIcon />
        </IconWrapper>
      </Wrapper>
    </>
  );
};

export default WebsiteDropdownItem;
