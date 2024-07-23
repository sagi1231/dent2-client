import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { formatUserName } from "../../../common/utils/formatUserName";
import { formatWebsiteUrl } from "../../../common/utils/formatWebsiteUrl";
import { articleState } from "../../../state/articleState";
import { websiteState } from "../../../state/websitesState";
import Link from "../../common/Link";

interface BreadCrumbItem {
  displayName: string;
  value?: string;
  onClick?: () => void;
}

const BreadcrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const SelectedItem = styled.span`
  font-weight: 600;
  user-select: none;
  font-size: 0.75rem;
  color: var(--main-text-lightcolor, #0a2540);
`;

const LinkStyled = styled(Link)`
  color: var(--main-text-lightcolor, #9aa8b6);
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 114%; /* 0.855rem */
`;

const ArrowForwardIosIconStyled = styled(ArrowForwardIosIcon)`
  color: #272727 !important;
  margin-inline: 5px;
  font-size: 10px !important;
`;

const BreadCrumbs: React.FC = () => {
  const location = useLocation();
  const [shouldDisplayAllItems, setShouldDisplayAllItems] = useState(false);
  // Getting potential entities from dynamic routes
  const { websiteId, articleId } = useParams();
  const website = useRecoilValue(websiteState(websiteId as string));
  const article = useRecoilValue(articleState(articleId as string));

  const items: BreadCrumbItem[] = useMemo(() => {
    let initialPath = "";
    return location.pathname
      .split("/")
      .filter((i) => i !== "/" && i)
      .map((item) => {
        item = item.replaceAll("/", "");
        if (item === websiteId && website)
          return {
            displayName: website.domain,
            value: item,
          };
        else if (item === articleId && article)
          return {
            displayName: article.title.replaceAll(" ", "-"),
            value: item,
          };
        else
          return {
            displayName: formatUserName(item),
            value: item,
          };
      })
      .map((item) => {
        initialPath += item.value + "/";
        return {
          ...item,
          value: "/" + initialPath,
        };
      });
  }, [location.pathname, website, websiteId]);

  const filteredItems: BreadCrumbItem[] = useMemo(() => {
    if (items.length > 3 && !shouldDisplayAllItems) {
      return [
        {
          displayName: "...",
          onClick: () => setShouldDisplayAllItems(true),
        },
        ...items.slice(items.length - 3, items.length - 1),
      ];
    } else return items;
  }, [items, shouldDisplayAllItems]);

  useEffect(() => setShouldDisplayAllItems(false), [items]);

  return (
    <BreadcrumbWrapper>
      {filteredItems.slice(0, items.length - 1).map((item) => (
        <>
          <LinkStyled onClick={item.onClick} key={item.value} path={item.value}>
            {item.displayName}
          </LinkStyled>
          <ArrowForwardIosIconStyled fontSize="inherit" />
        </>
      ))}
      <SelectedItem>{items[items.length - 1].displayName}</SelectedItem>
    </BreadcrumbWrapper>
  );
};

export default BreadCrumbs;
