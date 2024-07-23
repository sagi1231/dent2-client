import styled from "styled-components";
import { ReactComponent as SparklesIcon } from "../../assets/Icons/Sparkles.svg";
import Button from "../common/form/Button";
import PackageIncludes from "./PackageIncludes";
import { useEffect, useMemo, useState } from "react";
import { packagesState } from "../../state/packagesState";
import { useRecoilState, useRecoilValue } from "recoil";
import { Package } from "../../core/entities/package";
import { PackageType } from "../../core/types/packageType";
import AppConfig from "../../config/appConfig";
import { Theme } from "../../core/theme/theme";
import { Color } from "../../core/theme/types/color";
import { Divider } from "primereact/divider";
import { subscriptionService } from "../../core/services/subscription.service";
import { toast } from "react-toastify";
import { userState } from "../../state/userState";
import Badge from "../common/Badge";

interface Props {
  children?: JSX.Element | JSX.Element[];
  color: Color;
  packageInfo: Package;
  companyId: string;
  showChecks?: boolean;
  isSelected?: boolean;
  isFreeTrial?: boolean;
}

// const getColorBasedOnProp = (color: Color) => {
//   switch (color) {
//     case "purple":
//       return "#a960ee";
//     case "pink":
//       return "#ff6b8a";
//     case "orange":
//       return "#ffab70";
//     default:
//       return "#a960ee";
//   }
// };

const CardWrapper = styled.div`
  box-shadow: -10px 10px 20px -5px rgba(0, 0, 0, 0.1);
  width: 31%;
  border-radius: 6px;
  border: 1px solid var(--input-border-color, #e6e6e6);
  background: #fff;
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex-shrink: 0;
`;

const CardTitle = styled.div<{ color: Color }>`
  color: ${(props) => Theme.colors[props.color]};
  display: flex;

  gap: 10px;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 1rem */
  letter-spacing: -0.03rem;
  text-transform: capitalize;
  & svg {
    width: 1rem;
    height: 1rem;

    & path {
      fill: ${(props) => Theme.colors[props.color]};
    }
  }
`;

const CardDesc = styled.div`
  color: var(--e-global-color-accent);
  font-family: "Lato", Sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.7px;
`;

const PriceTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const PriceDesc = styled.div`
  color: var(--e-global-color-text);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.4px;
`;

const Price = styled.div<{ color: Color }>`
  color: ${(props) => Theme.colors[props.color]};
  font-size: 3rem;
  font-weight: 600;

  line-height: 100%; /* 2rem */
  letter-spacing: -0.06rem;
  display: flex;

  & span {
    color: ${(props) => Theme.colors[props.color]};
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 0.30463rem */
    letter-spacing: -0.00913rem;
    margin-top: 5px;
    margin-right: 5px;
  }
`;

const FreeTrialText = styled.div`
  color: #000;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 0.625rem */
  letter-spacing: -0.01875rem;
`;

const ButtonStyling = styled(Button)<{ color: Color }>`
  padding: 16px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${(props) => Theme.colors[props.color]};
`;

const PricePerArticle = styled.div<{ color: Color }>`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => Theme.colors[props.color]};
  letter-spacing: -0.3px;
`;

const PackageCard: React.FC<Props> = ({
  color,
  packageInfo,
  companyId,
  showChecks,
  isFreeTrial,
  isSelected,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const isCustom = useMemo(
    () => packageInfo.type === PackageType.CUSTOM,
    [packageInfo.type]
  );

  const onPackageClick = async () => {
    setIsLoading(true);
    try {
      const res = await subscriptionService.buySubscription(packageInfo.type);
      if (res.isDone && res.subscription) {
        toast("Package Changed Successfully!", {
          type: "success",
        });
        setUser({
          ...user,
          company: {
            ...user.company,
            Subscription: res.subscription,
          },
        });
      } else if (res.redirectUrl) {
        window.location.replace(res.redirectUrl);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const articlesPerMonth = Number(packageInfo.bullets[0].replace(/\D/g, ""));
  const costPerArticle = (packageInfo.monthlyCost / articlesPerMonth).toFixed(
    2
  );

  return (
    <CardWrapper>
      <div className="flex justify-content-between align-items-center w-full">
        <CardTitle color={color}>
          <SparklesIcon />
          {packageInfo.name}
        </CardTitle>
        {isFreeTrial && (
          <Badge bgColor="bg" textColor="title" large>
            3 הפוסטים הראשונים בחינם
          </Badge>
        )}
      </div>
      {/* <CardDesc>{packageInfo.description}</CardDesc> */}

      <div className="flex justify-content-between w-full align-items-center">
        <PriceTextWrapper>
          <Price color={color}>
            {isCustom ? "מותאם אישית" : "₪" + packageInfo.monthlyCost}
          </Price>

          {!isCustom && <PriceDesc>/ חודש </PriceDesc>}
        </PriceTextWrapper>
        {!isCustom && (
          <PricePerArticle color={color}>
            {costPerArticle}₪ / מאמר
          </PricePerArticle>
          // <Badge bgColor="title" large>
          //   <>{costPerArticle}$ / article</>
          // </Badge>
        )}
      </div>

      {showChecks === false && (
        <PackageIncludes bullets={packageInfo.bullets} />
      )}

      {isSelected ? (
        <ButtonStyling
          color={color}
          onClick={onPackageClick}
          arrowPlacement="right"
          primary
          disabled
        >
          Selected
        </ButtonStyling>
      ) : isCustom ? (
        <ButtonStyling
          fullWidth
          color={color}
          onClick={() =>
            (document.location.href = "https://ghostwrites.ai/how-it-works/")
          }
          arrowPlacement="right"
          primary
        >
          צור קשר{" "}
        </ButtonStyling>
      ) : (
        <ButtonStyling
          fullWidth
          color={color}
          onClick={onPackageClick}
          arrowPlacement="right"
          primary
          loading={isLoading}
        >
          שדרג עכשיו{" "}
        </ButtonStyling>
      )}
    </CardWrapper>
  );
};

export default PackageCard;
