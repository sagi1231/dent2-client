import { useLocation, useParams } from "react-router";
import Link from "../components/common/Link";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import LogoIcon from "../assets/Logo/LogoIcon.png";

const OverWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  top: 0px;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e2e8f0;
  border-top: 1px solid #e2e8f0;
  background: white;
  height: 85px;
  z-index: 99;
`;

const Wrapper = styled.div`
  display: flex;
  height: 85px;
  padding-right: 25px;
  align-items: center;
`;

const BoxImage = styled.img`
  width: 35px;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: content-box;
  object-fit: contain;

  transition-duration: 0.25s;
`;

const BoxImage2 = styled.img`
  width: 40px;
  box-sizing: content-box;
  object-fit: contain;
  margin-bottom: -6px;
  transition-duration: 0.25s;
`;

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

const ErrorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const title = "אופס...";
  const messageFixed =
    searchParams?.get("message") ||
    "אירעה שגיאה לא ידועה. אנא נסה שוב או צור קשר עם התמיכה באמצעות הצ'אט בתחתית העמוד.";
  return (
    <>
      <OverWrapper>
        <Wrapper>
          <Link path="/" className="flex align-items-center" global>
            <BoxImage src={LogoIcon} />
          </Link>
        </Wrapper>
      </OverWrapper>
      <BodyWrapper>
        <TextWrapper>
          <h1>
            <BoxImage2 src={LogoIcon} /> {title}
          </h1>
          <br></br>
          <h2>
            {messageFixed} <br></br>
            <Link path="/" global>
              לחץ כדי לעבור לדף הבית{" "}
            </Link>
          </h2>
        </TextWrapper>
      </BodyWrapper>
    </>
  );
};

export default ErrorPage;
