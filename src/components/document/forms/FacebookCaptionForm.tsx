import { useFormContext, useWatch } from "react-hook-form";
import styled from "styled-components";
import React, { useEffect, useState } from "react";

import {
  DocumentTypeFactory,
  DocumentEntityType,
  DocumentEntity,
} from "neword-core";

const SmallLabel = styled.label`
  font-family: "Assistant";
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%; /* 13.2px */
  letter-spacing: -0.36px;
`;

function FacebookCaptionForm() {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<
    DocumentEntity<DocumentEntityType.LINKEDIN_POST_CAPTION>
  >();

  const onEnter = async (caption: string) => {
    setValue("inputParams.description", caption);
  };
  return <div className="w-full"></div>;
}

export default FacebookCaptionForm;
