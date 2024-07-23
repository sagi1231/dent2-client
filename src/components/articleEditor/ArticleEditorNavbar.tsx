import styled from "styled-components";
import Link from "../common/Link";
import Button from "../common/form/Button";
import LogoIcon from "../../assets/Logo/LogoIcon.png";
import { Tooltip } from "primereact/tooltip";
import { ReactComponent as PulbishIcon } from "../../assets/Icons/Publish.svg";
import { ReactComponent as DeleteIcon } from "../../assets/Icons/Delete.svg";
import { ReactComponent as ViewIcon } from "../../assets/Icons/Views.svg";
import { ReactComponent as LoadingIcon } from "../../assets/Icons/Loading.svg";
import { ReactComponent as SaveIcon } from "../../assets/Icons/Save.svg";
import { ReactComponent as SyncIcon } from "../../assets/Icons/Sync.svg";

import { useCallback, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { useParams } from "react-router";
import PublishArticleModal from "../modals/PublishArticleModal";
import { useRecoilValue } from "recoil";
import { articleState } from "../../state/articleState";
import React from "react";
import { articleSavingTateState } from "../../state/articleSavingTateState";
import { publisherService } from "../../core/services/publisher.service";
import { toast } from "react-toastify";
import { ArticleStatusType } from "../../core/types/articleStatusType";
import AppConfig from "../../config/appConfig";
import DeleteArticleModal from "../modals/DeleteArticleModal";
import useNavigator from "../../hooks/useNavigator";

interface Props {
  preview?: boolean;
}

const OverWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  top: 0px;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e2e8f0;
  border-top: 1px solid #e2e8f0;
  background: white;
  height: 85px;
  z-index: 99;
`;

const Wrapper = styled.div`
  display: flex;
  height: 85px;
  padding-left: 25px;
  align-items: center;
`;

const BoxImage = styled.img`
  width: 35px;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: content-box;
  object-fit: contain;

  transition-duration: 0.25s;
`;

const Line = styled.div`
  width: 1px;
  height: 100%;
  background: #e2e8f0;
`;

const IconStyle = styled.i`
  transition-duration: 0.1s;
  padding-right: 8px;
  position: absolute;
  margin-top: 1px;
`;

const ArticleMenu = styled.div`
  padding: 20px 25px;
  gap: 25px;
  align-items: center;
  display: flex;
  height: 100%;

  .my-articles {
    color: var(--primary-purple);
  }

  span {
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    position: relative;

    &:hover {
      ${IconStyle} {
        margin-top: 3px;
      }
    }
  }
`;

const DeleteButton = styled(Button)`
  color: #e92b2b;
  font-weight: 600;

  width: 40px;
  height: 40px;
  background: var(--light-bg);
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: var(--light-bg);

    svg path {
      fill: var(--title-color);
    }
  }
  svg {
    margin-left: 0;
  }

  svg path {
    transition-duration: 0.2s;
    fill: #e92b2b;
  }
`;

const ViewButton = styled(Button)`
  font-weight: 600;

  width: 40px;
  height: 40px;
  background: var(--light-bg);
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: var(--light-bg);

    svg path {
      fill: var(--title-color);
    }
  }
  svg {
    margin-right: 0;
  }

  svg path {
    transition-duration: 0.2s;
  }
`;

const SavingNoticeWrapper = styled.div`
  margin-left: 20px;
  font-size: 14px;
  display: flex;
  flex-direction: center;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  svg {
    width: 15px;
    height: 15px;
  }

  .roti {
    display: inline-block;
    animation: rotateInfinitely 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes rotateInfinitely {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ArticleEditorNavbar: React.FC<Props> = ({ preview }) => {
  const menuLeft = useRef<Menu>(null);
  const shareMenu = useRef<Menu>(null);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [publishArticleModal, setPublishArticleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { websiteId, articleId } = useParams();
  const article = useRecoilValue(articleState(articleId as string));
  const navigate = useNavigator();
  const savingState = useRecoilValue(articleSavingTateState);

  const downloadPdf = useCallback(() => {
    document.location.href = `${AppConfig.serverUrl}/articles/${article?.id}/export/pdf`;
  }, [article?.id]);

  let items = [
    {
      label: "Export as PDF (.pdf)",
      icon: "pi pi-fw pi-file-pdf",
      command: downloadPdf,
    },

    // { separator: true },

    // {
    //   label: "Export as DOC (.docx)",
    //   icon: "pi pi-fw pi-file-word",
    //   command: async () => {},
    // },
  ];

  let shareMenuItems = [
    {
      label: "Copy",
      icon: "pi pi-fw pi-copy",
      command: () => navigator.clipboard.writeText(document.location.href),
    },
  ];

  const updateOnCms = useCallback(async () => {
    setIsLoading(true);
    try {
      await publisherService.updateArticleById(
        articleId as string,
        websiteId as string
      );

      toast(
        "Your post has been successfully updated within your content management system (CMS)",
        {
          type: "success",
        }
      );
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, [articleId, websiteId]);

  return (
    <OverWrapper>
      <Wrapper>
        <Link path="/" className="flex align-items-center" global>
          <BoxImage src={LogoIcon} />
        </Link>
        <Line />
        <ArticleMenu>
          <Tooltip target=".my-articles" />
          <Link
            className="my-articles"
            data-pr-tooltip="חזור לצפייה בכל המאמרים"
            data-pr-position="bottom"
            data-pr-at="center bottom+5"
            path={`/articles`}
          >
            <span>מאמרים שלי</span>
          </Link>
          <Menu model={items} popup ref={menuLeft} id="popup_menu" />
          <Line />
          <Menu model={shareMenuItems} popup ref={shareMenu} id="popup_menu" />
          <span
            className="pl-3"
            onClick={(event) => menuLeft.current?.toggle(event)}
            aria-controls="popup_menu"
            aria-haspopup
          >
            יצא <IconStyle className="pi pi-angle-down"></IconStyle>
          </span>
          <Line />
          <span
            className="pr-3"
            onClick={(event) => shareMenu.current?.toggle(event)}
            aria-controls="popup_menu"
            aria-haspopup
          >
            שתף<IconStyle className="pi pi-share-alt"></IconStyle>
          </span>
          <Line />
        </ArticleMenu>
      </Wrapper>
      <Wrapper>
        {!preview && (
          <SavingNoticeWrapper>
            {savingState ? (
              <>
                <LoadingIcon className="roti" /> שומר...
              </>
            ) : (
              <>
                <SaveIcon /> נשמר
              </>
            )}
          </SavingNoticeWrapper>
        )}

        <Tooltip target=".delete-post" />
        {!preview && (
          <div
            data-pl-tooltip="מחק מאמר"
            data-pl-position="bottom"
            data-pl-at="center bottom+5"
            className="delete-post ml-3"
          >
            <DeleteButton
              onClick={() => setDeletePostModal(true)}
              icon={<DeleteIcon />}
            ></DeleteButton>
          </div>
        )}

        <Tooltip target=".view-post" />
        {!preview && (
          <div
            data-pr-tooltip="תצוגה מקדימה של המאמר"
            data-pr-position="bottom"
            data-pr-at="center bottom+5"
            className="view-post ml-3"
          >
            <Link
              path={`/websites/${websiteId}/articles/${articleId}`}
              differentTab
            >
              <ViewButton icon={<ViewIcon />}></ViewButton>
            </Link>
          </div>
        )}
        {!preview ? (
          <div>
            {article?.status === ArticleStatusType.PUBLISHED ? (
              <Button
                data-pr-tooltip="לחץ כדי לעדכן את הפוסט שפורסם במערכת ניהול התוכן שלך (CMS)"
                data-pr-at="right bottom"
                data-pr-position="bottom"
                primary
                loading={isLoading}
                onClick={updateOnCms}
                icon={<SyncIcon />}
              >
                סנכרון עם CMS{" "}
              </Button>
            ) : (
              <Button
                onClick={() => setPublishArticleModal(true)}
                primary
                icon={<PulbishIcon />}
              >
                פרסם מאמר{" "}
              </Button>
            )}
          </div>
        ) : (
          <div>
            <Button
              onClick={() => navigate(`/articles/${article?.id}/edit`)}
              primary
            >
              ערוך
            </Button>
          </div>
        )}
        {}
      </Wrapper>

      {deletePostModal && (
        <DeleteArticleModal
          onSubmit={() => navigate(`/articles`)}
          onHide={() => setDeletePostModal(false)}
          articleId={articleId as string}
        />
      )}

      {publishArticleModal && (
        <PublishArticleModal
          onSubmit={() => setPublishArticleModal(false)}
          onHide={() => setPublishArticleModal(false)}
          articleSummary={{
            title: article?.title || "",
            id: article?.id || "",
            excerpt: article?.metadata.metatags.description || "",
          }}
        />
      )}
    </OverWrapper>
  );
};

export default React.memo(ArticleEditorNavbar);
