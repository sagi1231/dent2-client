import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { useParams } from "react-router";
import { articlesAtom } from "../../state/articlesState";
import ArticleCard from "../website/articles/ArticleCard";
import GenerateArticleModal from "../modals/generateArtical/GenerateArticleModal";
import { WorkerRunStatusType } from "../../core/types/workerRunStatusType";
import { InputText } from "primereact/inputtext";
import InputStyle from "../common/form/InputStyle";
import articleService from "../../core/services/article.service";
import Button from "../common/form/Button";
import Preloader from "../common/Preloader";
import GeneratingArticleLoader from "./GeneratingArticleLoader";
import { ReactComponent as PlusBorderIcon } from "../../assets/Icons/PlusBorder.svg";
import { toast } from "react-toastify";
import workerRunService from "../../core/services/workerRun.service";
import { activeRunsState } from "../../state/activeRunsState";

const ArticlesList: React.FC = () => {
  const { websiteId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const [showGenerateArticleModal, setShowGenerateArticleModal] =
    useState(false);

  const [activeRuns, setActiveRuns] = useRecoilState(activeRunsState);

  const [articles, setArticles] = useRecoilState(
    articlesAtom(websiteId as string)
  );

  const pingWorkerRun = useCallback(
    async (workerRunId: string): Promise<boolean> => {
      const res = await articleService.getArticleByWorkerRunId(workerRunId);

      if (res.workerRun.status === WorkerRunStatusType.IN_PROGRESS) {
        return true;
      }

      const artiveRunsFiltered = activeRuns.filter((r) => r !== workerRunId);
      setActiveRuns(artiveRunsFiltered);

      if (
        res.workerRun.status === WorkerRunStatusType.DONE &&
        res.articleSummary
      ) {
        setArticles([res.articleSummary, ...(articles || [])]);
      } else if (res.workerRun.status === WorkerRunStatusType.FAILED) {
        toast(
          "We are sorry, an error as been occured while generating an article. please try again or contact support - support@ghostwrites.ai",
          {
            type: "error",
            autoClose: 10000,
          }
        );
      }

      return false;
    },
    [activeRuns, articles, setArticles]
  );

  const followRunningWorkerRun = useCallback(
    async (workerRunId: string) => {
      const followInterval = setInterval(async () => {
        const shouldKeepInterval = await pingWorkerRun(workerRunId);
        if (!shouldKeepInterval) clearInterval(followInterval);
      }, 10000);
    },
    [activeRuns, pingWorkerRun]
  );

  const getRunnigWorkerRuns = useCallback(async () => {
    const workerRuns = await workerRunService.getWorkerRuns(
      websiteId as string,
      WorkerRunStatusType.IN_PROGRESS
    );

    if (workerRuns) {
      setActiveRuns(workerRuns.map((w) => w.id));
      await Promise.all(workerRuns.map((w) => followRunningWorkerRun(w.id)));
    }
  }, [followRunningWorkerRun, websiteId]);

  useEffect(() => {
    getRunnigWorkerRuns();
  }, [websiteId]);

  const filteredArticles = useMemo(() => {
    return articles?.filter((a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articles, searchTerm]);

  return (
    <>
      <div className="grid">
        <div className="col-4">
          <InputStyle>
            <span className="p-input-icon-right w-full">
              <i className="pi pi-search" />
              <InputText
                className="border-none"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder="חפש מאמר בעסק"
              />
            </span>
          </InputStyle>
        </div>
        <div className="col-8 flex justify-content-end">
          {/* <Link
            className="h-full flex justify-content-center align-items-center"
            onClick={() => setShowGenerateArticleModal(true)}
          >
            <CardWrapper>
              <div className="p-4 h-full flex">
                <PlusButton>
                  <AddIcon />
                </PlusButton>

                <div className="flex flex-column justify-content-center ml-3">
                  <UpgradeText>Generate Articles</UpgradeText>
                  <PriceText>
                    Click here and Watch Ghostwrite Craft Your Masterpiece.
                  </PriceText>
                </div>
              </div>
            </CardWrapper>
          </Link> */}
          <div>
            <Button
              bgColor="purple"
              onClick={() => setShowGenerateArticleModal(true)}
              primary
              icon={<PlusBorderIcon />}
            >
              צור מאמר חדש
            </Button>
          </div>
        </div>

        {activeRuns.map((activeRun, i) => (
          <GeneratingArticleLoader key={i} />
        ))}

        {/* {activeRuns?.map((run) => (
          <InProgressCard>
            Our methaforical writer is writing for you at this moment
          </InProgressCard>
        ))} */}
        {filteredArticles?.map((article, i) => (
          <ArticleCard
            highlightTitleTerm={searchTerm}
            key={i}
            articleSummary={article}
          />
        ))}
      </div>

      {showGenerateArticleModal && (
        <React.Suspense fallback={<Preloader />}>
          <GenerateArticleModal
            onHide={() => setShowGenerateArticleModal(false)}
            onSubmit={(workerRunId: string) => {
              setActiveRuns([...activeRuns, workerRunId]);
              followRunningWorkerRun(workerRunId);
              setShowGenerateArticleModal(false);
            }}
          />
        </React.Suspense>
      )}
    </>
  );
};

export default ArticlesList;
