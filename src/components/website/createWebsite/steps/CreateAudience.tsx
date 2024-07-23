import { InputText } from "primereact/inputtext";
import React, { useEffect, useMemo, useState } from "react";
import FormStyle from "../../../common/form/FormStyle";
import { InputTextarea } from "primereact/inputtextarea";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../../../assets/Icons/PlusBorder.svg";
import { ReactComponent as RefreshIcon } from "../../../../assets/Icons/refresh.svg";
import RangeSlider from "../../../common/form/RangeSlider";
import Avatar, { genConfig } from "react-nice-avatar";
import { useController, useFormContext } from "react-hook-form";
import { CreateWebsiteRequestData } from "../../../../core/services/requests/createWebsite/createWebsiteRequestData";
import { Dropdown } from "primereact/dropdown";
import { GenderType } from "../../../../core/types/genderType";
import SelectKeywordsInput from "../../../keywords/SelectKeywordsInput";

const Title = styled.h2`
  color: var(--Main-TitleColor, #0a2540);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 1rem */
  letter-spacing: -0.03rem;
  margin-top: 10px;
`;

const Subtitle = styled.h3`
  margin-top: 10px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 0.875rem */
  letter-spacing: -0.02625rem;
`;

const UploadImage = styled.div`
  margin-top: 10px;
  width: 128px;
  height: 148px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed var(--border-color);
  flex-direction: column;
  gap: 10px;
  transition-duration: 0.05s;
  cursor: pointer;

  svg {
    width: 40px;
    height: 40px;
    fill: var(--border-color);
  }

  span {
    font-weight: bold;
    color: var(--border-color);
  }

  &:hover {
    border: 2px dashed var(--primary-color);
    svg {
      fill: var(--primary-color);
    }

    span {
      color: var(--primary-color);
    }
  }
`;

const AvatarHairThick = styled(Avatar)`
  svg:nth-child(2) {
    path {
    }
    left: 0;
  }

  svg:nth-child(4) {
    path {
    }
    left: 0;
  }
`;

const RefreshImage = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 1.25rem */
  letter-spacing: -0.03125rem;
  color: var(--primary-purple);

  svg {
    transition-duration: 0.2s;
  }
  &:hover {
    svg {
      transform: rotate(90deg);
    }
  }
`;

const AvatarContainer = styled.div`
  margin: 10px 0;
  display: flex;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  align-items: center;
  gap: 20px;
`;

const CreateAudience: React.FC = () => {
  const { register, formState, setValue, watch, control } =
    useFormContext<CreateWebsiteRequestData>();
  const handleSliderChange = (value: [number, number]) => {
    setValue("audience.minAge", value[0]);
    setValue("audience.maxAge", value[1]);
  };

  const { field: audienceImageField } = useController({
    control,
    name: "audience.imageProps",
  });

  const [refresh, setRefresh] = useState(false);

  const { field } = useController({
    control,
    name: "audience.gender",
  });

  const gender = watch("audience.gender");

  useEffect(() => {
    audienceImageField.onChange(
      genConfig({
        sex: gender === GenderType.FEMALE ? "woman" : "man",
      })
    );
  }, [gender, refresh]);

  return (
    <>
      <FormStyle>
        <div className="grid">
          <div className="col-12">
            <AvatarContainer>
              <AvatarHairThick
                style={{ width: "5rem", height: "5rem" }}
                {...audienceImageField.value}
              />
              <RefreshImage onClick={() => setRefresh(!refresh)}>
                <RefreshIcon />
                <span>רענון תמונה </span>
              </RefreshImage>
            </AvatarContainer>
          </div>
          <div className="col-6">
            <label htmlFor="username">שם הפרסונה</label>
            <InputText
              {...register("audience.name")}
              placeholder="איך הקהל שלכם נקרא?"
            ></InputText>
          </div>
          <div className="col-6">
            <label htmlFor="username">מגדר</label>
            <Dropdown
              onChange={(e) => field.onChange(e.value)}
              value={field.value}
              placeholder="בחרו את מגדר הקהל שלכם"
              options={[
                { label: "זכר", value: GenderType.MALE },
                { label: "נקבה", value: GenderType.FEMALE },
                { label: "הכל", value: GenderType.BOTH },
              ]}
            />
          </div>
          <div className="col-12">
            <label htmlFor="username">טווח גילאים</label>
            <br />
            <div>
              <RangeSlider
                min={10}
                max={65}
                step={5}
                defaultValue={[25, 45]}
                onChange={handleSliderChange}
              />
            </div>
          </div>
          <div className="col-12">
            <Title>מה נקודות הכאב של קהל היעד?</Title>
            <Subtitle>
              תארו את נקודות הכאב של קהל היעד שלכם הקשורים לעסק שלכם. הקישו על
              מקש Enter כדי לשמור את הטקסט.
            </Subtitle>
          </div>
          <div className="col-12">
            <label htmlFor="username">נקודות כאב ( לא חובה )</label>
            <SelectKeywordsInput<CreateWebsiteRequestData> fieldName="audience.painPoints"></SelectKeywordsInput>

            {/* <label htmlFor="username">המלצות:</label> */}
          </div>
        </div>
      </FormStyle>
    </>
  );
};

export default CreateAudience;
