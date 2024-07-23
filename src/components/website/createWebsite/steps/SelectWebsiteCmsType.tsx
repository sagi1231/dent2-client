import { useFormContext } from "react-hook-form";
import { CreateWebsiteRequestData } from "../../../../core/services/requests/createWebsite/createWebsiteRequestData";
import styled from "styled-components";
import BigRadioGroup from "../../../common/form/RadioButton";
import React, { useEffect, useState } from "react";
import generatorService from "../../../../core/services/generator.service";
import RadioButton from "../../../common/form/RadioButton";
import { ReactComponent as WordpressIcon } from "../../../../assets/Icons/CMSIcons/Wordpress.svg";
import { ReactComponent as CustomIcon } from "../../../../assets/Icons/CMSIcons/Custom.svg";
import RadioGroup from "../../../common/form/RadioGroup";
import { IntegrationType } from "../../../../core/types/integrationType";
import { useSetRecoilState } from "recoil";
import { generateKeywordsByWebsiteState } from "../../../../state/generateKeywordsByWebsiteState";

const SelectWebsiteCmsType: React.FC = () => {
  const { register, getValues, setValue } =
    useFormContext<CreateWebsiteRequestData>();

  return (
    <RadioGroup<CreateWebsiteRequestData>
      fieldName="website.category"
      options={[
        {
          value: IntegrationType.WORDPRESS,
          render: <WordpressIcon />,
        },
        {
          value: IntegrationType.CUSTOM,
          render: <CustomIcon />,
        },
      ]}
    />
  );
};

export default SelectWebsiteCmsType;
