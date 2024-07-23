import { Input } from "@mui/base";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { useState } from "react";
import Button from "../common/form/Button";
import FormStyle from "../common/form/FormStyle";
import InputStyle from "../common/form/InputStyle";
import ModalHeader from "./ModalHeader";
import { ReactComponent as PlusIcon } from "../../assets/Icons/Plus.svg";

interface Props {
  onHide: () => void;
}

const AddWebsiteUrl: React.FC<Props> = ({ onHide }) => {
  const [blockingMethod, setBlockingMethod] = useState("entireWebsite");

  return (
    <Dialog
      // header="Publish Configurations"
      header={<ModalHeader OnClose={onHide} title={"Add Website URL"} right />}
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
      <>
        <FormStyle>
          <label>Enter URL</label>
          <InputText />

          <label className="block mt-4" htmlFor="language">
            Choose method
          </label>
          <div className="mt-3">
            <div className="flex align-items-center">
              <RadioButton
                inputId="entireWebsite"
                name="entireWebsite"
                value="entireWebsite"
                onChange={(e: RadioButtonChangeEvent) => {
                  setBlockingMethod(e.value);
                }}
                checked={blockingMethod === "entireWebsite"}
              />
              <label htmlFor="entireWebsite" className="ml-2">
                Block the entire website
              </label>
            </div>
            <div className="flex align-items-center mt-3">
              <RadioButton
                inputId="specific"
                name="specific"
                value="specific"
                onChange={(e: RadioButtonChangeEvent) => {
                  setBlockingMethod(e.value);
                }}
                checked={blockingMethod === "specific"}
              />
              <label htmlFor="specific" className="ml-2">
                Block a specific URL
              </label>
            </div>
            <div className="flex align-items-center mt-3">
              <RadioButton
                inputId="specific"
                name="specific"
                value="specific"
                onChange={(e: RadioButtonChangeEvent) => {
                  setBlockingMethod(e.value);
                }}
                checked={blockingMethod === "specific"}
              />
              <label htmlFor="specific" className="ml-2">
                Promote URL
              </label>
            </div>
          </div>
          <div className="flex justify-content-end mt-3">
            <Button icon={<PlusIcon />} primary>
              Add URL
            </Button>
          </div>
        </FormStyle>
      </>
    </Dialog>
  );
};

export default AddWebsiteUrl;
