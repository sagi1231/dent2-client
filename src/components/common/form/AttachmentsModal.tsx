import { Dialog } from "primereact/dialog";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../../assets/Icons/PlusBorder.svg";
import { useRef, useState } from "react";
import { useParams } from "react-router";
import { websiteService } from "../../../core/services/website.service";
import { useRecoilState, useRecoilValue } from "recoil";
import { attachmentsState } from "../../../state/attachmentsState";
import { websiteState } from "../../../state/websitesState";

const UploadImage = styled.div`
  height: 140px;
  width: 140px; /* Change width to 140px */
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed var(--border-color);
  flex-direction: column;
  transition-duration: 0.05s;
  cursor: pointer;
  position: relative;

  svg {
    width: 40px;
    height: 40px;
    fill: var(--border-color);
  }

  span {
    font-weight: bold;
    color: var(--border-color);
  }

  &:hover {
    border: 2px dashed var(--primary-color);
    svg {
      fill: var(--primary-color);
    }

    span {
      color: var(--primary-color);
    }
  }
`;

const BoxImage = styled.img`
  cursor: pointer;
  box-sizing: border-box; /* Change to border-box */
  height: 140px;
  width: 140px; /* Change width to 140px */
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid rgb(230, 230, 230);

  &:hover {
    border: 1px solid var(--primary-color);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px; /* Add margin for spacing */
`;

const Grid = styled.div`
  display: flex; /* Change to flex */
  flex-wrap: wrap; /* Allow wrapping of items */
  gap: 16px; /* Add gap between items */
  max-width: 600px;
  max-height: 400px;
  overflow-y: auto;
  justify-content: center;
`;

interface Props {
  onHide: () => void;
  onSelectImage: (imageUrl: string) => void;
}

const Title = styled.h1`
  color: #0a2540;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 2.5rem */
  letter-spacing: -0.075rem;
  width: auto;
  text-align: center;
`;

const SubTitle = styled.h2`
  color: #425466;
  text-align: center;
  font-weight: 300;
`;

const HiddenInput = styled.input`
  display: none;
`;

const AttachmentsModal: React.FC<Props> = ({ onHide, onSelectImage }) => {
  const { websiteId } = useParams();
  const website = useRecoilValue(websiteState(websiteId as string));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [existingAttachments, setAttachments] = useRecoilState(
    attachmentsState(websiteId as string)
  );
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const charArray = Array.from(uint8Array).map((byte) =>
        String.fromCharCode(byte)
      );
      const base64String = btoa(charArray.join(""));

      // Upload the file
      setLoading(true);

      try {
        const imageUrl = await websiteService.uploadAttachment(
          websiteId as string,
          file.name,
          base64String
        );
        setAttachments([imageUrl, ...existingAttachments]);
        console.log("File uploaded successfully");
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog
      header={
        <>
          <Title>התמונות של {website?.name}</Title>
          <SubTitle>בחר או העלה תמונה חדשה</SubTitle>
        </>
      }
      visible
      onHide={onHide}
      modal
    >
      <br />
      <Grid>
        {loading ? (
          <Wrapper>
            <UploadImage>
              <span>טוען...</span>
            </UploadImage>
          </Wrapper>
        ) : (
          <Wrapper>
            <UploadImage onClick={handleClick}>
              <AddIcon />
            </UploadImage>
            <HiddenInput
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Wrapper>
        )}

        {existingAttachments.map((image, index) => (
          <Wrapper onClick={() => onSelectImage(image)} key={index}>
            <BoxImage src={image} alt="attachment" />
          </Wrapper>
        ))}
      </Grid>
    </Dialog>
  );
};

export default AttachmentsModal;
