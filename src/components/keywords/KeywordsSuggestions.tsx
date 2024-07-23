import { useParams } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { suggestedKeywordsState } from "../../state/suggestedKeywordsState";
import { workerState } from "../../state/workerState";
import Link from "../common/Link";

const SuggestedKeyword = styled(Link)`
  color: #741fff;
  padding: 4px;
  padding-inline: 6px;
`;

interface Props {
  onClickKeyword: (keyword: string) => void;
}

const SuggestionsKeywords: React.FC<Props> = ({ onClickKeyword }) => {
  const { websiteId } = useParams();
  const worker = useRecoilValue(workerState(websiteId as string));
  const [suggestedKeywords, setSuggestedKeywords] = useRecoilState(
    suggestedKeywordsState(worker.id)
  );

  const onClick = (keyword: string) => {
    const sg = suggestedKeywords?.filter((k) => k !== keyword);
    setSuggestedKeywords(sg);
    onClickKeyword(keyword);
  };

  return (
    <>
      {suggestedKeywords?.map((suggestedKeyword,index) => (
        <SuggestedKeyword key={index} onClick={() => onClick(suggestedKeyword)}>
          + {suggestedKeyword}
        </SuggestedKeyword>
      ))}
    </>
  );
};

export default SuggestionsKeywords;
