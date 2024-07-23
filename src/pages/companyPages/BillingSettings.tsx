import styled from "styled-components";
import Card from "../../components/common/Card";
import CardIconTitle from "../../components/common/CardIconTitle";
import { ReactComponent as MembershipIcon } from "../../assets/Icons/Membership.svg";
import PerferenceTabsNav from "../../components/website/PerferenceTabsNav";
import { packagesState } from "../../state/packagesState";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/userState";
import PackageCard from "../../components/packages/PackageCard";

const Title = styled.h1`
  font-size: 48px;
  margin-top: 10px;
  margin-bottom: 30px;
  color: #0a2540;
  font-weight: 700;
  line-height: 100%; /* 3rem */
  letter-spacing: -0.12rem;
`;

const Subtitle = styled.h2`
  color: #9aa8b6;
  margin: 0px;
  font-size: 12px;
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: 600;
  line-height: 100%;
`;

const BillingSettings: React.FC = () => {
  return (
    <>
      <Subtitle>Edit your User Preferences</Subtitle>
      <Title>Billing Information & Billing History</Title>
      <PerferenceTabsNav />
      <div className="grid">
        <div className="col-12">
          <Card>
            <CardIconTitle
              title={"Subscription Manage"}
              subTitle={"Set your account configurations"}
              icon={<MembershipIcon />}
            ></CardIconTitle>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BillingSettings;
