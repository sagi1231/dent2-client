import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useFormContext, Controller } from "react-hook-form";
import styled from "styled-components";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { websiteState } from "../../../state/websitesState";
import { BlockOutputProps } from "./types/blockOutputProps";
import { DocumentEntity, DocumentEntityType } from "neword-core";
import { ReactComponent as Neword } from "../../../assets/Icons/Neword.svg";
import { ReactComponent as InstagramLogo } from "../../../assets/Icons/InstagramIcon.svg";
import InstagramPreview from "../../../assets/images/instagramPreview.png";
import { ReactComponent as InstagramLike } from "../../../assets/Icons/InstagramLike.svg";
import { BlockProps } from "./types/dictionaryProps";
import { RefProps } from "./types/refProps";
import EditableTextArea from "../components/EditableTextArea";

const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 10px;
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

const InstagramPreviewWrapper = styled.img`
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

const InstagramCaptionBlock = forwardRef<RefProps, BlockProps>(
  ({ isEditing, blockIndex, handleBlur }, ref) => {
    const { websiteId } = useParams();
    const website = useRecoilValue(websiteState(websiteId as string));

    const form =
      useFormContext<DocumentEntity<DocumentEntityType.INSTAGRAM_CAPTION>>();
    const imageUrl = form.getValues("inputParams.imageUrl") ?? InstagramPreview;

    useImperativeHandle(ref, () => ({
      onCopyCustom: () => {
        const values = form.getValues();
        return values.output[blockIndex].captionText || "";
      },
    }));

    return (
      <Wrapper className="col-4">
        <TopSection>
          <InstagramLogo />
          <LeftTopMenu>
            <AcountText className="ml-1">{website?.name}</AcountText>
            <Neword />
          </LeftTopMenu>
        </TopSection>
        <InstagramPreviewWrapper src={imageUrl} />
        <IconsWrapper>
          <InstagramLike />
        </IconsWrapper>
        <AcountText className="mt-3 flex row-revers">
          {website?.name}
        </AcountText>
        <ContentWrapper className="mt-1">
          <EditableTextArea<DocumentEntityType.INSTAGRAM_CAPTION>
            fieldName={`output.${blockIndex}.captionText`}
            handleBlur={handleBlur}
            isEditing={isEditing}
            blockIndex={blockIndex}
          />
        </ContentWrapper>
      </Wrapper>
    );
  }
);

export default InstagramCaptionBlock;
