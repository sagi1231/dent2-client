import React, { useEffect, useMemo, useState } from "react";
import { Dialog } from "primereact/dialog";
import styled from "styled-components";
import PackageCard from "../packages/PackageCard";
import { packagesState } from "../../state/packagesState";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/userState";
import { PackageType } from "../../core/types/packageType";
import Button from "../common/form/Button";
import Link from "../common/Link";
import { InputSwitch } from "primereact/inputswitch";

const DialogTitle = styled.h1`
  color: var(--main-title-color, #0a2540);
  font-size: 38px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 4rem */
  letter-spacing: -0.1rem;
  text-align: center;
`;

const DialogSubtitle = styled.h2`
  color: var(--main-text-color, #425466);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 1.125rem */
  letter-spacing: -0.03375rem;
  margin-top: 15px;
  text-align: center;
`;

const CancelAnyTime = styled.h2`
  font-weight: 600;
  color: var(--main-text-color, #425466);
  font-size: 1rem;
  font-style: normal;
  text-align: center;
  margin: 20px 0;
`;

const PeriodSwitcherWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const SwitcherText = styled.div`
  color: var(--main-text-color, #425466);
  font-size: 0.96713rem;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.029rem;
  text-transform: capitalize;

  & span {
    color: var(--main-adder-pink, #f92b75);
    font-weight: 700;
  }
`;

const CardsWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 80vw;
  margin: auto;
`;

const CostSwitchWrapper = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;
  align-items: center;
`;

interface Props {
  onHide: () => void;
}

const UpgradePackage: React.FC<Props> = ({ onHide }) => {
  const packages = useRecoilValue(packagesState);
  const user = useRecoilValue(userState);

  const packagesFiltered = useMemo(
    () => packages.filter((p) => !p.hideOnUi),
    [packages]
  );

  return (
    <Dialog
      header={
        <HeaderWrapper>
          <DialogTitle>יש לנו מסלול שמתאים לך</DialogTitle>
          <DialogSubtitle>
            בחר את המסלול האידיאלי עבור אסטרטגיית התוכן שלך
          </DialogSubtitle>

          <CancelAnyTime>בטל בכל עת.</CancelAnyTime>

          {/* <CostSwitchWrapper>
            Monthly <InputSwitch checked /> Yearly
          </CostSwitchWrapper> */}
        </HeaderWrapper>
      }
      style={{
        width: "90vw",
      }}
      visible
      onHide={() => onHide()}
      draggable={false}
      modal={true}
      resizable={false}
    >
      <Wrapper>
        {/* <PeriodSwitcherWrapper>
        <SwitcherText>
          <span>Save 20% </span>
          with annual
        </SwitcherText>
      </PeriodSwitcherWrapper> */}
        <CardsWrapper className="mt-3">
          {packagesFiltered.map((p, i) => (
            <PackageCard
              isSelected={
                user.company.Subscription.isActive &&
                user.company.Subscription.type === p.type
              }
              isFreeTrial={user.company.Subscription.type === PackageType.TRIAL}
              packageInfo={p}
              companyId={user.companyId}
              showChecks={false}
              color={
                i === 0
                  ? "purple"
                  : i === 1
                  ? "pink"
                  : i === 2
                  ? "yellow"
                  : "purple"
              }
            />
          ))}
          <Link differentTab global path="https://ghostwrites.ai/pricing/">
            <Button arrowPlacement="right" textColor="purple">
              השוו בין כל התוכניות{" "}
            </Button>
          </Link>
        </CardsWrapper>
      </Wrapper>
    </Dialog>
  );
};

export default UpgradePackage;
