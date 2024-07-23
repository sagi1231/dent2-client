import { useEffect, useMemo, useState } from "react";
import {
  FieldValues,
  useForm,
  DeepPartial,
  DefaultValues,
} from "react-hook-form";
import FormStepType from "../components/common/form/types/formStepType";

function useMultiStepForm<FormType extends DeepPartial<FieldValues>>(
  steps: FormStepType<FormType>[],
  onSubmitCallback: any,
  initialValues?: DefaultValues<FormType>
) {
  const [activeStep, setActiveStep] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(33.5);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<FormType>({
    defaultValues: initialValues,
  });

  const watchValues = methods.watch(steps[activeStep].fields as any);

  const progressUnit = useMemo(() => 100 / steps.length, []);

  useEffect(() => {
    methods.trigger(steps[activeStep].fields);
  }, [...watchValues, activeStep]);

  const component = useMemo(() => steps[activeStep].component, [activeStep]);

  const navigateNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
    setProgressPercentage((prevPercentage) => prevPercentage + progressUnit);
  };

  const navigatePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setProgressPercentage((prevPercentage) => prevPercentage - progressUnit);
  };

  const onClickNextButton = async () => {
    if (methods.formState.isValid) {
      if (activeStep < steps.length - 1) {
        navigateNextStep();
      } else {
        await onSubmitCallback();
      }
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmitCallback();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    methods,
    activeStep,
    progressPercentage,
    isLoading,
    showBackButton: activeStep > 0,
    component,
    onClickNextButton,
    onSubmit,
    navigateNextStep,
    navigatePrevStep,
  };
}
export default useMultiStepForm;
