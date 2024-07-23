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
import { BlockOutputProps } from "./types/blockOutputProps";
import { DocumentEntity, DocumentEntityType } from "neword-core";
import { ReactComponent as Neword } from "../../../assets/Icons/Neword.svg";
import { ReactComponent as InstagramLogo } from "../../../assets/Icons/InstagramIcon.svg";
import InstagramPreview from "../../../assets/images/instagramPreview.png";
import { ReactComponent as LightBulb } from "../../../assets/Icons/ReelLightBulb.svg";
import { ReactComponent as ReelDescription } from "../../../assets/Icons/ReelDescription.svg";
import { ReactComponent as ReelWidgets } from "../../../assets/Icons/ReelWidgets.svg";

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

const LeftTopMenu = styled.div`
  display: flex;
  align-items: center;
`;

const InstagramTextWrapper = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  gap: 20px;
  border-radius: 13.051px;
  background: var(--Card-Background, #f6f9fc);
`;
const PurpelText = styled.div`
  color: #6300c1;
  text-align: right;
  font-family: "Noto Sans Hebrew";
  font-size: 12.211px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 15.875px */
  letter-spacing: -0.366px;
`;

const InstagramStoryIdeaBlock = forwardRef<RefProps, BlockProps>(
  ({ isEditing, blockIndex, handleBlur }, ref) => {
    const { websiteId } = useParams();
    const website = useRecoilValue(websiteState(websiteId as string));
    const { getValues } =
      useFormContext<DocumentEntity<DocumentEntityType.INSTAGRAM_STORY_IDEA>>();

    useImperativeHandle(ref, () => ({
      onCopyCustom: () => {
        const output = getValues(`output.${blockIndex}`);
        return output.storyIdea;
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

        <InstagramTextWrapper className="mt-3">
          <LightBulb />
          <div>
            <PurpelText>רעיון סטורי:</PurpelText>
            <EditableTextArea<DocumentEntityType.INSTAGRAM_STORY_IDEA>
              fieldName={`output.${blockIndex}.storyIdea`}
              handleBlur={handleBlur}
              blockIndex={blockIndex}
              isEditing={isEditing}
            />
          </div>
        </InstagramTextWrapper>

        <InstagramTextWrapper className="mt-3">
          <ReelDescription />
          <div>
            <PurpelText>תיאור סטורי:</PurpelText>
            <EditableTextArea<DocumentEntityType.INSTAGRAM_STORY_IDEA>
              fieldName={`output.${blockIndex}.storyIdea`}
              handleBlur={handleBlur}
              blockIndex={blockIndex}
              isEditing={isEditing}
            />
          </div>
        </InstagramTextWrapper>

        <InstagramTextWrapper className="mt-3">
          <ReelWidgets />
          <div>
            <PurpelText>ווידג׳טים:</PurpelText>
            <EditableTextArea<DocumentEntityType.INSTAGRAM_STORY_IDEA>
              fieldName={`output.${blockIndex}.storyIdea`}
              handleBlur={handleBlur}
              blockIndex={blockIndex}
              isEditing={isEditing}
            />
          </div>
        </InstagramTextWrapper>
      </Wrapper>
    );
  }
);

export default InstagramStoryIdeaBlock;
