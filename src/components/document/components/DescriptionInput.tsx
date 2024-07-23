import {
  Controller,
  Path,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import styled from "styled-components";
import React, { useEffect, useState } from "react";

import {
  DocumentTypeFactory,
  DocumentEntityType,
  DocumentEntity,
} from "neword-core";
import ContentSuggestion from "./ContentSuggestion";
import { useRecoilValue } from "recoil";
import { documentState } from "../../../state/documentState";
import { useParams } from "react-router";
const DescriptionWrapper = styled.div`
  overflow: scroll;
`;
const TextHeader = styled.div`
  color: #000;
  font-family: "Assistant";
  font-size: 18.298px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%; /* 20.128px */
  letter-spacing: -0.549px;
  margin-top: 30;
`;
const StyledInputText = styled.textarea`
  border: none;
  outline: none; /* This removes the default outline that appears when the input is focused */
  height: 100px;
  resize: auto; /* Disable manual resizing */
  font-family: inherit; /* Inherit font family */
`;
const SuggestedKeywordWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;
const InputTextWrapper = styled.div`
  height: 287px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--Input-BorderColor, #e6e6e6);
  margin-top: 17px;
  overflow: scroll;
`;
const SmallLabel = styled.label`
  font-family: "Assistant";
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%; /* 13.2px */
  letter-spacing: -0.36px;
`;

const Wrapper = styled.div`
  margin-top: 20px;
`;

function DescriptionInput() {
  const { documentId } = useParams<{ documentId: string }>();

  const document = useRecoilValue(documentState(documentId as string));

  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<DocumentEntity<typeof document.type>>();

  const onEnter = async (caption: string) => {
    setValue("inputParams.description", caption);
  };
  return (
    <div className="w-full">
      <TextHeader>מה נושא תיאור הפוסט?</TextHeader>
      <Controller
        name={"inputParams.description"}
        control={control}
        rules={{
          required: true,
          minLength: 1,
        }}
        render={({ fieldState, field }) => (
          <InputTextWrapper>
            <StyledInputText
              value={field.value}
              placeholder="תרשמו כאן את כל שעל ליבכם"
              onChange={field.onChange}
              className={"w-full mb-1 " + (fieldState.error ? "p-invalid" : "")}
            />

            <Wrapper>
              <SmallLabel>אפשרויות מהירות</SmallLabel>
              <SuggestedKeywordWrapper>
                <ContentSuggestion onClickKeyword={onEnter} />
              </SuggestedKeywordWrapper>
            </Wrapper>
          </InputTextWrapper>
        )}
      />
    </div>
  );
}

export default DescriptionInput;
