import styled from "styled-components";
import Card from "../../components/common/Card";
import CardIconTitle from "../../components/common/CardIconTitle";
import { ReactComponent as MembershipIcon } from "../../assets/Icons/Membership.svg";
import PerferenceTabsNav from "../../components/website/PerferenceTabsNav";
import { packagesState } from "../../state/packagesState";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/userState";
import PackageCard from "../../components/packages/PackageCard";
import { ReactComponent as GlobeIcon } from "../../assets/Icons/Globe.svg";
import Link from "../../components/common/Link";
import Button from "../../components/common/form/Button";
import CardSubtitle from "../../components/common/CardSubtitle";
import CardTitle from "../../components/common/CardTitle";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Badge from "../../components/common/Badge";
import { ReactComponent as ActionIcon } from "../../assets/Icons/ThreeDots.svg";
import { ReactComponent as CancelIcon } from "../../assets/Icons/Cancel.svg";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Menu } from "primereact/menu";
import { Divider } from "primereact/divider";
import FormStyle from "../../components/common/form/FormStyle";
import { InputText } from "primereact/inputtext";
import { websitesStateSelector } from "../../state/websitesState";
import { subscriptionService } from "../../core/services/subscription.service";
import { toast } from "react-toastify";
import TerminateSubscriptionModal from "../../components/modals/TerminateSubscriptionModal";
import { subscriptionDetailsState } from "../../state/subscriptionDetailsState";
import { PackageType } from "../../core/types/packageType";
import UpgradePackage from "../../components/modals/UpgradePackage";

const Title = styled.h1`
  font-size: 48px;

  color: #0a2540;
  font-weight: 700;
  line-height: 100%; /* 3rem */
  letter-spacing: -0.1rem;
`;

const Subtitle = styled.h2`
  color: #9aa8b6;
  margin-top: 10px;
  margin-bottom: 60px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const CardBigTitle = styled.h3`
  font-size: 28px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #0a2540;
  font-weight: 700;
  line-height: 100%; /* 3rem */
  letter-spacing: -0.12rem;
`;

const LinedIcon = styled.div`
  color: var(--text-color);
  font-size: 12px;
  display: flex;
  gap: 6px;
  align-content: center;
  align-items: center;

  & svg {
    fill: var(--text-color);
    width: 15px;
    height: 15px;
  }
`;

const Table = styled.div`
  display: flex;
  gap: 30px;
`;

const TableItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const TableItemTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--title-color);
`;
const TableItemContent = styled.div`
  font-size: 14px;
  color: var(--text-color);
`;

const IconButton = styled(Link)`
  position: absolute;
  right: 0px;
  top: 0px;
  color: #828282;
  font-size: 16px !important;
  transition-duration: 0.2s;
`;

const IconSizeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    width: 13px;
    height: 13px;
  }
`;

const LinkStyle = styled(Link)`
  color: var(--primary-purple: #a960ee) !important;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const EmptyMessageWrapper = styled.div`
  text-align: right;
  padding: 20px;
  font-weight: bold;
`;

const SubscriptionManage: React.FC = () => {
  const optionsMenu = useRef<Menu>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [upgradePackageModal, showUpgradePackageModal] = useState(false);
  const subscriptionDetails = useRecoilValue(subscriptionDetailsState);
  const user = useRecoilValue(userState);
  const subscription = user.company.Subscription;
  const packages = useRecoilValue(packagesState);
  const websites = useRecoilValue(websitesStateSelector);
  const selectedPackage = useMemo(
    () => packages.find((p) => p.type === user?.company?.Subscription?.type),
    [packages, user?.company?.Subscription?.type]
  );

  const menuItems = [
    {
      label: "Cancel Subscription",
      icon: "pi pi-fw pi-times-circle",
      command: () => setShowSubscriptionModal(true),
    },
  ];

  return (
    <>
      <Title>מסלולים וחיובים</Title>
      <Subtitle>נהל את המסלולים והחיובים שלך </Subtitle>
      {/* <PerferenceTabsNav /> */}
      <div className="grid">
        <div className="col-12">
          <div className="flex justify-content-between align-items-center mb-5">
            <div>
              <CardBigTitle>
                Neword - {selectedPackage?.name} Package
              </CardBigTitle>
              <div>
                <LinedIcon className="mb-2">
                  <GlobeIcon />
                  {websites.length}/{selectedPackage?.maxWebsites} אתרים
                </LinedIcon>
                {/* <small>
                    Learn how to connect and activate
                    <LinkStyle path="#" className="ml-1 text-purple-500">
                      here
                    </LinkStyle>
                  </small> */}
              </div>
            </div>
            <div className="">
              <Button
                onClick={() => showUpgradePackageModal(true)}
                primary
                arrowPlacement="right"
                bgColor="pink"
              >
                שדרג את מסלול שלך
              </Button>
            </div>
          </div>

          <Card className="mb-5">
            <div className="relative">
              {subscription.type !== PackageType.TRIAL &&
                subscription.isActive && (
                  <IconButton
                    onClick={(event) => optionsMenu.current?.toggle(event)}
                  >
                    <IconSizeWrapper>
                      <ActionIcon />
                    </IconSizeWrapper>
                    <Menu
                      model={menuItems}
                      popup
                      ref={optionsMenu}
                      id="popup_menu_right"
                    />
                  </IconButton>
                )}
            </div>

            <Table>
              <TableItem>
                <TableItemTitle>מחיר מסלול</TableItemTitle>
                <TableItemContent>
                  {selectedPackage?.monthlyCost}₪
                </TableItemContent>
              </TableItem>
              <TableItem>
                <TableItemTitle>תשלום אחרון</TableItemTitle>
                <TableItemContent>
                  {(subscriptionDetails?.createdAt &&
                    new Date(
                      subscriptionDetails.createdAt
                    ).toLocaleDateString()) ||
                    "-"}
                </TableItemContent>
              </TableItem>
              <TableItem>
                <TableItemTitle>התשלום הבא</TableItemTitle>
                <TableItemContent>
                  {subscriptionDetails?.nextPayment || "-"}
                </TableItemContent>
              </TableItem>
              <TableItem>
                <TableItemTitle>סטטוס מסלול</TableItemTitle>
                <TableItemContent>
                  {user?.company?.Subscription?.isActive ? (
                    <Badge bgColor={"purple"}>פעיל</Badge>
                  ) : (
                    <Badge bgColor={"danger"}>הסתיים</Badge>
                  )}
                </TableItemContent>
              </TableItem>
            </Table>
          </Card>

          {/* <Card className="mb-3">
            <CardTitle title="Billing Address" />
            <FormStyle>
              <div className="grid">
                <div className="col-4">
                  <label htmlFor="username">Full Name</label>
                  <InputText placeholder="Enter Full Name" />
                </div>

                <div className="col-4">
                  <label htmlFor="username">Email</label>
                  <InputText placeholder="example@example.com" />
                </div>
                <div className="col-4">
                  <label htmlFor="username">Company Name</label>
                  <InputText placeholder="Ghostwrite" />
                </div>
                <div className="col-8">
                  <label htmlFor="username">Address</label>
                  <InputText placeholder="Ghostwrite" />
                </div>
              </div>
            </FormStyle>
          </Card> */}
          <div className="mt-5 pt-5">
            <CardTitle title="היסטוריית חיובים" />
            <DataTable
              emptyMessage={
                <EmptyMessageWrapper>לא נמצאו נתונים</EmptyMessageWrapper>
              }
              value={subscriptionDetails?.orders || []}
            >
              <Column
                field="id"
                header="מזהה תשלום"
                bodyStyle={{ textAlign: "right" }}
              ></Column>
              <Column
                dataType="date"
                field="createdAt"
                header="תאריך תשלום"
                bodyStyle={{ textAlign: "right" }}
              ></Column>
              <Column
                bodyStyle={{ textAlign: "right" }}
                field="billingCurrencyCode"
                header="מטבע"
              ></Column>
              <Column
                bodyStyle={{ textAlign: "right" }}
                field="billingTotalPrice"
                header="כמות"
              ></Column>
            </DataTable>
          </div>
          {/* <CardsWrapper className="justify-content-start">
            {packages.map((p) => (
              <PackageCard packageInfo={p} companyId={user?.companyId || ""} />
            ))}
          </CardsWrapper> */}
        </div>
      </div>
      {showSubscriptionModal && (
        <TerminateSubscriptionModal
          onSubmit={() => setShowSubscriptionModal(false)}
          onHide={() => setShowSubscriptionModal(false)}
        />
      )}

      {upgradePackageModal && (
        <UpgradePackage onHide={() => showUpgradePackageModal(false)} />
      )}
    </>
  );
};

export default SubscriptionManage;
