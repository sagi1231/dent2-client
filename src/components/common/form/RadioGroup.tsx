import React, { useEffect, useState } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { Option } from "./types/option";

const RadioButtonGroupWrapper = styled.div`
  display: flex;
  column-gap: 10px;
  row-gap: 10px;
`;

interface Props<T> {
  options: Option[];
  fieldName: Path<T>;
  ColumnNumber?: "1" | "2" | "3" | "4" | "6" | "12";
  children?: JSX.Element | JSX.Element[] | string;
}

function getColumnClass(columnNumber?: Props<any>["ColumnNumber"]): string {
  switch (columnNumber) {
    case "1":
      return "col-12";
    case "2":
      return "col-6";
    case "3":
      return "col-4";
    case "4":
      return "col-3";
    case "6":
      return "col-2";
    case "12":
      return "col-1";
    default:
      return "col-4"; // Default to col-12 if no valid ColumnNumber is provided
  }
}

const RadioOptionWrapper = styled.div<{ isChecked?: boolean }>`
  position: relative;
  /* width: 210px; */
  min-height: 110px;
  border-radius: 12px;
  background: #f6f9fc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #515253;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.6px;
  text-transform: capitalize;
  padding: 10px 30px;
  text-align: center;
  cursor: pointer;
  border: 1px solid
    ${(props) =>
      props.isChecked
        ? "var(--primary-purple) !important"
        : "var(--border-color)"};
  position: relative;
  transition-duration: 0.1s;

  &:hover {
    border-color: var(--title-color);
  }

  & .checkedicon path {
    fill: ${(props) =>
      props.isChecked ? "var(--primary-purple) !important" : "white"};
  }
  & .checkedicon {
    position: absolute;
    left: 10px;
    top: 10px;
  }
`;

function RadioGroup<FormDataType extends FieldValues>({
  fieldName,
  options,
  ColumnNumber,
  children,
}: Props<FormDataType>) {
  const { control, setValue } = useFormContext();
  useEffect(() => {
    if (options.length === 1) {
      setValue(fieldName, options[0].value as any);
    }
  }, [options, fieldName]);
  return (
    <div className="grid">
      <Controller
        name={fieldName}
        control={control}
        rules={{
          required: true,
        }}
        render={({ fieldState, field }) => {
          return (
            <>
              {options.map((option: Option) => (
                <div
                  key={option.value}
                  className={getColumnClass(ColumnNumber)}
                >
                  <RadioOptionWrapper
                    className={`singleradio ${option.value} ${
                      option.value === field.value ? option.value : ""
                    }`}
                    onClick={() => field.onChange(option.value)}
                    isChecked={option.value === field.value}
                  >
                    <svg
                      className="checkedicon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 13 12"
                      fill="none"
                    >
                      <path
                        d="M5.6371 8.44536L9.57654 4.50592L8.70186 3.63124L5.6371 6.696L4.1454 5.20431L3.28429 6.07898L5.6371 8.44536ZM6.46027 11.5033C5.67276 11.5033 4.93254 11.3549 4.23961 11.0579C3.54669 10.7609 2.94226 10.3541 2.42634 9.83726C1.91043 9.32045 1.50405 8.71681 1.20722 8.02635C0.910382 7.3359 0.761963 6.59728 0.761963 5.8105C0.761963 5.01395 0.910441 4.26921 1.2074 3.57628C1.50435 2.88336 1.91052 2.27983 2.42591 1.7657C2.94131 1.25156 3.54456 0.845182 4.23568 0.546562C4.9268 0.247943 5.66613 0.0986328 6.45366 0.0986328C7.25097 0.0986328 7.99665 0.248187 8.6907 0.547295C9.38475 0.846403 9.98847 1.25234 10.5019 1.7651C11.0153 2.27786 11.4211 2.88027 11.7193 3.57234C12.0176 4.26439 12.1667 5.00925 12.1667 5.8069C12.1667 6.59565 12.0173 7.33642 11.7186 8.0292C11.4198 8.72198 11.0129 9.32578 10.4979 9.8406C9.98288 10.3554 9.38014 10.7613 8.68968 11.0581C7.99923 11.3549 7.25609 11.5033 6.46027 11.5033Z"
                        fill="white"
                      />
                    </svg>
                    {option.render}
                  </RadioOptionWrapper>
                </div>
              ))}
            </>
          );
        }}
      />
      {children}
    </div>
  );
}

export default RadioGroup;
