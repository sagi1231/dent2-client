import React, {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
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
import { publishIntegrationState } from "../../state/publishIntegrationState";
import { PublishIntegration } from "../../core/entities/publishIntegration";
import { publisherService } from "../../core/services/publisher.service";
import { throttle } from "lodash";
import { InputSwitch } from "primereact/inputswitch";
import Link from "../../components/common/Link";

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

const PublishSettings: React.FC = () => {
  const { websiteId } = useParams();

  const [publishIntegration, setPublishIntegration] = useRecoilState(
    publishIntegrationState(websiteId as string)
  );

  const onSubmit: SubmitHandler<PublishIntegration> = async (
    data: PublishIntegration
  ) => {
    try {
      await publisherService.updatePublishIntegrationById(data.id, data);
      setPublishIntegration(data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitDebounced = useCallback(throttle(onSubmit, 200), []);

  const methods = useForm<PublishIntegration>({
    values: publishIntegration,
  });

  const watchValues = [
    methods.watch("disablePublish"),
    methods.watch("publishAsDraft"),
  ];

  useEffect(() => {
    methods.handleSubmit(submitDebounced)();
  }, [...watchValues]);

  return (
    <FormProvider {...methods}>
      <form>
        <Card className="mb-4">
          <div className="flex justify-content-between mb-3">
            <div className="flex align-items-center">
              <CardTitle title="סנכרון אוטומטי עם CMS שנבחר" className="mb-0" />
            </div>
            <div>
              <Controller
                control={methods.control}
                name="disablePublish"
                render={({ field }) => (
                  <InputSwitch
                    checked={!field.value}
                    title="Sync with CMS"
                    onChange={(v) => field.onChange(!v.value)}
                  />
                )}
              />
            </div>
          </div>

          <small className="block">
            הפעלה זו תסנכרן אוטומטית כל פוסט שנוצר בבלוג עם ה
            <strong>CMS הפעיל</strong> שלך.
          </small>
        </Card>
        <Card className="mb-4">
          <div className="flex justify-content-between mb-3">
            <div className="flex align-items-center">
              <CardTitle title="העלה כטיוטה" className="mb-0" />
            </div>
            <div>
              <Controller
                control={methods.control}
                name="publishAsDraft"
                render={({ field }) => (
                  <InputSwitch
                    checked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <small className="block">
            כאשר המתג מופעל, המציין "העלה כטיוטה" התוכן{" "}
            <strong>נשאר לא מפורסם</strong> והוא גלוי רק ל משתמשים מורשים עם
            הרשאות עריכה.
          </small>
        </Card>
      </form>
    </FormProvider>
  );
};

export default PublishSettings;
