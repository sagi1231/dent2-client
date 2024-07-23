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
import { ReactComponent as FacebookLogo } from "../../../assets/Icons/facebook/FacebookLogo.svg"; // Add Facebook logo
import FacebookPreview from "../../../assets/images/facebookPreview.png"; // Add Facebook preview image
import { ReactComponent as FacebookLike } from "../../../assets/Icons/facebook/FacebookLike.svg"; // Add Facebook like icon
import { ReactComponent as FacebookComment } from "../../../assets/Icons/facebook/FacebookComment.svg"; // Add Facebook like icon
import { ReactComponent as FacebookShare } from "../../../assets/Icons/facebook/FacebookShare.svg"; // Add Facebook like icon
import { ReactComponent as FacebookLikeCount } from "../../../assets/Icons/facebook/FacebookLikeCount.svg"; // Add Facebook like icon

import { BlockProps } from "./types/dictionaryProps";
import { RefProps } from "./types/refProps";
import EditableTextArea from "../components/EditableTextArea";

const Wrapper = styled.div`
  padding: 20px;
  padding-bottom: 0;
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

const AccountText = styled.div`
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

const FacebookPreviewWrapper = styled.img`
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

const FacebookCaptionBlock = forwardRef<RefProps, BlockProps>(
  ({ isEditing, blockIndex, handleBlur }, ref) => {
    const { websiteId } = useParams();
    const website = useRecoilValue(websiteState(websiteId as string));

    const { getValues } =
      useFormContext<
        DocumentEntity<DocumentEntityType.FACEBOOK_POST_CAPTION>
      >();
    const imageUrl = getValues("inputParams.imageUrl") ?? FacebookPreview;

    useImperativeHandle(ref, () => ({
      onCopyCustom: () => {
        const output = getValues(`output.${blockIndex}`);
        return output.postCaption;
      },
    }));

    return (
      <Wrapper className="col-4">
        <TopSection>
          <FacebookLogo />
          <LeftTopMenu>
            <AccountText className="ml-1">{website?.name}</AccountText>
            <Neword />
          </LeftTopMenu>
        </TopSection>

        <ContentWrapper className="mt-1">
          <EditableTextArea<DocumentEntityType.FACEBOOK_POST_CAPTION>
            fieldName={`output.${blockIndex}.postCaption`}
            handleBlur={handleBlur}
            blockIndex={blockIndex}
            isEditing={isEditing}
          />
        </ContentWrapper>
        <FacebookPreviewWrapper src={imageUrl} />
        <div className="flex mt-1">
          <FacebookLikeCount />
          869
        </div>
        <IconsWrapper>
          <div className="flex">
            <FacebookShare className="ml-2" />
            שיתוף
          </div>
          <div className="flex">
            <FacebookComment className="ml-2" />
            תגובה
          </div>

          <div className="flex">
            <FacebookLike className="ml-2" />
            לייק
          </div>
        </IconsWrapper>
      </Wrapper>
    );
  }
);

export default FacebookCaptionBlock;
