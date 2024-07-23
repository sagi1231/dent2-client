import styled from "styled-components";
import RadioGroup from "../common/form/RadioGroup";
import Avatar, { genConfig } from "react-nice-avatar";
import { ToneType } from "../../core/types/toneType";
import { FieldValues, Path } from "react-hook-form";
import Badge from "../common/Badge";

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

const educational = genConfig({
  sex: "woman",
  faceColor: "#e8b9a9",
  earSize: "small",
  eyeStyle: "circle",
  noseStyle: "round",
  mouthStyle: "peace",
  shirtStyle: "polo",
  glassesStyle: "square",
  hairColor: "#efdaa5",
  hairStyle: "womanShort",
  hatStyle: "none",
  eyeBrowStyle: "up",
  shirtColor: "#ffffff",
  bgColor: "var(--primary-purple)",
});

const conversational = genConfig({
  sex: "man",
  faceColor: "#a27568",
  earSize: "small",
  eyeStyle: "circle",
  noseStyle: "short",
  mouthStyle: "laugh",
  shirtStyle: "short",
  glassesStyle: "round",
  hairColor: "#000",
  hairStyle: "thick",
  hatStyle: "none",
  hatColor: "#77311D",
  eyeBrowStyle: "up",
  shirtColor: "#ffffff",
  bgColor: "var(--lightblue)",
});

const entertaining = genConfig({
  sex: "man",
  faceColor: "#d9ac9f",
  earSize: "small",
  eyeStyle: "circle",
  noseStyle: "short",
  mouthStyle: "laugh",
  shirtStyle: "hoody",
  glassesStyle: "round",
  hairColor: "#000",
  hairStyle: "mohawk",
  hatStyle: "beanie",
  hatColor: "#ea9743",
  eyeBrowStyle: "up",
  shirtColor: "#ffffff",
  bgColor: "var(--yellow)",
});

const engaging = genConfig({
  sex: "woman",
  faceColor: "#d9ac9f",
  earSize: "small",
  eyeStyle: "circle",
  noseStyle: "short",
  mouthStyle: "smile",
  shirtStyle: "hoody",
  glassesStyle: "round",
  hairColor: "#eabd55",
  hairStyle: "womanLong",
  hatColor: "#ea9743",
  eyeBrowStyle: "up",
  shirtColor: "#ffffff",
  bgColor: "var(--pink)",
});

const inspirational = genConfig({
  sex: "woman",
  faceColor: "#e99179",
  earSize: "small",
  eyeStyle: "circle",
  noseStyle: "short",
  mouthStyle: "peace",
  shirtStyle: "hoody",
  glassesStyle: "round",
  hairColor: "#eabd55",
  hairStyle: "womanLong",
  hatStyle: "turban",
  hatColor: "#ffffff",
  eyeBrowStyle: "up",
  shirtColor: "#ffffff",
  bgColor: "var(--title-color)",
});

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

const BadgeWrapper = styled.div`
  z-index: 22;
  position: absolute;
  left: 50%;
  top: 0px;
  transform: translate(-50%, -50%);
`;

function Tone<FormDataType extends FieldValues>(props: Props<FormDataType>) {
  return (
    <>
      <Wrapper>
        <RadioWrapper>
          <RadioGroup<FormDataType>
            ColumnNumber={props.threeColumn ? "4" : "6"}
            fieldName={props.fieldName}
            options={[
              {
                value: ToneType.CONVERSATIONAL,
                render: (
                  <>
                    <InsideRadio className="insideradio">
                      <BadgeWrapper>
                        <Badge bgColor="purple">מומלץ</Badge>
                      </BadgeWrapper>
                      <AvatarHairThick
                        style={{ width: "5rem", height: "5rem" }}
                        {...educational}
                      />
                      <span>שיחה</span>
                    </InsideRadio>
                  </>
                ),
              },
              {
                value: ToneType.EDUCATIONAL,
                render: (
                  <>
                    <InsideRadio className="insideradio">
                      <AvatarHairThick
                        style={{ width: "5rem", height: "5rem" }}
                        {...conversational}
                      />
                      חינוכי
                    </InsideRadio>
                  </>
                ),
              },
              {
                value: ToneType.ENTERTAINING,
                render: (
                  <>
                    <InsideRadio className="insideradio fuck">
                      <AvatarHairThick
                        style={{ width: "5rem", height: "5rem" }}
                        {...entertaining}
                      />
                      <span>משעשע</span>
                    </InsideRadio>
                  </>
                ),
              },
              {
                value: ToneType.ENGAGING,
                render: (
                  <>
                    <InsideRadio className="insideradio fuck">
                      <AvatarHairThick
                        style={{ width: "5rem", height: "5rem" }}
                        {...engaging}
                      />
                      <span>מרתק</span>
                    </InsideRadio>
                  </>
                ),
              },

              // {
              //   value: ToneType.INSPIRATIONAL,
              //   render: (
              //     <>
              //       <InsideRadio className="insideradio fuck">
              //         <AvatarHairThick
              //           style={{ width: "5rem", height: "5rem" }}
              //           {...inspirational}
              //         />
              //         <span>Inspirational</span>
              //       </InsideRadio>
              //     </>
              //   ),
              // },
            ]}
          />
        </RadioWrapper>
      </Wrapper>
    </>
  );
}

export default Tone;
