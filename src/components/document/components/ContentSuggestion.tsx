import { useParams } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { suggestedKeywordsState } from "../../../state/suggestedKeywordsState";
import { workerState } from "../../../state/workerState";
import Link from "../../common/Link";
import { useState } from "react";

const SuggestedKeyword = styled.a`
  display: inline-flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 12px;
  border: 1px solid var(--Input-BorderColor, #e6e6e6);
  leading-trim: both;
  color: #000;
  cursor: pointer;
`;

interface Props {
  onClickKeyword: (keyword: string) => void;
}

const suggestedContents = [
  "🛒 קידום מוצר",
  "📣 פוסט מיתוגי",
  "🌟 הכרזה על מוצר",
  "קידום מבצע",
  "📅 הכרזה על אירוע",
  "✍️ ביקורת",
  "🌴 עונתי / חג",
];

const ContentSuggestion: React.FC<Props> = ({ onClickKeyword }) => {
  const onClick = (content: string) => {
    onClickKeyword(content);
  };

  return (
    <>
      {suggestedContents?.map((suggestedContent, index) => (
        <SuggestedKeyword key={index} onClick={() => onClick(suggestedContent)}>
          {suggestedContent}
        </SuggestedKeyword>
      ))}
    </>
  );
};

export default ContentSuggestion;
