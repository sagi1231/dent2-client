import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router";
import { ArticlesSummarySelector } from "../../../state/articlesState";
import ArticleCard from "../../website/articles/ArticleCard";
import CardTitle from "../../common/CardTitle";
import Link from "../../common/Link";
import styled from "styled-components";

const ViewAllStyle = styled(Link)`
  font-size: 12px;
  color: #741fff;
`;

const LastGeneratedArticles: React.FC = () => {
  const { websiteId } = useParams();
  const articles = useRecoilValue(ArticlesSummarySelector(websiteId as string));

  return (
    <>
      <div className="flex justify-content-between align-items-center mb-3">
        <CardTitle className="mb-0 ml-1" title={"פוסטים אחרונים"} />
        <ViewAllStyle className="mr-1" path={`articles`}>
          צפה בהכל{" "}
        </ViewAllStyle>
      </div>
      <div className="grid">
        {articles?.slice(0, 3).map((article, i) => (
          <ArticleCard
            isVertical
            isLastArticle
            key={i}
            articleSummary={article}
          />
        ))}
      </div>
    </>
  );
};

export default LastGeneratedArticles;
