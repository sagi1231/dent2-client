import styled from "styled-components";
import Link from "../../common/Link";
import { ArticleSummary } from "../../../core/entities/articleSummary";
import ProgressiveImage from "react-progressive-graceful-image";
import { ReactComponent as TimeIcon } from "../../../assets/Icons/TimeLeft.svg";
import { ReactComponent as ViewsIcon } from "../../../assets/Icons/Views.svg";
import { ArticleStatusType } from "../../../core/types/articleStatusType";
import Badge from "../../common/Badge";
import { useRecoilValue } from "recoil";
import { articleSummaryState } from "../../../state/articleState";
import React from "react";
import { Skeleton } from "primereact/skeleton";

interface Props {
  id: string;
}

const BoxImage = styled.img<Props>`
  box-sizing: content-box;
  height: 130px;
  width: 100%;
  object-fit: cover;
  border-radius: 6px;
  transition-duration: 0.25s;
`;

const BoxDesc = styled.div<Props>`
  margin-top: 0px;
  display: flex !important;
  flex-direction: column !important;

  height: 100%;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ArticleTitle = styled.span`
  font-size: 16px;
  line-break: auto;
  font-weight: 600;
`;

const ArticleInformationWrapper = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  flex-wrap: wrap;
`;

const InformationItem = styled.span<{ $purple?: boolean }>`
  color: ${(props) => (props.$purple ? "#741FFF" : "black")};
  font-size: 12px;

  display: flex;
  align-items: center;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ArticleKeywordsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const KeywordsBadge = styled.span`
  background: #f2f2f2;
  color: black;
  padding: 0.5em 1em;
  border-radius: 6px;
  background: rgb(242, 242, 242);
  color: black;
  padding: 0.5em 1em;

  font-size: 12px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const IconButton = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 20px;
  color: #828282;
  font-size: 22px !important;
  transition-duration: 0.2s;
  border-radius: 6px;
  border: solid 1px var(--border-color);
  &:hover {
    border-color: var(--title-color);
  }
`;

const IconSizeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    width: 14px;
    height: 14px;
  }
`;

const CardWrapper = styled(Link)<Props>`
  border: 1px solid var(--input-border-color, #e6e6e6);
  border-radius: 6px;
  position: relative;
  background: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  width: 300px;

  &:hover {
    border-color: var(--title-color);
  }
  ${IconButton} {
    color: #741fff;
  }
`;

const BadgeWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const SuspendedComponent: React.FC<Props> = (props) => {
  const articleSummary = useRecoilValue(articleSummaryState(props.id));

  return (
    <>
      <div className="relative">
        <ProgressiveImage
          src={articleSummary.imageSrc}
          placeholder="/demoimg.png"
        >
          {(src) => <BoxImage {...props} src={src} />}
        </ProgressiveImage>
        <BadgeWrapper>
          <Badge
            bgColor={
              articleSummary.status === ArticleStatusType.PENDING
                ? "yellowOpacity"
                : "purple"
            }
            textColor={
              articleSummary.status === ArticleStatusType.PENDING
                ? "title"
                : "bg"
            }
          >
            {articleSummary.status}
          </Badge>
        </BadgeWrapper>
      </div>

      <BoxDesc {...props}>
        <div className="flex flex-column">
          <div className="flex mt-2 mb-2"></div>

          <ArticleTitle>{articleSummary.title}</ArticleTitle>
          {/* <ArticleKeywordsWrapper>
              {props.articleSummary.tags.map((keyword) => (
                <KeywordsBadge>#{keyword.toLowerCase()}</KeywordsBadge>
              ))}
            </ArticleKeywordsWrapper> */}
          {/* <InformationItem>
              <IconSizeWrapper className="mt-4"></IconSizeWrapper>
              {new Date(props.articleSummary.createdAt).toDateString()}
            </InformationItem> */}
        </div>
        {/* <ArticleInformationWrapper>
            <InformationItem>
              <IconSizeWrapper>
                <ViewsIcon />
              </IconSizeWrapper>
              {props.articleSummary.views} Views
            </InformationItem>
            <InformationItem>
              <IconSizeWrapper>
                <TimeIcon />
              </IconSizeWrapper>
              {props.articleSummary.metadata.readingTime} Min
            </InformationItem>
          </ArticleInformationWrapper> */}
      </BoxDesc>

      {/* <Link differentTab path={props.articleSummary.externalLink}>
            <PreviewButton />
          </Link>
          <IconButton /> */}
    </>
  );
};

const ArticlePreviewTooltip: React.FC<Props> = (props) => {
  return (
    <div key={props.id} className="col-12 relative">
      <CardWrapper
        {...props}
        className="articlewrapper"
        path={`/articles/${props.id}`}
      >
        <React.Suspense
          fallback={
            <>
              <Skeleton height="130px"></Skeleton>
              <br />
              <Skeleton width="90%"></Skeleton>
              <Skeleton className="mt-2" width="40%"></Skeleton>
            </>
          }
        >
          <SuspendedComponent id={props.id} />
        </React.Suspense>
      </CardWrapper>
    </div>
  );
};

export default ArticlePreviewTooltip;
