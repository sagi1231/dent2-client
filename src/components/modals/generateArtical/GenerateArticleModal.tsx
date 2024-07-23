import { Dialog } from "primereact/dialog";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import workerService from "../../../core/services/worker.service";
import { workerState } from "../../../state/workerState";
import Button from "../../common/form/Button";
import styled from "styled-components";
import FormStyle from "../../common/form/FormStyle";
import ModalHeader from "../ModalHeader";
import { FormProvider } from "react-hook-form";
import { TriggerWorkerRequestData } from "../../../core/services/requests/worker/triggerWorkerRequestData";
import { publishIntegrationState } from "../../../state/publishIntegrationState";
import { userState } from "../../../state/userState";
import { PackageType } from "../../../core/types/packageType";
import UpgradePackage from "../UpgradePackage";
import { usageState } from "../../../state/usageState";
import { UsageType } from "../../../core/types/usageType";
import { toast } from "react-toastify";
import { getGenerateArticleSteps } from "./GenerateArticleSteps";
import useMultiStepForm from "../../../hooks/useMultiStepForm";
import { writerState } from "../../../state/writerState";
import { Tooltip } from "primereact/tooltip";
import ArticlePreview from "./ArticlePreview";

interface Propse {
  onHide: () => void;
  onSubmit: (workerRunId: string) => void;
}

const ButtonStyled = styled(Button)`
  float: left;
`;

const GenerateArticleModal: React.FC<Propse> = ({ onHide, onSubmit }) => {
  const { websiteId } = useParams();
  const [packageModal, setPackageModal] = useState(false);
  const [user] = useRecoilState(userState);
  const worker = useRecoilValue(workerState(websiteId as string));
  const writer = useRecoilValue(writerState(websiteId as string));

  const publishIntegration = useRecoilValue(
    publishIntegrationState(websiteId as string)
  );
  const generateArticleSteps = getGenerateArticleSteps(publishIntegration);

  const [usage, setUsage] = useRecoilState(
    usageState(
      user?.company.Subscription.type === PackageType.TRIAL
        ? UsageType.LIFETIME
        : UsageType.MONTHLY
    )
  );
  const validateUsage = useCallback(() => {
    const subscription = user.company.Subscription;
    if (!subscription.isActive || subscription.maxArticles === usage.articles) {
      setPackageModal(true);
      throw new Error("No package was found");
    }
  }, [usage.articles, user]);

  const onSubmitInternal = useCallback(async () => {
    try {
      validateUsage();

      const { workerRunId } = await workerService.triggerWorker(
        worker.id,
        getValues()
      );
      toast(`
      Hang tight! We're crafting your blog post. Feel free to step away—we'll email you once it's ready!`);
      onSubmit(workerRunId);
      setUsage({ ...usage, articles: usage.articles + 1 });
    } catch (err) {
      console.log(err);
    } finally {
    }
  }, [onSubmit, setUsage, usage, validateUsage, worker.id]);

  const {
    methods,
    onClickNextButton,
    navigatePrevStep,
    component,
    activeStep,
    showBackButton,
    isLoading,
  } = useMultiStepForm<TriggerWorkerRequestData>(
    generateArticleSteps,
    onSubmitInternal,
    {
      disablePublish: publishIntegration?.disablePublish,
      publishAsDraft: publishIntegration?.publishAsDraft,
      template: writer.templates[0],
      goal: writer.goal,
      tone: writer.tone,
      language: writer.language,
      keyword: "",
      title: "",
    }
  );

  const { getValues, formState } = methods;

  const error = useMemo((): string => {
    if (!formState.isValid) {
      return (
        Object.values(formState.errors).find((e) => e.message)?.message || ""
      );
    }
    return "";
  }, [formState.errors, formState.isValid]);

  return (
    <Dialog
      header={<ModalHeader OnClose={onHide} right={true} />}
      closable={false}
      modal={true}
      visible
      position={"bottom-left"}
      style={{
        width: "95vw",
        height: "calc(100vh)",
        margin: "0",
        boxShadow: "none",
        borderLeft: "solid 1px var(--border-color)",
        borderRadius: "0px",
        maxHeight: "100%",
      }}
      draggable={false}
      resizable={false}
      onHide={onHide}
      footer={
        <>
          <ButtonStyled
            data-pr-tooltip={error}
            data-pr-position="top"
            primary
            arrowPlacement="right"
            disabled={!methods.formState.isValid}
            onClick={onClickNextButton}
            loading={isLoading}
            name="kaki"
          >
            {activeStep < generateArticleSteps.length - 1 ? "הבא" : "לצור"}
          </ButtonStyled>

          {showBackButton && (
            <Button
              onClick={navigatePrevStep}
              arrowPlacement="left"
              loading={isLoading}
            >
              חזור
            </Button>
          )}
        </>
      }
    >
      <FormProvider {...methods}>
        <FormStyle
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          className="grid"
        >
          <div className="col-7">{component}</div>
          <div className="col-1"></div>
          <div className="col-4">
            <ArticlePreview data={methods.getValues()} />
          </div>
        </FormStyle>
      </FormProvider>
      {packageModal && <UpgradePackage onHide={() => setPackageModal(false)} />}
    </Dialog>
  );
};

export default GenerateArticleModal;
