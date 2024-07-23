import { useRecoilRefresher_UNSTABLE } from "recoil";
import styled from "styled-components";
import Link from "../../common/Link";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/PreviewOutlined";
import { ArticleSummary } from "../../../core/entities/articleSummary";
import ProgressiveImage from "react-progressive-graceful-image";
import { useNavigate, useParams } from "react-router";
import { useMemo, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { ReactComponent as ActionIcon } from "../../../assets/Icons/ThreeDots.svg";
import { ReactComponent as TimeIcon } from "../../../assets/Icons/TimeLeft.svg";
import { ReactComponent as ViewsIcon } from "../../../assets/Icons/Views.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/Icons/Calendar.svg";
import { ArticleStatus } from "../../../core/types/articleStatus";
import { Theme } from "../../../core/theme/theme";
import PublishArticleModal from "../../modals/PublishArticleModal";
import PublishIcon from "@mui/icons-material/Publish";
import { articlesAtom } from "../../../state/articlesState";
import { ArticleStatusType } from "../../../core/types/articleStatusType";
import DeleteArticleModal from "../../modals/DeleteArticleModal";
import Badge from "../../common/Badge";
import useNavigator from "../../../hooks/useNavigator";

interface Props {
  articleSummary: ArticleSummary;
  isLastArticle?: boolean;
  isVertical?: boolean;
  highlightTitleTerm?: string;
}

const BoxImage = styled.img<Props>`
  box-sizing: content-box;
  height: 130px;
  width: 160px;
  object-fit: cover;
  border-radius: 6px;
  transition-duration: 0.25s;
`;

const BoxDesc = styled.div<Props>`
  margin-top: 0px;
  display: flex !important;
  padding-right: 15px;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ArticleTitle = styled.span<Props>`
  font-size: 16px;
  line-break: auto;
  font-weight: 600;
  color: black;
`;

const ArticleInformationWrapper = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  flex-wrap: wrap;
`;

const InformationItem = styled.span<{ $purple?: boolean }>`
  color: ${(props) => (props.$purple ? "#741FFF" : "black")};
  font-size: 12px;

  display: flex;
  align-items: center;
  svg {
    font-size: 14px;
    margin-left: 5px;
  }
`;

const ArticleKeywordsWrapper = styled.div`
  display: flex;
  flex-direction: row;
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
  margin-left: 5px;
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
  left: 20px;
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
  height: 160px;
  background: white;
  padding: 15px;
  display: flex;
  flex-direction: row;

  &:hover {
    border-color: var(--title-color);
  }
  ${IconButton} {
    color: #741fff;
  }
`;

const ArticleCard: React.FC<Props> = (props) => {
  const { websiteId } = useParams();
  const [showPublishArticleModal, setShowPublishArticleModal] = useState(false);
  const [showDeleteArticleModal, setShowDeleteArticleModal] = useState(false);
  const optionsMenu = useRef<Menu>(null);
  const navigate = useNavigator();
  const optionItems = useMemo(() => {
    const options: any = [
      {
        label: " תצוגה מקדימה",
        icon: "pi pi-fw pi-eye",
        command: () => {
          navigate(`/articles/${props.articleSummary.id}`);
        },
      },
      {
        label: " עריכה",
        icon: "pi pi-fw pi-file-edit",
        command: () => {
          navigate(`/articles/${props.articleSummary.id}/edit`);
        },
      },
      {
        label: " מחק",
        icon: "pi pi-fw pi-trash",
        command: () => setShowDeleteArticleModal(true),
      },
    ];

    if (props.articleSummary.status === ArticleStatusType.PUBLISHED) {
      return [
        {
          label: "Show on Website",
          icon: "pi pi-fw pi-tablet",
          command: () => {
            document.location.href = props.articleSummary.externalLink;
          },
        },
        ...options,
      ];
    } else {
      return [
        {
          label: " פרסם",
          icon: "pi pi-fw pi-cloud-upload",
          command: () => {
            return setShowPublishArticleModal(true);
          },
        },
        ...options,
      ];
    }
  }, [
    navigate,
    props.articleSummary.externalLink,
    props.articleSummary.id,
    props.articleSummary.status,
    websiteId,
  ]);

  const title = useMemo(
    () =>
      props.highlightTitleTerm
        ? props.articleSummary.title.replace(
            new RegExp(props.highlightTitleTerm, "gi"),
            (match) =>
              `<span style='background-color:${Theme.colors.purpleOpacity};'>${match}</span>`
          )
        : props.articleSummary.title,
    [props.articleSummary.title, props.highlightTitleTerm]
  );

  const titleHtml = useMemo(
    () => ({
      __html: title,
    }),
    [title]
  );

  return (
    <div key={props.articleSummary.id} className="col-12 relative">
      <CardWrapper
        {...props}
        className="articlewrapper"
        path={`/articles/${props.articleSummary.id}`}
      >
        <ProgressiveImage
          src={props.articleSummary.imageSrc}
          placeholder="/demoimg.png"
        >
          {(src) => <BoxImage {...props} src={src} />}
        </ProgressiveImage>

        <BoxDesc {...props} className="">
          <div className="flex flex-column">
            <div className="flex mb-2">
              <Badge
                bgColor={
                  props.articleSummary.status === ArticleStatusType.PENDING
                    ? "yellowOpacity"
                    : "purple"
                }
                textColor={
                  props.articleSummary.status === ArticleStatusType.PENDING
                    ? "title"
                    : "bg"
                }
              >
                {props.articleSummary.status}
              </Badge>
            </div>

            <ArticleTitle
              {...props}
              dangerouslySetInnerHTML={titleHtml}
            ></ArticleTitle>
            <ArticleKeywordsWrapper>
              {props.articleSummary.tags.map((keyword) => (
                <KeywordsBadge>#{keyword.toLowerCase()}</KeywordsBadge>
              ))}
            </ArticleKeywordsWrapper>
            <InformationItem className={props.isLastArticle ? "hidden" : ""}>
              <IconSizeWrapper className="mt-4"></IconSizeWrapper>
              {new Date(props.articleSummary.createdAt).toLocaleDateString(
                "he-IL",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              )}
            </InformationItem>
          </div>
          <ArticleInformationWrapper>
            <InformationItem>
              <IconSizeWrapper>
                <ViewsIcon />
              </IconSizeWrapper>
              {props.articleSummary.views} צפיות
            </InformationItem>
            <InformationItem>
              <IconSizeWrapper>
                <TimeIcon />
              </IconSizeWrapper>
              {props.articleSummary.metadata.readingTime} דקות
            </InformationItem>
          </ArticleInformationWrapper>
        </BoxDesc>

        {/* <Link differentTab path={props.articleSummary.externalLink}>
            <PreviewButton />
          </Link>
          <IconButton /> */}
      </CardWrapper>
      <IconButton onClick={(event) => optionsMenu.current?.toggle(event)}>
        <IconSizeWrapper>
          <ActionIcon />
        </IconSizeWrapper>
        <Menu
          model={optionItems}
          popup
          ref={optionsMenu}
          aria-controls="popup_menu_right"
        />
      </IconButton>
      {showPublishArticleModal && (
        <PublishArticleModal
          onSubmit={() => setShowPublishArticleModal(false)}
          onHide={() => setShowPublishArticleModal(false)}
          articleSummary={{
            ...props.articleSummary,
            excerpt: props.articleSummary.metadata.metatags.description,
          }}
        />
      )}

      {showDeleteArticleModal && (
        <DeleteArticleModal
          articleId={props.articleSummary.id}
          onHide={() => setShowDeleteArticleModal(false)}
          onSubmit={() => setShowDeleteArticleModal(false)}
        />
      )}
    </div>
  );
};

export default ArticleCard;
