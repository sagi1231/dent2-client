import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../../assets/Icons/PlusBorder.svg";
import AttachmentsModal from "./AttachmentsModal";
import { useState } from "react";
import { FieldValues, Path, useController } from "react-hook-form";

const UploadImage = styled.div<{ backgroundImage: string }>`
  height: 140px;
  width: 170px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed var(--border-color);
  flex-direction: column;
  transition-duration: 0.05s;
  cursor: pointer;
  position: relative;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
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

function AttachmentInput<FormDataType extends FieldValues>({
  name,
}: {
  name: Path<FormDataType>;
}) {
  const [showAttachmentsModal, setShowAttachmentsModal] = useState(false);
  const field = useController({
    name,
  });

  return (
    <div>
      <UploadImage
        backgroundImage={field.field.value}
        onClick={() => setShowAttachmentsModal(true)}
      >
        {!field.field.value && (
          <>
            <AddIcon />
            <span>הוסף תמונה</span>
          </>
        )}
      </UploadImage>
      {showAttachmentsModal && (
        <AttachmentsModal
          onSelectImage={(img) => {
            field.field.onChange(img);
            setShowAttachmentsModal(false);
          }}
          onHide={() => setShowAttachmentsModal(false)}
        />
      )}
    </div>
  );
}

export default AttachmentInput;
