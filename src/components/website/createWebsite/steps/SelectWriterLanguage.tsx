import { Dropdown } from "primereact/dropdown";
import { useController, useFormContext } from "react-hook-form";
import { CreateWebsiteRequestData } from "../../../../core/services/requests/createWebsite/createWebsiteRequestData";
import Preloader from "../../../common/Preloader";
import React from "react";
import languages from "../../../../core/constants/languages";

const SelectWriterLanguageNoSuspense: React.FC = () => {
  const { control, getValues, setValue } =
    useFormContext<CreateWebsiteRequestData>();

  const { field } = useController({
    control,
    name: "writer.language",
  });

  return (
    <div className="w-full">
      <label htmlFor="username">Content Writer Language</label>

      <div>
        <Dropdown
          options={languages}
          value={field.value}
          onChange={field.onChange}
          filter
        />
      </div>
    </div>
  );
};

const SelectWriterLanguage = () => (
  <React.Suspense fallback={<Preloader />}>
    <SelectWriterLanguageNoSuspense />
  </React.Suspense>
);

export default SelectWriterLanguage;
