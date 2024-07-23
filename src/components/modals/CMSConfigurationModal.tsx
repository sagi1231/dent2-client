import { Dialog } from "primereact/dialog";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { useCallback, useEffect, useState } from "react";
import Card from "../common/Card";
import CardTitle from "../common/CardTitle";
import { useParams } from "react-router";
import { publishIntegrationState } from "../../state/publishIntegrationState";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { PublishIntegration } from "../../core/entities/publishIntegration";
import { publisherService } from "../../core/services/publisher.service";
import { throttle } from "lodash";
import ModalHeader from "./ModalHeader";

interface Propse {
  onHide: () => void;
}

const CMSConfigurationModal: React.FC<Propse> = ({ onHide }) => {
  const [syncCheckState, setSyncCheckState] = useState(true);
  const { websiteId } = useParams();

  const [publishIntegration, setPublishIntegration] = useRecoilState(
    publishIntegrationState(websiteId as string)
  );

  const onSubmit: SubmitHandler<PublishIntegration> = async (
    data: PublishIntegration
  ) => {
    try {
      setPublishIntegration(data);
      await publisherService.updatePublishIntegrationById(data.id, data);
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
  }, [methods, submitDebounced, ...watchValues]);

  return (
    <Dialog
      // header="Publish Configurations"
      header={
        <ModalHeader OnClose={onHide} title={"Publish Configurations"} right />
      }
      closable={false}
      modal={false}
      visible
      position={"bottom-right"}
      style={{
        width: "28vw",
        height: "calc(100vh - 85px)",
        margin: "0",
        boxShadow: "none",
        borderLeft: "solid 1px var(--border-color)",
        borderRadius: "0px",
        maxHeight: "100%",
      }}
      onHide={onHide}
      draggable={false}
      resizable={false}
    >
      <FormProvider {...methods}>
        <form>
          <Card className="mb-4">
            <div className="flex justify-content-between mb-3">
              <div className="flex align-items-center">
                <CardTitle
                  title="Auto sync with selected CMS"
                  className="mb-0"
                />
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
              Enabling this will automaticlly sync every generated blog post
              with your <strong>active CMS</strong>.
            </small>
          </Card>
          <Card className="mb-4">
            <div className="flex justify-content-between mb-3">
              <div className="flex align-items-center">
                <CardTitle title="Upload as draft" className="mb-0" />
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
              When the toggle is turned on, indicating "Upload as draft" the
              content <strong>remains unpublished</strong> and is only visible
              to authorized users with editing privileges.
            </small>
          </Card>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default CMSConfigurationModal;
