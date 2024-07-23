import styled from "styled-components";
import { ReactComponent as LogoIcon } from "../../assets/Logo/BlackIcon.svg";
import { ReactComponent as PromotionIcon } from "../../assets/Icons/Promotion.svg";
import { ReactComponent as InformativeIcon } from "../../assets/Icons/Infoformative.svg";
import { ReactComponent as InfoIcon } from "../../assets/Icons/Info.svg";
import { ReactComponent as HardSellerIcon } from "../../assets/Icons/HardSeller.svg";
import RadioGroup from "../common/form/RadioGroup";
import { Tooltip } from "primereact/tooltip";
import Badge from "../common/Badge";
import Card from "../common/Card";
import CardTitle from "../common/CardTitle";
import { Writer } from "../../core/entities/writer";
import { GoalType } from "../../core/types/goalType";
import { FieldValues, Path } from "react-hook-form";

interface Props<T> {
  threeColumn?: boolean;
  fieldName: Path<T>;
}

const InsideRadio = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  padding: 25px;
  position: relative;

  .infoicon {
    width: 14px;
    height: 14px;
    right: -27px;
    top: 0;
    path {
      fill: #bdc7ca !important;
    }
  }
`;

const RadioWrapper = styled.div`
  position: relative;
  .singleradio {
    background: white;
  }

  span {
    color: var(--title-color);
  }

  .insideradio .mainicon {
    width: 30px;
    height: 30px;
    path {
      fill: var(--title-color);
    }
  }
`;

const TooltipTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    width: 20px;
    height: 20px;
  }
  span {
    font-weight: 600;
    color: var(--title-color);
  }
`;

const TemplateLibrary = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border: 1.5px solid #0a2540;
  min-height: 100%;
  padding: 10px 30px;
  color: #515253;

  font-size: 20px;
  font-weight: 700;
  position: relative;
  border-radius: 12px;
  z-index: inherit;
  cursor: pointer;

  &:before {
    content: "";
    background: white;
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: -7px;
    right: -7px;
    border: 1.5px solid #0a2540;
    border-radius: 12px;
    transition-duration: 0.1s;
  }

  &:after {
    content: "";
    z-index: -2;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: -14px;
    right: -14px;
    border: 1.5px solid #0a2540;
    border-radius: 12px;
    transition-duration: 0.1s;
  }

  &:hover {
    &:before {
      bottom: -10px;
      right: -10px;
    }
  }

  &:hover {
    &:after {
      bottom: -20px;
      right: -20px;
    }
  }
`;

const BadgeWrapper = styled.div`
  z-index: 22;
  position: absolute;
  left: 50%;
  top: -15px;
  transform: translate(-50%, -50%);
`;

function Goals<FormDataType extends FieldValues>(props: Props<FormDataType>) {
  return (
    <RadioWrapper>
      <Tooltip target=".infoicon.conversion2">
        <div className="p-4">
          <TooltipTitle>
            <PromotionIcon />
            <span>יצירת עניין</span>
          </TooltipTitle>
          <small>
            <br />
            עניין לקוחות על ידי הצגת מידע. <br />
            אשר מוביל בעדינות למסקנה שהמוצר שלך <br />
            הוא הפתרון הטוב ביותר לצרכים שלהם.{" "}
          </small>
          <br />
          <div className="flex mt-4">
            <Badge bgColor="purple">הדגשת ערך המוצר</Badge>
          </div>
        </div>
      </Tooltip>

      <Tooltip target=".infoicon.info2">
        <div className="p-4">
          <TooltipTitle>
            <InformativeIcon />
            <span>יעד מידע</span>
          </TooltipTitle>

          <small>
            <br />
            ספק מידע חשוב, טיפים ומדריכים שלב אחר שלב <br />
            ללמד ולסייע לקהל שלך.{" "}
          </small>
          <br />
          <div className="flex mt-4">
            <div className="mr-2">
              <Badge bgColor="purple">מדריכם</Badge>
            </div>
            <div className="mr-2">
              <Badge bgColor="purple">טיפים</Badge>
            </div>
            <div className="mr-2">
              <Badge bgColor="purple">שלב אחר שלב</Badge>
            </div>
          </div>
        </div>
      </Tooltip>

      <Tooltip target=".infoicon.seller2">
        <div className="p-4">
          <TooltipTitle>
            <HardSellerIcon />
            <span>Seller goal</span>
          </TooltipTitle>

          <small>
            <br />
            Highlight your product's unique features,
            <br />
            creating a compelling blog post <br />
            to drive immediate action.
          </small>
          <br />
          <div className="flex mt-4">
            <div className="mr-2">
              <Badge bgColor="purple">Promotional blog post</Badge>
            </div>
          </div>
        </div>
      </Tooltip>

      <RadioGroup<FormDataType>
        ColumnNumber={props.threeColumn ? "2" : "4"}
        fieldName={props.fieldName}
        options={[
          {
            value: GoalType.CONVERSION,
            render: (
              <>
                <InsideRadio className="insideradio">
                  <BadgeWrapper>
                    <Badge bgColor="purple">מומלץ</Badge>
                  </BadgeWrapper>
                  <PromotionIcon className="mainicon" />
                  <span>יצירת עניין</span>
                  <InfoIcon
                    className="infoicon conversion2"
                    data-pr-position="right"
                  />
                </InsideRadio>
              </>
            ),
          },
          {
            value: GoalType.INFORMATIVE,
            render: (
              <InsideRadio className="insideradio">
                <InformativeIcon className="mainicon" />
                <span>הצגת מידע</span>
                <InfoIcon className="infoicon info2" data-pr-position="right" />
              </InsideRadio>
            ),
          },
          // {
          //   value: GoalType.SELLER,
          //   render: (
          //     <InsideRadio className="insideradio">
          //       <HardSellerIcon className="mainicon" />
          //       <span>Seller</span>
          //       <InfoIcon
          //         className="infoicon seller2"
          //         data-pr-position="right"
          //       />
          //     </InsideRadio>
          //   ),
          // },
        ]}
      ></RadioGroup>
    </RadioWrapper>
  );
}

export default Goals;
