import { Dialog } from "primereact/dialog";
import ModalHeader from "./ModalHeader";
import Avatar, { genConfig } from "react-nice-avatar";
import styled from "styled-components";
import Button from "../common/form/Button";
import { useState } from "react";
import InputStyle from "../common/form/InputStyle";
import { InputText } from "primereact/inputtext";
import { ReactComponent as SparklesIcon } from "../../assets/Icons/Sparkles.svg";

interface Props {
  onHide: () => void;
}

const avatar = genConfig();

const AvatarHairThick = styled(Avatar)`
  svg:nth-child(2) {
    path {
    }
    left: 0;
  }

  svg:nth-child(4) {
    path {
    }
    left: 0;
  }
`;

const AddCustomVoiceModal: React.FC<Props> = ({ onHide }) => {
  const [avatarConfig, setAvatarConfig] = useState(genConfig());

  const handleChangeImage = () => {
    setAvatarConfig(genConfig());
    // Run your getConfig() function here if needed
  };

  return (
    <Dialog
      // header="Publish Configurations"
      header={<ModalHeader OnClose={onHide} title={"Add custom voice"} />}
      closable={false}
      modal={false}
      visible
      position={"bottom-left"}
      style={{
        width: "45vw",
        height: "calc(100vh - 85px)",
        margin: "0",
        boxShadow: "none",
        borderRight: "solid 1px var(--border-color)",
        borderRadius: "0px",
        maxHeight: "100%",
      }}
      onHide={onHide}
      draggable={false}
      resizable={false}
    >
      <div className="flex w-full">
        <div className="flex align-items-center flex-column mr-4">
          <AvatarHairThick
            style={{ width: "6rem", height: "6rem" }}
            {...avatarConfig}
          />
          <Button className="pl-3" onClick={handleChangeImage}>
            change image
          </Button>
        </div>
        <InputStyle className="mt-3 ">
          <label htmlFor="">Name of the voice</label>
          <InputText></InputText>
        </InputStyle>
      </div>

      <Button arrowPlacement="right">Scan website & Analyze voice</Button>
    </Dialog>
  );
};

export default AddCustomVoiceModal;
