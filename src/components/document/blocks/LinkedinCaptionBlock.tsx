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
import { ReactComponent as Neword } from "../../../assets/Icons/Neword.svg";
import { ReactComponent as LinkedInLogo } from "../../../assets/Icons/linkedin/LinkedInLogo.svg";
import { ReactComponent as LinkedInRepost } from "../../../assets/Icons/linkedin/LinkedInRepost.svg";

import { ReactComponent as LinkedInComment } from "../../../assets/Icons/linkedin/LinkedInComment.svg"; // Add this
import { ReactComponent as LinkedInShare } from "../../../assets/Icons/linkedin/LinkedInShare.svg"; // Add this
import LinkedInPreview from "../../../assets/images/LinkedInPreview.png";
import { ReactComponent as LinkedInLike } from "../../../assets/Icons/linkedin/LinkedInLike.svg";
import { BlockProps } from "./types/dictionaryProps";
import { RefProps } from "./types/refProps";
import EditableTextArea from "../components/EditableTextArea";

const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
  background: white;
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 10px;
  justify-content: space-between;
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
`;

const LeftTopMenu = styled.div`
  display: flex;
  align-items: center;
`;

const LinkedInPreviewWrapper = styled.img`
  border-radius: 19.576px;
  margin-top: 10px;
  width: 100%;
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

const LinkedInCaptionBlock = forwardRef<RefProps, BlockProps>(
  ({ isEditing, blockIndex, handleBlur }, ref) => {
    const { websiteId } = useParams();
    const website = useRecoilValue(websiteState(websiteId as string));
    const { getValues } =
      useFormContext<
        DocumentEntity<DocumentEntityType.LINKEDIN_POST_CAPTION>
      >();

    const imageUrl = getValues("inputParams.imageUrl") ?? LinkedInPreview;

    useImperativeHandle(ref, () => ({
      onCopyCustom: () => {
        const output = getValues(`output.${blockIndex}`);
        return output.postCaption;
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

        <ContentWrapper className="mt-1">
          <EditableTextArea<DocumentEntityType.LINKEDIN_POST_CAPTION>
            fieldName={`output.${blockIndex}.postCaption`}
            handleBlur={handleBlur}
            blockIndex={blockIndex}
            isEditing={isEditing}
          />
        </ContentWrapper>
        <LinkedInPreviewWrapper src={imageUrl} />
        <IconsWrapper>
          <LinkedInShare />
          <LinkedInRepost />
          <LinkedInComment />
          <LinkedInLike />
          <Neword />
        </IconsWrapper>
      </Wrapper>
    );
  }
);

export default LinkedInCaptionBlock;
