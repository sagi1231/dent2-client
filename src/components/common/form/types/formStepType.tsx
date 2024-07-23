import { Path } from "react-hook-form";

interface FormStepType<Fields> {
  title?: string;
  subtitle?: string;
  component: React.ReactElement;
  fields: Path<Fields>[];
  nextButtonText?: string;
}

export default FormStepType;
