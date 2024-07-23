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
import { ReactComponent as EmailLogo } from "../../../assets/Icons/EmailLogo.svg";
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
`;

const LeftTopMenu = styled.div`
  display: flex;
  align-items: center;
`;
const SubjectWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const SubjectInputWrapper = styled.div`
  border-radius: 8px;
  background: var(--Card-Background, #f6f9fc);
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;
const ContentInputWrapper = styled.div`
  border-radius: 8px;
  background: var(--Card-Background, #f6f9fc);
  padding: 10px 20px;
  display: flex;
  min-height: 400px;
`;

const EditableInput = styled.input<{ isEditing: boolean }>`
  font-size: 12.21px;
  border: ${({ isEditing }) =>
    isEditing ? "1px solid var(--Input-BorderColor, #e6e6e6)" : "none"};
  background: transparent;
  outline: none;
  width: 100%;
  height: auto;
  font-family: inherit;
  &:focus {
    outline: none;
  }
`;
const BoldText = styled.div`
  text-align: right;
  font-family: "Noto Sans Hebrew";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  margin-left: 5px;
  white-space: nowrap;
  display: flex;
  min-width: 45px;
`;
const EmailContentBlock = forwardRef<RefProps, BlockProps>(
  ({ isEditing, blockIndex, handleBlur }, ref) => {
    const { websiteId } = useParams();
    const website = useRecoilValue(websiteState(websiteId as string));

    const wrapperRef = useRef<HTMLDivElement>(null);

    const { getValues } =
      useFormContext<DocumentEntity<DocumentEntityType.EMAIL_CONTENT>>();

    useImperativeHandle(ref, () => ({
      onCopyCustom: () => {
        const output = getValues(`output.${blockIndex}`);
        return output.subject + "\n \n" + output.content;
      },
      column: "4",
    }));
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          handleBlur(blockIndex);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [handleBlur]);

    return (
      <Wrapper ref={wrapperRef}>
        <TopSection>
          <EmailLogo />
          <LeftTopMenu>
            <AcountText className="ml-1">{website?.name}</AcountText>
            <Neword />
          </LeftTopMenu>
        </TopSection>
        <SubjectWrapper className="mt-3">
          <BoldText className="h-full">נושא |</BoldText>
          <SubjectInputWrapper className="w-full  ">
            <EditableTextArea<DocumentEntityType.EMAIL_CONTENT>
              fieldName={`output.${blockIndex}.subject`}
              blockIndex={blockIndex}
              isEditing={isEditing}
            />
          </SubjectInputWrapper>
        </SubjectWrapper>
        <div className="flex">
          <BoldText className="mt-3">גוף |</BoldText>
          <ContentInputWrapper className="w-full mt-3 ">
            <EditableTextArea<DocumentEntityType.EMAIL_CONTENT>
              fieldName={`output.${blockIndex}.content`}
              blockIndex={blockIndex}
              isEditing={isEditing}
            />
          </ContentInputWrapper>
        </div>
      </Wrapper>
    );
  }
);

export default EmailContentBlock;
