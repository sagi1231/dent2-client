import styled from "styled-components";
import CardTitle from "../common/CardTitle";
import { ReactComponent as ReplaceIcon } from "../../assets/Icons/Replace.svg";
import { ReactComponent as DeleteIcon } from "../../assets/Icons/Delete.svg";
import { ReactComponent as ViewIcon } from "../../assets/Icons/Views.svg";

import { InputTextarea } from "primereact/inputtextarea";
import FormStyle from "../common/form/FormStyle";
import { InputText } from "primereact/inputtext";
import { Chips } from "primereact/chips";
import { useState } from "react";
import FeaturedImg from "../../assets/images/card-bg.png";
import { Article } from "../../core/entities/article";
import InputStyle from "../common/form/InputStyle";
import { Controller, useFormContext } from "react-hook-form";
import Badge from "../common/Badge";
import React from "react";
import Card from "../common/Card";
import Rating from "./sideBarComponents/Rating";

const ImageHover = styled.div`
  display: flex;
  position: absolute;
  gap: 20px;
  width: 100%;
  bottom: 20px;
  right: 20px;
  justify-content: start;
  flex-direction: row;

  svg {
    width: 12px;
    height: 12px;
    fill: var(--title-color);
  }
`;

const ChipsStyle = styled(Chips)`
  margin-top: 10px;
  width: 100%;
  input {
    border: none !important;
    height: 25px;
  }

  ul {
    border-radius: 12px;
    width: 100%;
    box-shadow: none !important;
    border-color: var(--border-color) !important;
  }

  /* .p-chips .p-chips-multiple-container:not(.p-disabled).p-focus {
    box-shadow: none !important;
  } */
`;
const IconButton = styled.div`
  cursor: pointer;
  width: 35px;
  border-radius: 50%;
  height: 35px;
  display: flex;
  /* padding: 10px; */
  background: white;
  align-items: center;
  justify-content: center;
  background: white;
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const FeaturedImageWrapper = styled.div`
  position: relative;
`;

const SideBar = styled.div`
  width: 100%;
  padding: 20px 20px;
  border-right: 1px solid #e2e8f0;
  height: calc(100vh - 85px);
  overflow-y: auto;

  /* position: fixed; */
`;

const ArticleEditorSidebar: React.FC = () => {
  const { getValues, setValue, register, control } = useFormContext<Article>();

  return (
    <SideBar>
      {/* <Rating /> */}
      <div>
        <CardTitle title="תמונה מצורפת"></CardTitle>
        <FeaturedImageWrapper>
          <FeaturedImage src={getValues("imageSrc")} />
          <ImageHover>
            {/* <IconButton>
              <DeleteIcon />
            </IconButton>
            <IconButton>
              <ReplaceIcon />
            </IconButton> */}
            <IconButton
              onClick={() => (document.location.href = getValues("imageSrc"))}
            >
              <ViewIcon />
            </IconButton>
          </ImageHover>
        </FeaturedImageWrapper>

        <CardTitle title="מאמר" className="mt-5"></CardTitle>
        <label>כותרת</label>
        <InputTextarea
          style={{ fontWeight: "bold" }}
          autoResize
          {...register("title")}
        />

        <label className="mt-3 block">קטגוריה</label>
        <InputText {...register("category")} placeholder="בישול" />

        <label className="mt-3 block">תגים</label>
        <Controller
          control={control}
          name="tags"
          render={({ field }) => {
            return (
              <ChipsStyle
                separator=","
                placeholder="הוסף תגיות למאמר"
                value={field.value}
                onChange={(event) => {
                  field.onChange(event.value);
                }}
              />
            );
          }}
        />

        <CardTitle title="תגיות מטא" className="mt-5"></CardTitle>
        <label>כותרת</label>
        <InputTextarea
          autoResize
          {...register("metadata.metatags.title")}
          placeholder="תיאור כותרת"
        />

        <label className="mt-3 block">תיאור</label>
        <InputTextarea
          {...register("metadata.metatags.description")}
          placeholder="תיאור המאמר"
        ></InputTextarea>
      </div>
    </SideBar>
  );
};

export default React.memo(ArticleEditorSidebar);
