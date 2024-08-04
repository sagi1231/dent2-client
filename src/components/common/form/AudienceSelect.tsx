import styled from "styled-components";
import Avatar, { genConfig } from "react-nice-avatar";
import { FieldValues, Path } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { audienceState } from "../../../state/audienceState";
import { useParams } from "react-router";
import { useMemo } from "react";
import RadioGroup from "./RadioGroup";

interface Props<T> {
  threeColumn?: boolean;
  fieldName: Path<T>;
}

const InsideRadio = styled.div`
  gap: 25px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 25px;
  border-radius: 12px;
`;

const RadioWrapper = styled.div`
  .singleradio {
    background: white;
  }
  span {
    color: var(--title-color);
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const AddVoice = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0%, -50%);
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

function AudienceSelect<FormDataType extends FieldValues>(
  props: Props<FormDataType>
) {
  const { websiteId } = useParams();
  const audiences = useRecoilValue(audienceState(websiteId as string));

  return (
    <>
      <Wrapper>
        <RadioWrapper>
          <RadioGroup<FormDataType>
            ColumnNumber={"3"}
            fieldName={props.fieldName}
            options={options}
          />
        </RadioWrapper>
      </Wrapper>
    </>
  );
}

export default AudienceSelect;
