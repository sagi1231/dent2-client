import { Input } from "@mui/base";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { useState } from "react";
import { UserRole } from "../../core/types/userRole";
import Button from "../common/form/Button";
import FormStyle from "../common/form/FormStyle";
import InputStyle from "../common/form/InputStyle";
import ModalHeader from "./ModalHeader";
import { useController, useForm } from "react-hook-form";
import { InviteUserRequestData } from "../../core/services/requests/signup/inviteUserRequestData";
import RegexValidations from "../../core/validation/regexValidations";
import ErrorMessage from "../common/ErrorMessage";
import userService from "../../core/services/user.service";
import { toast } from "react-toastify";

interface Propse {
  onHide: () => void;
}

const AddTeammateModal: React.FC<Propse> = ({ onHide }) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm<InviteUserRequestData>();
  const { field } = useController({
    control,
    name: "role",
    defaultValue: UserRole.EDITOR,
  });

  const onSubmit = async () => {
    try {
      await userService.inviteUser(getValues());
      onHide();
      toast("המשתמש הוזמן", {
        type: "success",
      });
    } catch (err) {}
  };

  return (
    <Dialog
      // header="Publish Configurations"
      header={<ModalHeader OnClose={onHide} title={"הזמן אנשים"} right />}
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
      <FormStyle>
        <div className="grid">
          <div className="col-7">
            <label>אימייל</label>
            <InputText
              {...register("email", {
                maxLength: 40,
                pattern: {
                  value: RegexValidations.email,
                  message: "כתובת אימייל לא חוקית",
                },
              })}
              className={errors.email ? "p-invalid" : ""}
              placeholder="name@company.com"
            />
            {errors.email?.message && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <div className="col-5">
            <label htmlFor="">תפקיד</label>
            <Dropdown
              value={field.value}
              onChange={field.onChange}
              options={[
                {
                  label: "מנהל",
                  value: UserRole.ADMIN,
                },
                {
                  label: "עורך",
                  value: UserRole.EDITOR,
                },
                {
                  label: "צופה",
                  value: UserRole.VIEWER,
                },
              ]}
            />
          </div>
        </div>
        <small>חברי הצוות שלך יקבלו אימייל עם קישור להזמנה. </small>

        <div className="flex justify-content-between align-items-center mt-3">
          <div>{/* <Button icon={}>Add another user</Button> */}</div>
          <div className="flex justify-content-end">
            <Button onClick={handleSubmit(onSubmit)} primary>
              הזמן
            </Button>
          </div>
        </div>
      </FormStyle>
    </Dialog>
  );
};

export default AddTeammateModal;
