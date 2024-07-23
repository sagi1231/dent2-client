import { InputText } from "primereact/inputtext";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { CreateWebsiteRequestData } from "../../../../core/services/requests/createWebsite/createWebsiteRequestData";
import RegexValidations from "../../../../core/validation/regexValidations";
import Badge from "../../../common/Badge";
import Preloader from "../../../common/Preloader";
import Goals from "../../../writerSettings/Goals";

const TextInsideInput = styled.div`
  position: relative;
  margin-top: 10px;
  & input {
    margin-top: 0;
    padding-left: 100px;
  }
`;

const ChooseWriterGoal: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateWebsiteRequestData>();

  return (
    <div className="relative">
      <Goals<CreateWebsiteRequestData>
        fieldName="writer.goal"
        threeColumn
      ></Goals>
    </div>
  );
};

export default ChooseWriterGoal;
