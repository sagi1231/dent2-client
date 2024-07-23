import React from "react";
import ArticlesList from "../../components/articles/ArticlesList";
import DocsList from "../../components/docs/DocsList";

const SingleWebsite: React.FC = () => {
  return (
    <>
      <DocsList />
      <ArticlesList />
    </>
  );
};

export default SingleWebsite;
