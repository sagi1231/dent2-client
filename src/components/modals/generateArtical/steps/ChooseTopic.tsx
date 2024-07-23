import { Controller, useController, useFormContext } from "react-hook-form";
import { TriggerWorkerRequestData } from "../../../../core/services/requests/worker/triggerWorkerRequestData";
import styled from "styled-components";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import Button from "../../../common/form/Button";
import { InputText } from "primereact/inputtext";
import generatorService from "../../../../core/services/generator.service";
import { ReactComponent as AddIcon } from "../../../../assets/Icons/PlusBorder.svg";
import { Add } from "@mui/icons-material";
import Badge from "../../../common/Badge";
import { Divider } from "primereact/divider";
import { useRecoilValue } from "recoil";
import { topicsByArticleState } from "../../../../state/topicsByArticleState";
import React from "react";
import Preloader from "../../../common/Preloader";
import { formatTitle } from "../../../../common/utils/formatTitle";

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.029rem;
  margin-top: 10px;
  color: var(--title-color);
`;

const Title = styled.h1`
  color: #0a2540;
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -2.88px;
  margin-bottom: 30px;
`;

const Use = styled.div`
  color: var(--primary-purple);
  text-decoration: none !important;
`;

const TopicItem = styled.div`
  /* border-bottom: solid 1px var(--border-color); */
  .buttonGW {
    border: solid 1px var(--border-color);

    padding: 20px;

    &:not(${Use}):hover {
      border-color: var(--title-color);
      /* text-decoration: underline; */
    }
  }
`;

const TopicsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* margin-bottom: 20px; */
`;

const InputStyled = styled(InputText)`
  margin-top: 0 !important;
  background: var(--light-bg);
  padding: 30px !important;
  /* border-radius: 0 !important; */
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: none !important;
  /* border-bottom: solid 1px var(--border-color) !important; */
`;

const TopicSuggestions: React.FC<{
  data: Omit<
    TriggerWorkerRequestData,
    "title" | "publishAsDraft" | "disablePublish"
  >;
  setTopic: (title: string) => void;
}> = ({ data, setTopic }) => {
  const topics = useRecoilValue(topicsByArticleState(data));

  return (
    <TopicsWrapper>
      {topics.map((topic) => (
        <TopicItem>
          <Button
            fullWidth
            hoverComponent={<Badge bgColor="purple">השתמש בזה</Badge>}
            className="buttonGW"
            onClick={() => setTopic(topic)}
            arrowPlacement="right"
          >
            {topic}
          </Button>
        </TopicItem>
      ))}
    </TopicsWrapper>
  );
};

const ChooseTopic: React.FC = () => {
  const methods = useFormContext<TriggerWorkerRequestData>();
  const values = methods.getValues();
  const { field } = useController({
    control: methods.control,
    name: "title",
    rules: {
      required: {
        value: true,
        message: "אנא בחר/כתוב נושא",
      },
    },
  });

  return (
    <>
      <Title>בחר את הנושא שלך</Title>

      <React.Suspense
        fallback={
          <Preloader>אנחנו חושבים על רעיונות לנושאים בשבילך :)</Preloader>
        }
      >
        <TopicSuggestions
          data={{
            goal: values.goal,
            template: values.template,
            tone: values.tone,
            language: values.language,
            keyword: values.keyword,
          }}
          setTopic={(t) => methods.setValue("title", t)}
        />
      </React.Suspense>

      <Divider />
      <InputStyled
        placeholder="למשל 5 טיפים לשיפור הבריאות"
        onChange={(e) => {
          e.target.value = formatTitle(e.target.value);
          field.onChange(e);
        }}
        value={field.value}
      />
    </>
  );
};

export default ChooseTopic;
