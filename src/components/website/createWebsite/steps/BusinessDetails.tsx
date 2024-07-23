import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import FormStyle from "../../../common/form/FormStyle";
import { InputTextarea } from "primereact/inputtextarea";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../../../assets/Icons/PlusBorder.svg";
import { useFormContext } from "react-hook-form";
import { CreateWebsiteRequestData } from "../../../../core/services/requests/createWebsite/createWebsiteRequestData";
import RegexValidations from "../../../../core/validation/regexValidations";
import AttachmentInput from "../../../common/form/AttachmentInput";

const Title = styled.h2`
  color: var(--Main-TitleColor, #0a2540);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 1rem */
  letter-spacing: -0.03rem;
  margin-top: 10px;
`;

const Subtitle = styled.h3`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 0.875rem */
  letter-spacing: -0.02625rem;
`;

const UploadImage = styled.div`
  margin-top: 10px;
  width: 128px;
  height: 128px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed var(--border-color);
  flex-direction: column;
  gap: 10px;
  transition-duration: 0.05s;
  cursor: pointer;

  svg {
    width: 40px;
    height: 40px;
    fill: var(--border-color);
  }

  span {
    font-weight: bold;
    color: var(--border-color);
  }

  &:hover {
    border: 2px dashed var(--primary-color);
    svg {
      fill: var(--primary-color);
    }

    span {
      color: var(--primary-color);
    }
  }
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

const BusinessDetails: React.FC = () => {
  const { register, formState } = useFormContext<CreateWebsiteRequestData>();
  const { errors, isLoading } = formState;

  return (
    <>
      <FormStyle>
        <div className="grid">
          <div className="col-12">
            <label htmlFor="username">לוגו העסק</label>
            <AttachmentInput<CreateWebsiteRequestData> name="website.logoSrc"></AttachmentInput>
          </div>
          <div className="col-6">
            <label htmlFor="username">שם העסק</label>
            <InputText placeholder="איך העסק שלכם נקרא?"></InputText>
          </div>
          <div className="col-6">
            <label htmlFor="username">אתר העסק</label>
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
          </div>
          <div className="col-12">
            <label htmlFor="username">תיאור העסק</label>
            <InputTextarea
              {...register("website.description")}
              placeholder="איך העסק שלכם נקרא?"
            ></InputTextarea>
          </div>
          <div className="col-12">
            <Title>מה תחום העיסוק שלך?</Title>
            <Subtitle>
              ככה נדע הכי טוב ליצור לך את התוכן הטוב ביותר! המידע כמובן לא מופיע
              בשום מקום
            </Subtitle>
          </div>
          <div className="col-12">
            <label htmlFor="username">תחום עיסוק</label>
            <InputText
              {...register("website.category")}
              placeholder="בחרו את תחום העיסוק שלכם"
            ></InputText>
            {/* This is a dropdown */}
          </div>
        </div>
      </FormStyle>
    </>
  );
};

export default BusinessDetails;
