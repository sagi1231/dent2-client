import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useParams } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Badge from "../../components/common/Badge";
import Card from "../../components/common/Card";
import CardTitle from "../../components/common/CardTitle";
import Button from "../../components/common/form/Button";
import PageTitle from "../../components/common/PageTitle";
import { websiteState } from "../../state/websitesState";
import { ReactComponent as DeleteIcon } from "../../assets/Icons/Delete.svg";
import FormStyle from "../../components/common/form/FormStyle";
import { Website } from "../../core/entities/website";
import { SubmitHandler, useForm } from "react-hook-form";
import { websiteService } from "../../core/services/website.service";
import { useCallback, useEffect, useState } from "react";
import DeleteWebsiteModal from "../../components/modals/DeleteWebsiteModal";
import { throttle } from "lodash";
import crollerService from "../../core/services/croller.service";

const BusinessInfoWrapper = styled(Card)`
  .input-bg {
    background: var(--light-bg);
  }
`;

const ButtonStyle = styled(Button)`
  path {
    fill: "white" !important;
  }
`;

const BadgeWrapper = styled.div`
  z-index: 22;
  position: absolute;
  left: 40px;
  top: -10px;
`;

const InnerText = styled.div`
  position: absolute;
  top: 0%;
  padding-left: 20px;
  padding-right: 20px;
  color: rgb(10, 37, 64);
  font-size: 12px;
  font-weight: bold;
  height: 50px;
  display: flex;
  align-items: center;

  border-radius: 6px 0 0 6px;
  letter-spacing: -0.1px;
`;

const TextInsideInput = styled.div`
  position: relative;
  width: 100%;
  width: calc(100% - 171px);

  & input {
    margin-top: 0;
    padding-left: 65px;
  }
`;

const StackWrapper = styled.div`
  gap: 20px;

  position: relative;
`;

const InputTextWrapper = styled.div`
  width: calc(100% - 171px);
`;

const BusinessInfo: React.FC = () => {
  const { websiteId } = useParams();
  const [website, setWebsite] = useRecoilState(
    websiteState(websiteId as string)
  );
  const [deleteWebsiteModal, setDeleteWebsiteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, register, getValues, setValue } = useForm<Website>({
    values: website,
  });

  const onSubmit: SubmitHandler<Website> = useCallback(
    async (data: Website) => {
      try {
        setWebsite(data);
        await websiteService.updateWebsiteById(data.id, data);
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  const submitDebounced = useCallback(throttle(onSubmit, 300), []);

  const onScanWebsite = useCallback(async () => {
    setIsLoading(true);
    try {
      const scannedWebsiteMeta = await crollerService.scanWebsite(
        getValues("url")
      );

      setValue("name", scannedWebsiteMeta.name);
      setValue("description", scannedWebsiteMeta.description);
      onSubmit(getValues());
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [getValues, setValue]);

  return (
    <>
      <PageTitle
        title="העסק שלי"
        subtitle="סקור וערוך את המידע העסקי שלך - כך נוכל להתאים את התוכן כך שיתאים לעסק שלך!"
      />
      <FormStyle onChange={handleSubmit(submitDebounced)}>
        <div className="grid">
          <div className="col-8">
            <BusinessInfoWrapper className="relative">
              <BadgeWrapper>
                <Badge bgColor="yellow" textColor="title">
                  מידע עסקי
                </Badge>
              </BadgeWrapper>

              <CardTitle title="אתר העסק:" className="mb-0"></CardTitle>
              <StackWrapper className="flex">
                <InputTextWrapper dir="ltr">
                  <InputText
                    disabled
                    {...register("url")}
                    placeholder="yourwebsite.com"
                    className={"w-full"}
                  />
                </InputTextWrapper>

                <ButtonStyle
                  arrowPlacement="right"
                  loading={isLoading}
                  onClick={onScanWebsite}
                >
                  סרוק את האתר{" "}
                </ButtonStyle>
              </StackWrapper>
              <br></br>
              <CardTitle title="שם העסק:" className="mb-0"></CardTitle>

              <InputText
                {...register("name")}
                placeholder="למשל Neword AI"
                className="border-none input-bg w-full"
                disabled={isLoading}
              />
              <CardTitle title="תיאור העסק:" className="mb-0 mt-3"></CardTitle>

              <InputTextarea
                disabled={isLoading}
                {...register("description")}
                autoResize
                className="border-none input-bg w-full"
                placeholder="למשל Neword AI הוא כלי בינה מלאכותית שכותבת תוכן כדי לעזור להגדיל את התנועה לאתר ולחסוך זמן וכסף."
              />
            </BusinessInfoWrapper>
          </div>
          <div className="col-12">
            <Button
              onClick={() => setDeleteWebsiteModal(true)}
              icon={<DeleteIcon />}
              textColor="danger"
            >
              מחק עסק{" "}
            </Button>
          </div>
        </div>
      </FormStyle>
      {deleteWebsiteModal && (
        <DeleteWebsiteModal onHide={() => setDeleteWebsiteModal(false)} />
      )}
    </>
  );
};

export default BusinessInfo;
