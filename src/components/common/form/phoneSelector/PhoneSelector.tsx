import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useMemo, useState } from "react";
import { Controller, Path, useFormContext } from "react-hook-form";
import styled from "styled-components";
import PhonePerfix from "./phonePerfix";

interface Phone<T> {
  name?: string;
  value?: string;
  fieldName?: Path<T>;
}

const InnerText = styled.div`
  position: absolute;
  top: 0%;
  padding-left: 20px;
  padding-right: 20px;
  color: rgb(10, 37, 64);
  font-size: 12px;
  font-weight: bold;
  height: 50px;
  display: flex;
  align-items: center;
  background: var(--light-bg);
  border: solid 1px var(--border-color);
  border-radius: 12px 0 0 12px;
  letter-spacing: -0.1px;
`;
const TextInsideInput = styled.div`
  position: relative;
  display: flex;
  margin-top: 10px;
  & input {
    margin-top: 0;
    border-radius: 0px 10px 10px 0px !important;
  }

  .p-dropdown {
    border-right: none !important;
    color: rgb(10, 37, 64);
    font-size: 12px;
    font-weight: bold;
    background: var(--light-bg);
    border: solid 1px var(--border-color);
    margin-top: 0 !important;
    border-radius: 10px 0 0 10px !important;
    box-shadow: none !important;
  }
`;

// ... (other imports)

interface Props {
  value?: string;
  onChange: (v: string) => void;
}

const PhoneSelector: React.FC<Props> = ({ value, onChange }) => {
  const val = useMemo(() => value || "", [value]);

  const start = useMemo(() => {
    return PhonePerfix.find((p) => val.startsWith(p.dial_code));
  }, [val]);

  const end = useMemo(
    () => val.substring(start?.dial_code.length ?? 0),
    [start?.dial_code.length, val]
  );

  const [selectedCountry, setSelectedCountry] = useState();

  const [phoneNumber, setPhoneNumber] = useState();

  return (
    <TextInsideInput className="phone-selector">
      <Dropdown
        value={start?.dial_code}
        onChange={(e: DropdownChangeEvent) => {
          console.log(`${e.value || ""}${end}`);
          onChange(`${e.value || ""}${end}`);
        }}
        options={PhonePerfix}
        optionLabel="fullName"
        optionValue="dial_code"
        placeholder="Select a Country"
        filter
        filterBy="name"
        className="w-full md:w-14rem"
      />

      <InputText
        onChange={(v) => {
          console.log(`${start?.dial_code || ""}${v.target.value}`);
          onChange(`${start?.dial_code || ""}${v.target.value}`);
        }}
        value={end}
      />
    </TextInsideInput>
  );
};

export default PhoneSelector;
