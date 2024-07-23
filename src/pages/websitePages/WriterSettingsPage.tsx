import React, {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Card from "../../components/common/Card";
import "react-js-cron/dist/styles.css";
import { workerState } from "../../state/workerState";
import { useRecoilState } from "recoil";
import { useParams } from "react-router";

import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import FormStyle from "../../components/common/form/FormStyle";

import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import WebsiteTabsNav from "../../components/website/WebsiteTabsNav";

import styled from "styled-components";

import languages from "../../core/constants/languages";
import { ReactComponent as LogoIcon } from "../../assets/Logo/BlackIcon.svg";

import Goals from "../../components/writerSettings/Goals";
import Tone from "../../components/writerSettings/Tone";

import Button from "../../components/common/form/Button";
import AddCustomVoiceModal from "../../components/modals/AddCustomVoiceModal";
import { writerState } from "../../state/writerState";
import { Writer } from "../../core/entities/writer";
import writerService from "../../core/services/writer.service";
import CardIconTitle from "../../components/common/CardIconTitle";
import { Skeleton } from "primereact/skeleton";
import GmailLogo from "../../assets/images/integrations/gmail-logo.png";
import CardTitle from "../../components/common/CardTitle";
import { ReactComponent as InformativeIcon } from "../../assets/Icons/Infoformative.svg";
import Badge from "../../components/common/Badge";

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.029rem;
  margin-top: 10px;
  color: var(--title-color);
`;

const SectionSubTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.029rem;
  margin-bottom: 30px;
  color: var(--text-color);
`;

const WriterSettingsPage: React.FC = () => {
  const { websiteId } = useParams();
  const [writer, setWriter] = useRecoilState(writerState(websiteId as string));
  const methods = useForm<Writer>({ values: writer });

  const watch = [
    methods.watch("goal"),
    methods.watch("language"),
    methods.watch("tone"),
  ];

  const onSubmit: SubmitHandler<Writer> = useCallback(async (data: Writer) => {
    try {
      setWriter(data);
      await writerService.updateWriter(writer.id, data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    methods.handleSubmit(onSubmit)();
  }, [...watch]);

  const [showAddVoiceModal, setShowAddVoiceModal] = useState(false);

  return (
    <>
      {/* <WebsitePageLayout /> */}
      <FormProvider {...methods}>
        <FormStyle className="mb-4">
          <div className="grid">
            <div className="col-12">
              <SectionTitle className="mb-5 mt-3">
                בחר את מטרת הכותב שלך{" "}
              </SectionTitle>
              <Goals<Writer> fieldName="goal" />

              <div className="flex justify-content-between">
                <SectionTitle className="mb-4 mt-5">
                  בחר את קול הכותב שלך{" "}
                </SectionTitle>
                {/* <Button
                  arrowPlacement="right"
                  onClick={() => setShowAddVoiceModal(true)}
                >
                  Add custom voice
                </Button> */}
              </div>
              <Tone<Writer> fieldName="tone" />
              <SectionTitle className="mb-4 mt-3">הגדרות מתקדמות</SectionTitle>
            </div>
            <div className="col-4 ">
              <label htmlFor="language">שפת הכותב</label>
              <Controller
                name="language"
                control={methods.control}
                render={({ field, formState }) => (
                  <Dropdown
                    className={
                      methods.formState.errors.language ? "p-invalid" : ""
                    }
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    options={languages}
                    placeholder="Select Language"
                  />
                )}
              />
            </div>
          </div>
        </FormStyle>
      </FormProvider>
      {/* <Divider />
        <div className="col-12 mb-5">
          <LinksManage />
        </div> */}
      {showAddVoiceModal && (
        <React.Suspense fallback={""}>
          <AddCustomVoiceModal onHide={() => setShowAddVoiceModal(false)} />
        </React.Suspense>
      )}
    </>
  );
};

export default WriterSettingsPage;
