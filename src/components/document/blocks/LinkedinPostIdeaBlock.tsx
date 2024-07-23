import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useFormContext, Controller } from "react-hook-form";
import styled from "styled-components";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { websiteState } from "../../../state/websitesState";
import { DocumentEntity, DocumentEntityType } from "neword-core";
import { ReactComponent as Neword } from "../../../assets/Icons/BlueIcon.svg";
import { ReactComponent as LinkedInLogo } from "../../../assets/Icons/linkedin/LinkedInLogo.svg";
import { BlockProps } from "./types/dictionaryProps";
import { RefProps } from "./types/refProps";
import EditableTextArea from "../components/EditableTextArea";

const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AcountText = styled.div`
  font-weight: 700;
  font-size: 12.21px;
  display: flex;
  flex-direction: row-reverse;
`;

const ContentWrapper = styled.div`
  font-size: 12.21px;
  display: flex;
  border-top: 1px solid var(--Input-BorderColor, #e6e6e6);
`;

const LeftTopMenu = styled.div`
  display: flex;
  align-items: center;
`;

const EditableInput = styled.textarea<{ isEditing: boolean }>`
  font-size: 12.21px;
  border: ${({ isEditing }) =>
    isEditing ? "1px solid var(--Input-BorderColor, #e6e6e6)" : "none"};
  background: transparent;
  outline: none;
  width: 100%;
  height: auto;
  font-family: inherit;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const LinkedinPostIdeaBlock = forwardRef<RefProps, BlockProps>(
  ({ isEditing, blockIndex, handleBlur }, ref) => {
    const { websiteId } = useParams();
    const website = useRecoilValue(websiteState(websiteId as string));
    const { getValues } =
      useFormContext<DocumentEntity<DocumentEntityType.LINKEDIN_POST_IDEA>>();

    useImperativeHandle(ref, () => ({
      onCopyCustom: () => {
        const output = getValues(`output.${blockIndex}`);
        return output.postIdea;
      },
    }));

    return (
      <Wrapper className="col-4">
        <TopSection>
          <LinkedInLogo />
          <LeftTopMenu>
            <AcountText className="ml-1">{website?.name}</AcountText>
            <Neword />
          </LeftTopMenu>
        </TopSection>

        <ContentWrapper className="mt-3 pt-3">
          <EditableTextArea<DocumentEntityType.LINKEDIN_POST_IDEA>
            fieldName={`output.${blockIndex}.postIdea`}
            handleBlur={handleBlur}
            blockIndex={blockIndex}
            isEditing={isEditing}
          />
        </ContentWrapper>
      </Wrapper>
    );
  }
);

export default LinkedinPostIdeaBlock;
