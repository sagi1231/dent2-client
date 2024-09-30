import { ReactComponent as Logo } from "../../assets/Logo/DnetLogo.svg";
import styled from "styled-components";

const Title = styled.h1`
  color: var(--main-title-color, #0a2540);
  text-align: center;
  font-family: Inter;
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 3rem */
  letter-spacing: -0.12rem;
  text-transform: capitalize;
  margin: 60px 0;
  width: 37.625rem;
  & span {
    color: var(--main-purple, #a960ee);
  }
`;

const AuthHeader: React.FC = () => {
  return (
    <div className="flex align-items-center flex-column">
      <Logo />
      <Title>
        הדרך הסלולה, <span>בשבילך.</span>{" "}
      </Title>
    </div>
  );
};
export default AuthHeader;
