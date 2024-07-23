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
import { useNavigate, useParams } from "react-router";
import { websiteService } from "../../core/services/website.service";
import { websitesStateSelector } from "../../state/websitesState";

interface Props {
  onHide: () => void;
}

const StyledButton = styled(Button)`
  width: fit-content;
`;

const DeleteWebsiteModal: React.FC<Props> = ({ onHide }) => {
  const { websiteId } = useParams();
  const [websites, setWebsites] = useRecoilState(websitesStateSelector);
  const navigate = useNavigate();

  const onSubmitInternal = async () => {
    if (websiteId) {
      await websiteService.deleteWebsiteById(websiteId as string);
    }

    setWebsites(websites.filter((w) => w.id !== websiteId));
    navigate("/");
  };

  return (
    <Dialog
      modal
      visible
      header="Delete Business"
      onHide={onHide}
      footer={
        <StyledButton primary onClick={onSubmitInternal}>
          מחק עסק{" "}
        </StyledButton>
      }
    >
      <p>האם אתה בטוח שברצונך למחוק את העסק הזה?</p>
      <small>
        מחיקת העסק הזה תמחק את כל הפוסטים שלו בבלוג שלך החשבון של Neword.
      </small>
    </Dialog>
  );
};

export default DeleteWebsiteModal;
