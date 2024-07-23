import { InputText } from "primereact/inputtext";
import { useController, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import React from "react";
import Preloader from "../../../common/Preloader";
import { GenerateArticleModalRadioType } from "../../types/generateArticleModalRadioType";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import Badge from "../../../common/Badge";
import { TriggerWorkerRequestData } from "../../../../core/services/requests/worker/triggerWorkerRequestData";
import { workerState } from "../../../../state/workerState";
import InputStyle from "../../../common/form/InputStyle";
import { getRandomItemFromList } from "../../../../common/utils/getRandomItemFromList";
import { useParams } from "react-router";

const KeywordsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  padding-right: 30px;
`;
const ManuallyWrapper = styled.div`
  padding-right: 30px;
`;

const StyledLable = styled.label`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.3px;
  color: var(--title-color);
`;

const Title = styled.h1`
  color: #0a2540;
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -2.88px;
  margin-bottom: 30px;
`;

const SuspendWrapper = () => {
  const { control } = useFormContext<TriggerWorkerRequestData>();
  const { websiteId } = useParams();
  const [radioOption, setRadioOption] = useState<GenerateArticleModalRadioType>(
    GenerateArticleModalRadioType.POOL
  );
  const { field } = useController({
    control: control,
    name: "keyword",
    rules: {
      required: {
        value: true,
        message: "please choose a keyword/subject",
      },
    },
  });
  const worker = useRecoilValue(workerState(websiteId as string));

  return (
    <div>
      <Title>בחר את מילת המפתח שלך</Title>
      <div className="flex flex-column pt-3">
        <div className="flex align-items-center">
          <RadioButton
            inputId="keywordspool"
            name="pizza"
            value={GenerateArticleModalRadioType.POOL}
            onChange={(e: RadioButtonChangeEvent) => {
              setRadioOption(e.value);
              field.onChange("");
            }}
            checked={radioOption === GenerateArticleModalRadioType.POOL}
          />
          <StyledLable htmlFor="keywordspool" className="mr-2">
            בחר ממאגר המילים{" "}
          </StyledLable>
        </div>
        {radioOption === GenerateArticleModalRadioType.POOL && (
          <KeywordsWrapper>
            {worker.keywords.map((keywordItem, index) => (
              <Badge
                hover
                clickable
                onClick={() => {
                  field.onChange(keywordItem);
                }}
                bgColor={keywordItem === field.value ? "purple" : "bg"}
                textColor={keywordItem === field.value ? "bg" : "purple"}
                large
              >
                {keywordItem}
              </Badge>
            ))}
          </KeywordsWrapper>
        )}
      </div>
      <div className="flex flex-column mt-4">
        <div className="flex align-items-center">
          <RadioButton
            inputId="manually"
            name="pizza"
            value={GenerateArticleModalRadioType.MANUAL}
            onChange={(e: RadioButtonChangeEvent) => {
              setRadioOption(e.value);
              field.onChange("");
            }}
            checked={radioOption === GenerateArticleModalRadioType.MANUAL}
          />
          <StyledLable htmlFor="manually" className="mr-2">
            היכנס ידנית{" "}
          </StyledLable>
        </div>
        {radioOption === GenerateArticleModalRadioType.MANUAL && (
          <ManuallyWrapper>
            <InputStyle>
              <InputText
                id="outlined-basic"
                placeholder='למשל "רעיונות לארוחת ערב "'
                onChange={field.onChange}
                value={field.value}
              />
              <small id="username-help"> נא להיות ספציפי ככל שתוכל </small>
            </InputStyle>
          </ManuallyWrapper>
        )}
      </div>
      <div className="flex flex-column mt-4">
        <div className="flex align-items-center">
          <RadioButton
            inputId="random"
            name="pizza"
            value={GenerateArticleModalRadioType.RANDOM}
            onChange={(e: RadioButtonChangeEvent) => {
              setRadioOption(e.value);
              field.onChange(getRandomItemFromList(worker.keywords));
            }}
            checked={radioOption === GenerateArticleModalRadioType.RANDOM}
          />
          <StyledLable htmlFor="random" className="mr-2 ">
            תן ל-Neword לבחור עבורך{" "}
          </StyledLable>
        </div>
      </div>
    </div>
  );
};

const ChooseKeywords: React.FC = () => {
  return (
    <React.Suspense
      fallback={
        <Preloader>
          Discover top-notch, tailor-made keywords for your website as we
          diligently scan its content.
        </Preloader>
      }
    >
      <SuspendWrapper />
    </React.Suspense>
  );
};

export default ChooseKeywords;
