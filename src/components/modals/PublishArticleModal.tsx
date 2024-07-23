import { Dialog } from "primereact/dialog";
import { useCallback, useState } from "react";
import { useParams } from "react-router";
import InputStyle from "../common/form/InputStyle";
import Button from "../common/form/Button";
import styled from "styled-components";
import { publisherService } from "../../core/services/publisher.service";
import ModalHeader from "./ModalHeader";
import CardTitle from "../common/CardTitle";
import Card from "../common/Card";
import PageTitle from "../common/PageTitle";
import Badge from "../common/Badge";
import { Divider } from "primereact/divider";
import { InputSwitch } from "primereact/inputswitch";
import { BlockUI } from "primereact/blockui";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { publishIntegrationState } from "../../state/publishIntegrationState";
import { Tooltip } from "primereact/tooltip";
import Link from "../common/Link";
import { useController, useForm } from "react-hook-form";
import { PublishArticleRequest } from "../../core/services/requests/publish/publishArticleRequest";
import { articlesAtom } from "../../state/articlesState";
import { Article } from "../../core/entities/article";
import { Theme } from "../../core/theme/theme";
import { articleState } from "../../state/articleState";

interface Propse {
  onHide: () => void;
  onSubmit: () => void;
  articleSummary: {
    title: string;
    id: string;
    excerpt: string;
  };
}

const ButtonStyled = styled(Button)`
  float: right;
`;

const LinkStyled = styled(Link)`
  color: var(--primary-purple);
`;

const PublishArticleModal: React.FC<Propse> = ({
  onHide,
  articleSummary,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { websiteId } = useParams();
  const [publishedArticle, setPublishedArticle] = useState<Article>();
  const setRecoilArticle = useSetRecoilState(articleState(articleSummary.id));
  const [articles, setArticles] = useRecoilState(
    articlesAtom(websiteId as string)
  );
  const cmsIntegration = useRecoilValue(
    publishIntegrationState(websiteId as string)
  );

  const { control, handleSubmit, getValues } = useForm<PublishArticleRequest>({
    defaultValues: {
      publishAsDraft: cmsIntegration?.publishAsDraft,
    },
  });

  const { field } = useController({
    control,
    name: "publishAsDraft",
  });

  const onSubmitInternal = useCallback(async () => {
    setIsLoading(true);
    try {
      const publishedArticle = await publisherService.publishArticleById(
        {
          ...getValues(),
          articleId: articleSummary.id,
        },
        websiteId as string
      );
      setPublishedArticle(publishedArticle);
      setRecoilArticle(publishedArticle);
      setArticles(
        articles?.map((a) => {
          if (a.id === publishedArticle.id)
            return {
              ...a,
              status: publishedArticle.status,
              externalLink: publishedArticle.externalLink,
            };
          return a;
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [articleSummary.id, getValues, onSubmit, websiteId]);

  return (
    <Dialog
      header={
        <ModalHeader OnClose={onHide} logo right title={"Publish Blog Post"} />
      }
      closable={false}
      modal={false}
      visible
      position={"bottom-right"}
      style={{
        width: "28vw",
        height: "calc(100vh - 85px)",
        margin: "0",
        boxShadow: "none",
        borderLeft: "solid 1px var(--border-color)",
        borderRadius: "0px",
        maxHeight: "100%",
      }}
      onHide={onHide}
      draggable={false}
      resizable={false}
      footer={
        !publishedArticle &&
        (cmsIntegration ? (
          <ButtonStyled
            loading={isLoading}
            primary
            onClick={handleSubmit(onSubmitInternal)}
            arrowPlacement="right"
          >
            Publish Blog Post
          </ButtonStyled>
        ) : (
          <Link path={`/integrations`}>
            <ButtonStyled arrowPlacement="right">Connect a CMS</ButtonStyled>
          </Link>
        ))
      }
    >
      {publishedArticle ? (
        <>
          <PageTitle title="Your Post Is Live!" />

          <LinkStyled
            onClick={() =>
              (document.location.href = publishedArticle.externalLink)
            }
            className="ml-2"
          >
            Click here to view it on your CMS
          </LinkStyled>
        </>
      ) : (
        <>
          {!cmsIntegration && (
            <Tooltip
              target=".blockedui"
              mouseTrack
              mouseTrackLeft={20}
              position="left"
            />
          )}
          <div
            data-pr-tooltip="Connect a CMS integration first"
            className="blockedui"
          >
            <BlockUI blocked={!cmsIntegration}>
              {/* <CardTitle title="Are you sure that you want to publish the following article?" /> */}
              {/* <Card>
        <strong>{articleSummary.title}</strong>
      </Card> */}

              <Card>
                <div className="flex">
                  <Badge bgColor="purple">Quick Look</Badge>
                </div>
                <PageTitle title={articleSummary.title} />

                <PageTitle subtitle={articleSummary.excerpt} />
              </Card>

              <br />
              <Divider />
              <br />

              <InputStyle>
                <Card className="">
                  <div className="flex justify-content-between mb-3">
                    <div className="flex align-items-center">
                      <CardTitle title="Upload as draft" className="mb-0" />
                    </div>
                    <div>
                      <InputSwitch
                        checked={field.value}
                        onChange={field.onChange}
                        title="Sync with CMS"
                      />
                    </div>
                  </div>

                  <small className="block">
                    When the toggle is turned on, indicating "Upload as draft,"
                    the content will be uploaded as a <strong>draft</strong> to
                    your CMS.
                  </small>
                </Card>
              </InputStyle>
            </BlockUI>
          </div>
        </>
      )}
    </Dialog>
  );
};

export default PublishArticleModal;
