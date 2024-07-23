import { Dialog } from "primereact/dialog";
import Button from "../common/form/Button";
import FormStyle from "../common/form/FormStyle";
import styled from "styled-components";
import articleService from "../../core/services/article.service";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  ArticlesSummarySelector,
  articlesAtom,
} from "../../state/articlesState";
import { useParams } from "react-router";

interface Props {
  onHide: () => void;
  onSubmit: () => void;
  articleId: string;
}

const StyledButton = styled(Button)`
  width: fit-content;
`;

const DeleteArticleModal: React.FC<Props> = ({
  onHide,
  articleId,
  onSubmit,
}) => {
  const { websiteId } = useParams();
  const [articles, setArticles] = useRecoilState(
    articlesAtom(websiteId as string)
  );
  const onSubmitInternal = async () => {
    await articleService.deleteArticle(articleId);
    setArticles(articles?.filter((a) => a.id !== articleId));
    onSubmit();
  };

  return (
    <Dialog
      modal
      visible
      header="Delete Blog Post"
      onHide={onHide}
      footer={
        <StyledButton primary onClick={onSubmitInternal}>
          Delete Post
        </StyledButton>
      }
    >
      <p>Are you sure you wish to delete this blog post?</p>
      <small>
        Deleting this post will only delete it from your Ghostwrite account and
        won't affect your CMS.
      </small>
    </Dialog>
  );
};

export default DeleteArticleModal;
