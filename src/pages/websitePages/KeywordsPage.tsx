import React, { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import CardIconTitle from "../../components/common/CardIconTitle";
import KeyIcon from "@mui/icons-material/KeyOutlined";
import { useRecoilState, useRecoilValue } from "recoil";
import { workerState } from "../../state/workerState";
import { useParams } from "react-router";

import workerService from "../../core/services/worker.service";

import WebsiteTabsNav from "../../components/website/WebsiteTabsNav";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import SelectKeywordsInput from "../../components/keywords/SelectKeywordsInput";
import { Worker } from "../../core/entities/worker";
import FormStyle from "../../components/common/form/FormStyle";
import PageTitle from "../../components/common/PageTitle";

const KeywordsPage: React.FC = () => {
  const { websiteId } = useParams();
  const [worker, setWorker] = useRecoilState(workerState(websiteId as string));
  const methods = useForm<Worker>({ values: worker });
  const { handleSubmit, watch } = methods;
  const keywords = watch("keywords");

  useEffect(() => {
    handleSubmit(onSubmit)();
  }, [keywords]);

  const onSubmit: SubmitHandler<Worker> = async (data: Worker) => {
    try {
      setWorker(data);
      await workerService.updateWorker(worker.id, data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <PageTitle
          title="מילות מפתח פעילות"
          subtitle="בחר במילת המפתח הרלוונטית בשבילך "
        />
        <div className="grid m-0">
          <FormStyle onSubmit={(e) => e.preventDefault()}>
            <div className="col-6 pl-0 pr-0">
              <Card>
                <SelectKeywordsInput<Worker>
                  fieldName="keywords"
                  keywordsHeader="מילות מפתח פעילות:"
                  middleText="נא להיות ספציפי ככל שתוכל."
                  displaySuggestions={true}
                />
              </Card>
            </div>
          </FormStyle>
        </div>
      </FormProvider>
    </>
  );
};

export default KeywordsPage;
