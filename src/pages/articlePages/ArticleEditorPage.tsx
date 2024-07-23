import { useParams } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { articleState } from "../../state/articleState";
import ArticleEditorNavbar from "../../components/articleEditor/ArticleEditorNavbar";
import ArticleTextEditor from "../../components/articleEditor/ArticleTextEditor";
import ArticleEditorSidebar from "../../components/articleEditor/ArticleEditorSidebar";
import { FormProvider, useForm } from "react-hook-form";
import { Article } from "../../core/entities/article";
import FormStyle from "../../components/common/form/FormStyle";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import articleService from "../../core/services/article.service";
import { throttle } from "lodash";
import React from "react";
import { articleSavingTateState } from "../../state/articleSavingTateState";

const ArticleEditorPage: React.FC = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useRecoilState(
    articleState(articleId as string)
  );

  const methods = useForm<Article>({
    defaultValues: article,
  });

  const setSavingTate = useSetRecoilState(articleSavingTateState);

  const onSubmit = useCallback(async () => {
    const values = methods.getValues();

    try {
      const updatedArticle = await articleService.updateArticle(
        values,
        articleId as string
      );
      setSavingTate(false);
    } catch (err) {}
  }, [articleId, methods]);

  const articlePropsWatch = [
    methods.watch("body"),
    methods.watch("title"),
    methods.watch("category"),
    methods.watch("metadata.metatags.title"),
    methods.watch("metadata.metatags.description"),
    methods.watch("tags"),
  ];

  const submitDebounced = useCallback(throttle(onSubmit, 1000), []);

  useEffect(() => {
    setSavingTate(true);
    setArticle(structuredClone(methods.getValues()));
    methods.handleSubmit(submitDebounced)();
  }, [methods, submitDebounced, ...articlePropsWatch]);

  return (
    <>
      {article && (
        <FormProvider {...methods}>
          <FormStyle>
            <ArticleEditorNavbar />
            <div className="grid m-0">
              <div className="col-9 p-0">
                <ArticleTextEditor />
              </div>
              <div className="col-3 p-0">
                <ArticleEditorSidebar />
              </div>
            </div>
          </FormStyle>
        </FormProvider>
      )}
    </>
  );
};

export default React.memo(ArticleEditorPage);
