import { Dropdown } from "primereact/dropdown";

import { useEffect } from "react";
import {
  SubmitHandler,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
import { CreateWebsiteRequestData } from "../../../../core/services/requests/createWebsite/createWebsiteRequestData";
import Tone from "../../../writerSettings/Tone";
import languages from "../../../../core/constants/languages";

const SelectToneAndLanguage: React.FC = () => {
  const { control, getValues, setValue } =
    useFormContext<CreateWebsiteRequestData>();

  const { field } = useController({
    control,
    name: "writer.language",
  });
  return (
    <>
      <Tone<CreateWebsiteRequestData> fieldName="writer.tone" threeColumn />

      <div className="w-full mt-4">
        <label htmlFor="username">שפת כותב תוכן</label>
        <div>
          <Dropdown
            options={languages}
            value={field.value}
            onChange={field.onChange}
            filter
          />
        </div>
      </div>
    </>
  );
};

export default SelectToneAndLanguage;
