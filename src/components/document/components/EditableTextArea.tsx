import { Controller, Path, useFormContext } from "react-hook-form";
import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { documentState } from "../../../state/documentState";
import { useParams } from "react-router";

import { DocumentEntityType, DocumentEntity } from "neword-core";

const EditableInput = styled.textarea<{ isEditing: boolean }>`
  font-size: 12.21px;
  border: ${({ isEditing }) =>
    isEditing ? "1px solid var(--Input-BorderColor, #e6e6e6)" : "none"};
  background: transparent;
  outline: none;
  width: 100%;
  height: auto;
  font-family: inherit;
  resize: none;
  &:focus {
    outline: none;
  }
`;

interface Props<T extends DocumentEntityType> {
  isEditing: boolean;
  blockIndex: number;
  handleBlur?: (blockIndex: number) => void;
  fieldName: Path<DocumentEntity<T>>;
}

function EditableTextArea<T extends DocumentEntityType>({
  blockIndex,
  isEditing,
  handleBlur,
  fieldName,
}: Props<T>) {
  const { documentId } = useParams<{ documentId: string }>();

  const document = useRecoilValue(documentState(documentId as string));

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { control, watch } =
    useFormContext<DocumentEntity<typeof document.type>>();

  const [height, setHeight] = useState(14);

  const fieldValue = watch(fieldName);

  useEffect(() => {
    if (inputRef.current) {
      setHeight(inputRef.current.scrollHeight);
    }
  }, [fieldValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => {
        const value =
          typeof field.value === "string" || typeof field.value === "number"
            ? field.value
            : "";

        return (
          <EditableInput
            disabled={!isEditing}
            isEditing={isEditing}
            value={value}
            onBlur={() => {
              handleBlur && handleBlur(blockIndex);
              field.onBlur();
            }}
            onChange={field.onChange}
            ref={inputRef}
            style={{ height }}
            autoFocus
          />
        );
      }}
    />
  );
}

export default EditableTextArea;
