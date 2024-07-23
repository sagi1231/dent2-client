import { Controller, useFormContext } from "react-hook-form";
import { TriggerWorkerRequestData } from "../../../../core/services/requests/worker/triggerWorkerRequestData";
import Card from "../../../common/Card";
import { InputSwitch } from "primereact/inputswitch";
import CardTitle from "../../../common/CardTitle";

const EnableCMS = () => {
  const { control } = useFormContext<TriggerWorkerRequestData>();

  return (
    <>
      <Card className="mb-4">
        <div className="flex justify-content-between mb-3">
          <div className="flex align-items-center">
            <CardTitle title="Publish to CMS when done" className="mb-0" />
          </div>
          <div>
            <Controller
              control={control}
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
          Enabling this will sync the generated blog post with your{" "}
          <strong>active CMS</strong>.
        </small>
      </Card>
      <Card className="mb-4">
        <div className="flex justify-content-between mb-3">
          <div className="flex align-items-center">
            <CardTitle title="Upload as draft" className="mb-0" />
          </div>
          <div>
            <Controller
              control={control}
              name="publishAsDraft"
              render={({ field }) => (
                <InputSwitch
                  checked={!!field.value}
                  onChange={(v) => field.onChange(v.value)}
                />
              )}
            />
          </div>
        </div>

        <small className="block">
          When the toggle is turned on, indicating "Upload as draft" the content{" "}
          <strong>remains unpublished</strong> and is only visible to authorized
          users with editing privileges.
        </small>
      </Card>
    </>
  );
};

export default EnableCMS;
