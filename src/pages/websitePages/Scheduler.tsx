import WebsiteTabsNav from "../../components/website/WebsiteTabsNav";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Cron } from "react-js-cron";
import RadioGroup from "../../components/common/form/RadioGroup";
import Button from "../../components/common/form/Button";
import { CronExpression } from "../../common/types/cronExpression";
import { CreateWebsiteRequestData } from "../../core/services/requests/createWebsite/createWebsiteRequestData";
import { throttle } from "lodash";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import workerService from "../../core/services/worker.service";
import { workerState } from "../../state/workerState";
import { Worker } from "../../core/entities/worker";
import FormStyle from "../../components/common/form/FormStyle";
import PageTitle from "../../components/common/PageTitle";
import { InputSwitch } from "primereact/inputswitch";
import Card from "../../components/common/Card";
import CardTitle from "../../components/common/CardTitle";
import { BlockUI } from "primereact/blockui";
import { Tooltip } from "primereact/tooltip";

const CenteredLink = styled.div`
  display: flex;
  justify-content: right;
  align-items: left;
  margin-top: 30px;
  & div {
    color: #a960ee !important;
  }
`;

const TitleWrapper = styled.div`
  .ml-2 div:first-child {
    margin-top: 10px;
  }
`;

const CronInputStyled = styled(Cron)`
  justify-content: right;
  margin-right: 10px;
`;

const options = [
  {
    value: CronExpression.EVERY_DAY_AT_9AM,
    render: "פעם ביום",
  },

  {
    value: CronExpression.THREE_TIMES_A_WEEK,
    render: "שלוש פעמים בשבוע",
  },

  {
    value: CronExpression.TWO_TIMES_A_WEEK,
    render: "פעמיים ביום",
  },

  {
    value: CronExpression.EVERY_WEEK,
    render: "פעם בשבוע",
  },

  {
    value: CronExpression.EVERY_WEEKEND,
    render: "פעם בשבוע (סוף שבוע)",
  },

  {
    value: CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_NOON,
    render: "פעם בחודש",
  },
];

const Scheduler: React.FC = () => {
  const { websiteId } = useParams();
  const [worker, setWorker] = useRecoilState(workerState(websiteId as string));
  const methods = useForm<Worker>({ values: worker });

  const defaultCustomSchedule = useMemo(() => {
    const cronEx = methods.getValues("cronExpression");
    if (cronEx) {
      const ex = options.map((o) => o.value.toString());

      return !ex.includes(cronEx);
    }

    return false;
  }, [methods]);

  const [isCustomSchedule, setIsCustomSchedule] = useState(
    defaultCustomSchedule
  );

  const onSubmit: SubmitHandler<Worker> = useCallback(async (data: Worker) => {
    try {
      setWorker(data);
      await workerService.updateWorker(worker.id, data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const change = methods.watch("cronExpression");
  const disabledChange = methods.watch("isDisabled");

  useEffect(() => {
    methods.handleSubmit(onSubmit)();
  }, [change, disabledChange, methods, onSubmit]);

  return (
    <>
      <FormProvider {...methods}>
        <TitleWrapper className="flex justify-content-between align-items-center">
          <PageTitle
            title="נהל את לוח הזמנים של הכותב שלך"
            subtitle="קח שליטה על תזמון יצירת התוכן"
          />
          <div className="flex justify-content-between mb-3">
            <div className="flex align-items-center">
              <CardTitle title="הפעל תזמון" className="mb-0 ml-3" />
            </div>
            <div>
              <Controller
                name="isDisabled"
                control={methods.control}
                render={({ field, formState }) => (
                  <InputSwitch
                    checked={!field.value}
                    title="השבת את הכותב"
                    onChange={(e) => {
                      field.onChange(!e.value);
                    }}
                  />
                )}
              />
            </div>
          </div>
        </TitleWrapper>

        {disabledChange && (
          <Tooltip target=".blockedui" mouseTrack mouseTrackLeft={20} />
        )}
        <FormStyle
          className="blockedui"
          data-pr-tooltip="Enable scheduler first"
        >
          <BlockUI blocked={disabledChange}>
            <div className="grid">
              <div className="col-10">
                {isCustomSchedule ? (
                  <Controller
                    control={methods.control}
                    name="cronExpression"
                    render={({ field, formState }) => (
                      <CronInputStyled
                        value={field.value}
                        setValue={field.onChange}
                        allowedPeriods={["month", "week", "day"]}
                        allowedDropdowns={["period", "week-days", "hours"]}
                        humanizeValue
                      />
                    )}
                  />
                ) : (
                  <RadioGroup<Worker>
                    fieldName="cronExpression"
                    options={options}
                  />
                )}
              </div>
            </div>

            <CenteredLink>
              <Button
                onClick={() => setIsCustomSchedule(!isCustomSchedule)}
                arrowPlacement="right"
              >
                {isCustomSchedule
                  ? "או בחר לוח זמנים מוגדר מראש"
                  : "או קבע את לוח הזמנים שלך"}
              </Button>
            </CenteredLink>
          </BlockUI>
        </FormStyle>
      </FormProvider>
    </>
  );
};

export default Scheduler;
