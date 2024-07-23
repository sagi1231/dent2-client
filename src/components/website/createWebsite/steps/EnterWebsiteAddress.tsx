import { InputText } from "primereact/inputtext";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { CreateWebsiteRequestData } from "../../../../core/services/requests/createWebsite/createWebsiteRequestData";
import RegexValidations from "../../../../core/validation/regexValidations";
import Preloader from "../../../common/Preloader";
import Button from "../../../common/form/Button";
import { useCallback, useState } from "react";
import crollerService from "../../../../core/services/croller.service";
import { InputTextarea } from "primereact/inputtextarea";
import Badge from "../../../common/Badge";
import CardTitle from "../../../common/CardTitle";
import { Divider } from "primereact/divider";
import { Tooltip } from "primereact/tooltip";
import Card from "../../../common/Card";
import { Language } from "../../../../core/types/language";

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

const BadgeWrapper = styled.div`
  z-index: 22;
  position: absolute;
  right: 40px;
  top: -10px;
`;

const RequiredBadgeWrapper = styled.div`
  z-index: 22;
  position: absolute;
  right: 70px;

  top: 50%;
  transform: translate(+70%, -50%);
`;

const StackWrapper = styled.div`
  gap: 20px;
  margin-top: 10px;
  position: relative;
`;

const BusinessInfo = styled(Card)`
  .input-bg {
    background: var(--light-bg);
  }
`;

const ButtonStyle = styled(Button)`
  path {
    fill: "white" !important;
  }
`;

const SmallText = styled.small`
  color: var(--text-color);
`;
const EnterWebsiteAddress: React.FC = () => {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    trigger,
  } = useFormContext<CreateWebsiteRequestData>();

  const [isLoading, setIsLoading] = useState(false);

  const onScanWebsite = useCallback(async () => {
    setIsLoading(true);
    try {
      const isValid = await trigger("website.url");

      if (!isValid) throw new Error("Url is not valid");

      const scannedWebsiteMeta = await crollerService.scanWebsite(
        getValues("website.url")
      );

      setValue("website.name", scannedWebsiteMeta.name);
      setValue("website.description", scannedWebsiteMeta.description);
      setValue(
        "writer.language",
        scannedWebsiteMeta.language || Language.ENGLISH
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [getValues, setValue]);

  return (
    <div className="w-full">
      <div>
        <label htmlFor="username">הזן את כתובת האתר של העסק שלך</label>

        <StackWrapper className="flex">
          <RequiredBadgeWrapper>
            <Badge bgColor="purple">שדה חובה</Badge>
          </RequiredBadgeWrapper>
          <TextInsideInput
            dir="ltr"
            className={errors.website?.url ? "p-invalid" : ""}
          >
            <InnerText>https://</InnerText>
            <InputText
              disabled={isLoading}
              {...register("website.url", {
                required: true,
                setValueAs: (value: string) => {
                  const formatted = value
                    .replace("https://", "")
                    .replace("http://", "");
                  return `https://${formatted}`;
                },
                pattern: {
                  value: RegexValidations.url,
                  message: "כתובת האתר אינה חוקית",
                },
              })}
              placeholder="yourwebsite.com"
              className={
                "w-full unmask-clarity" +
                (errors.website?.url ? "p-invalid" : "")
              }
            />
          </TextInsideInput>
          <ButtonStyle
            arrowPlacement="right"
            loading={isLoading}
            onClick={onScanWebsite}
          >
            סרוק את האתר{" "}
          </ButtonStyle>
        </StackWrapper>
        <div className="mb-3 mt-3">
          <small
            style={{
              color: "red",
            }}
          >
            {errors.website?.url?.message}
          </small>
        </div>
      </div>
      <Divider />

      <div>
        <BusinessInfo className="relative">
          <BadgeWrapper>
            <Badge bgColor="yellow" textColor="title">
              מידע עסקי
            </Badge>
          </BadgeWrapper>
          <CardTitle title="שם העסק:" className="mb-0"></CardTitle>

          <InputText
            disabled={isLoading}
            {...register("website.name", {
              required: {
                message: "נדרש שם העסק",
                value: true,
              },
            })}
            placeholder="E.g Neword AI"
            className="border-none input-bg unmask-clarity"
          />
          <CardTitle title="תיאור העסק" className="mb-0 mt-3"></CardTitle>

          <InputTextarea
            autoResize
            className="border-none input-bg unmask-clarity"
            disabled={isLoading}
            {...register("website.description", {
              required: {
                message: "נדרש תיאור העסק",
                value: true,
              },
            })}
            placeholder="למשל Neword AI הוא כלי בינה מלאכותית שכותבת תוכן כדי לעזור להגדיל את התנועה לאתר ולחסוך זמן וכסף."
          />
        </BusinessInfo>
        <SmallText className="mt-3">
          <strong>לא נפרסם שום דבר ללא רשותך.</strong>
          <br></br>
          על ידי לחיצה על "בחר יעד", אתה מאשר בעלות או הרשאה לשימוש התוכן של אתר
          זה, המאפשר ל-Neword לסרוק ולהתאמן עליו נתונים.
        </SmallText>
      </div>
    </div>
  );
};

export default EnterWebsiteAddress;
