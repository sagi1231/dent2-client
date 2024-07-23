import { InputText } from "primereact/inputtext";
import {
  Controller,
  FieldValues,
  Path,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import styled from "styled-components";
import { ReactComponent as SpeaklesIcon } from "../../assets/Icons/Sparkles.svg";
import { ReactComponent as CloseIcon } from "../../assets/Icons/Close.svg";
import React, { useEffect, useState } from "react";
import Link from "../common/Link";
import CardSubtitle from "../common/CardSubtitle";
import SuggestionsKeywords from "./KeywordsSuggestions";
import Badge from "../common/Badge";

const KeywordsContainer = styled.div`
  margin-top: 0px;
`;

const KeywordsWrapper = styled.div`
  margin-top: 0px;
  display: flex;
  gap: 0.625rem;
  flex-wrap: wrap;

  & .kw-bg {
    /* border: solid 1px var(--border-color); */
    color: var(--primary-purple);
    background: var(--light-bg);
  }
`;

const KeywordBadge = styled(Link)`
  cursor: pointer !important;
  &:hover .kw-overly {
    opacity: 0.85;
  }

  &:hover .kw-overly svg path {
    opacity: 1;
  }
  & .close path {
    fill: var(--primary-purple);
  }
`;

const KeywordOverlay = styled(Link)`
  width: 100%;
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--primary-purple);
  border-radius: 600px;
  opacity: 0;
  transition-duration: 0.2s;

  & svg path {
    fill: white;
    opacity: 0;
    transition-duration: 0.2s;
  }
`;

const SuggestedKeywordWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 30px;
`;

interface Props<T> {
  fieldName: Path<T>;
  middleText?: string;
  keywordsHeader?: string;
  displaySuggestions?: boolean;
}

const Wrapper = styled.div`
  margin-top: 20px;
`;

function SelectKeywordsInput<FormDataType extends FieldValues>({
  fieldName,
  middleText,
  keywordsHeader,
  displaySuggestions,
}: Props<FormDataType>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormDataType>();

  const keywords = useWatch({ control, name: fieldName }) as string[];

  const { append, remove, fields } = useFieldArray({
    name: fieldName as any,
    control,
  });

  const [keyword, setKeyword] = useState("");

  const onEnter = async (keyword: string) => {
    if (keyword && !keywords.includes(keyword)) {
      setKeyword("");
      append(keyword as any);
    }
  };

  return (
    <div className="w-full">
      <Controller
        name={fieldName}
        control={control}
        rules={{
          required: true,
          minLength: 1,
        }}
        render={({ fieldState }) => (
          <>
            <label className="block mt-4">הזן מילות מפתח באופן ידני</label>
            <InputText
              value={keyword}
              placeholder='הזן את מילת המפתח הרצויה ולחץ על "Enter" כדי להוסיף אותה'
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.keyCode === 13 && onEnter(keyword)}
              className={"w-full mb-3 " + (fieldState.error ? "p-invalid" : "")}
            />
            <small className="mb-4 block">{middleText}</small>

            {displaySuggestions && (
              <Wrapper>
                <label>מילות מפתח מומלצות:</label>
                <SuggestedKeywordWrapper>
                  <React.Suspense
                    fallback={
                      <small>מוצא הצעות למילות מפתח רלוונטיות...</small>
                    }
                  >
                    <SuggestionsKeywords onClickKeyword={onEnter} />
                  </React.Suspense>
                </SuggestedKeywordWrapper>
              </Wrapper>
            )}

            <KeywordsContainer>
              {/* <label>{keywordsHeader}</label> */}
              <KeywordsWrapper>
                {keywords.map((keyword, index) => (
                  <KeywordBadge key={keyword + index} className="kw-bg">
                    <Badge
                      icon={<CloseIcon className="close" />}
                      hover
                      bgColor="bg"
                      clickable
                      textColor="purple"
                      large
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      {keyword}
                    </Badge>
                  </KeywordBadge>
                ))}
              </KeywordsWrapper>
            </KeywordsContainer>
          </>
        )}
      />
    </div>
  );
}

export default SelectKeywordsInput;
