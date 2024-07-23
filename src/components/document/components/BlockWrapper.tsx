import React, {
  RefAttributes,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { ReactComponent as InstagramEdit } from "../../../assets/Icons/InstagramEdit.svg";
import { ReactComponent as SendIcon } from "../../../assets/Icons/Send.svg";
import { ReactComponent as CopyIcon } from "../../../assets/Icons/Copy.svg";
import { ReactComponent as DeletIcon } from "../../../assets/Icons/InstagramDelet.svg";
import Button from "../../common/form/Button";
import { documentState } from "../../../state/documentState";
import { RefProps } from "../blocks/types/refProps";
import documentsDictionary from "../documentsDictionary";
import Card from "../../common/Card";

const Wrapper = styled(Card)`
  padding: 0;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--Input-BorderColor, #e6e6e6);
  padding: 10px;
`;

const IconButton = styled.button`
  cursor: pointer;

  background: white;
  color: white;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  justify-content: center;
  height: 45px;
  width: 45px;
  svg {
    fill: white;
    width: 20px;
    height: 20px;
  }
  &:hover {
    border: 1px solid var(--title-color, #e6e6e6);
  }
`;

export const BlockWrapper: React.FC<{
  index: number;
  onDelet: (index: number) => void;
}> = ({ index, onDelet }) => {
  const { documentId } = useParams<{
    documentId: string;
  }>();

  const document = useRecoilValue(documentState(documentId as string));

  const childRef = useRef<RefProps | null>(null);

  const [editState, setEditState] = useState<boolean>(false);

  const BlockComponent = documentsDictionary[document.type].block;

  const onEdit = useCallback(() => {
    setEditState((prevState) => !prevState);
  }, [editState]);

  const onCopy = (copyText: string) => {
    navigator.clipboard.writeText(copyText);
  };

  const handleBlur = (blockIndex: number) => {
    setEditState(false);
  };

  return (
    <Wrapper>
      <BlockComponent
        isEditing={!!editState}
        handleBlur={handleBlur}
        blockIndex={index}
        ref={childRef}
      />
      <ButtonsWrapper>
        <Button disabled bgColor="purple" primary icon={<SendIcon />}>
          פרסום פוסט{" "}
        </Button>{" "}
        <div>
          <IconButton type="button" onClick={() => onDelet(index)}>
            <DeletIcon />
          </IconButton>
          <IconButton
            className="mr-1"
            type="button"
            onClick={() => {
              if (childRef.current?.onCopyCustom) {
                const text = childRef.current.onCopyCustom();
                onCopy(text);
              }
            }}
          >
            <CopyIcon />
          </IconButton>
          <IconButton onClick={() => onEdit()} className="mr-1" type="button">
            <InstagramEdit />
          </IconButton>
        </div>
      </ButtonsWrapper>
    </Wrapper>
  );
};
