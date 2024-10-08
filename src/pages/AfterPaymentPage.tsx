import styled from "styled-components";
import LogoIcon from "../assets/Logo/DnetIcon.png";
import { useParams } from "react-router";
import { PaymentStatusType } from "../core/types/paymentStatusType";
import Link from "../components/common/Link";
import AppConfig from "../config/appConfig";
import Button from "../components/common/form/Button";

const BodyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  align-self: center;
  align-content: center;
  flex-direction: column;
`;

const TextWrapper = styled.div`
  max-width: 500px;
`;

const BoxImage2 = styled.img`
  width: 40px;
  box-sizing: content-box;
  object-fit: contain;
  margin-bottom: -6px;
  transition-duration: 0.25s;
`;

type MessageFactoryType = {
  [key in PaymentStatusType]: {
    message: string;
    title: string;
  };
};

const messagePerStatusFactory: MessageFactoryType = {
  [PaymentStatusType.SUCCESS]: {
    title: "תודה!",
    message: "המנוי שלך הופעל בהצלחה",
  },
  [PaymentStatusType.PENDING]: {
    message:
      "קיבלנו את ההזמנה שלך ומצפים לעיבוד התשלום. ברגע שהוא יופעל תקבל אימייל. ",
    title: "התשלום בהמתנה",
  },
  [PaymentStatusType.FAILED]: {
    title: "התשלום נכשל",
    message: "התשלום שלך נכשל. אנא ודא שכרטיס האשראי שלך תקף",
  },
};

const AfterPaymentPage: React.FC = () => {
  const { status } = useParams();
  const textObj = messagePerStatusFactory[status as PaymentStatusType];

  const refreshPage = () => {
    window.location.href = AppConfig.appUrl;
  };

  return (
    <BodyWrapper>
      <TextWrapper>
        <h1>
          <BoxImage2 src={LogoIcon} /> {textObj.title}
        </h1>
        <br></br>
        <h2>
          {textObj.message} <br></br>
          <br></br>
          <Button primary onClick={refreshPage}>
            לחץ כאן כדי להמשיך{" "}
          </Button>
        </h2>
      </TextWrapper>
    </BodyWrapper>
  );
};

export default AfterPaymentPage;
