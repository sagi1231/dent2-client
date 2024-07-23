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
import { ReactComponent as ThreeDots } from "../../../assets/Icons/SmsThreeDots.svg";
import { ReactComponent as SmsIcon } from "../../../assets/Icons/SmsIcon.svg";

import { BlockProps } from "./types/dictionaryProps";
import { RefProps } from "./types/refProps";
import EditableTextArea from "../components/EditableTextArea";

const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  background: var(--Card-Background, #f6f9fc);
  padding: 10px 0px;
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
  background: var(--Card-Background, #f6f9fc);
  padding: 10px 0px;
  width: 80%;
  border-radius: 8px;
  padding: 3px 15px;
`;

const DotsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
`;

const SmsContentBlock = forwardRef<RefProps, BlockProps>(
  ({ isEditing, blockIndex, handleBlur }, ref) => {
    const { websiteId } = useParams();
    const website = useRecoilValue(websiteState(websiteId as string));
    const { getValues } =
      useFormContext<DocumentEntity<DocumentEntityType.SMS_CONTENT>>();

    useImperativeHandle(ref, () => ({
      onCopyCustom: () => {
        const output = getValues(`output.${blockIndex}`);
        return output.smsContent;
      },
      column: "4",
    }));

    return (
      <Wrapper>
        <TopSection>
          <Neword />
          <AcountText className="mt-1">{website?.name}</AcountText>
        </TopSection>

        <ContentWrapper className="mt-3 ">
          <EditableTextArea<DocumentEntityType.SMS_CONTENT>
            fieldName={`output.${blockIndex}.smsContent`}
            handleBlur={handleBlur}
            blockIndex={blockIndex}
            isEditing={isEditing}
          />
        </ContentWrapper>
        <DotsWrapper className="mt-4">
          <ThreeDots />
          <SmsIcon />
        </DotsWrapper>
      </Wrapper>
    );
  }
);

export default SmsContentBlock;
