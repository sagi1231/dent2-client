import { ReactComponentElement, ReactElement } from "react";
import { PublishIntegration } from "../../../core/entities/publishIntegration";
import { TriggerWorkerRequestData } from "../../../core/services/requests/worker/triggerWorkerRequestData";
import ChooseKeywords from "./steps/ChooseKeywords";
import ChooseTemplate from "./steps/ChooseTemplate";
import ChooseWriter from "./steps/ChooseWriter";
import EnableCMS from "./steps/EnableCMS";
import FormStepType from "../../common/form/types/formStepType";
import ChooseTopic from "./steps/ChooseTopic";

export const getGenerateArticleSteps = (
  publishIntegration: PublishIntegration | undefined
) => {
  const cmsStep = {
    component: <EnableCMS />,
    fields: ["disablePublish", "publishAsDraft"],
  } as FormStepType<TriggerWorkerRequestData>;

  const steps: FormStepType<TriggerWorkerRequestData>[] = [
    {
      component: <ChooseKeywords />,
      fields: ["keyword"],
    },
    {
      component: <ChooseTemplate />,
      fields: ["template"],
    },
    {
      component: <ChooseWriter />,
      fields: ["tone"],
    },
    {
      component: <ChooseTopic />,
      fields: ["title"],
    },
    ...(publishIntegration ? [cmsStep] : []),
  ];
  return steps;
};
