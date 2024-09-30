import { InputText } from "primereact/inputtext";
import { ReactComponent as GoogleIcon } from "../assets/Icons/ColoredGoogle.svg";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../state/userState";
import styled from "styled-components";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginRequestData } from "../core/services/requests/login/loginRequestData";
import { Message } from "primereact/message";
import RegexValidations from "../core/validation/regexValidations";
import FormStyle from "../components/common/form/FormStyle";
import Button from "../components/common/form/Button";
import { ReactComponent as Logo } from "../assets/Logo/DnetLogo.svg";
import { SignupRequestData } from "../core/services/requests/signup/signupRequestData";
import Link from "../components/common/Link";
import { Checkbox } from "primereact/checkbox";
import AppConfig from "../config/appConfig";
import ErrorMessage from "../components/common/ErrorMessage";
import AuthHeader from "../components/auth/AuthHeader";
import userService from "../core/services/user.service";
import { CreateUserRequestData } from "../core/services/requests/createUser/createUserRequestData";

const LoginPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media only screen and (max-width: 1000px) {
    .form-mobile {
      width: 80%;
    }

    label {
      font-size: 16px;
    }

    input {
      font-size: 22px;
      height: 100px;
      border-radius: 24px;
    }

    .google-button-mobile {
      height: 100px;
      border-radius: 24px;
      font-size: 18px;
    }

    .or-text-mobile {
      font-size: 20px;
      margin: 50px 0;
    }

    .gw-button {
      margin-top: 60px;
      margin-bottom: 60px;
      font-size: 24px;
      padding: 24px 26px;

      svg {
        width: 20px;
        height: 20px;
        margin-left: 20px;
      }
    }
    .small-text-mobile {
      font-size: 22px;
      a {
        font-size: 22px;
      }
    }

    .mobile-header {
      margin-bottom: 60px;

      svg {
        width: 300px;
        height: 60px;
      }
      h1 {
        width: 100%;
        font-size: 5rem;
      }
    }
  }
`;

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

const ErrorMessageStyled = styled(Message)`
  display: block;
  width: fit-content;
  margin-bottom: 20px;
`;

const CenteredForm = styled(FormStyle)`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 30rem;

  justify-content: center;
  align-items: center;
`;

const ColoredLink = styled(Link)`
  color: var(--main-purple, #a960ee);
  font-family: Lato;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 0.75rem */
  letter-spacing: -0.0225rem;
  text-transform: capitalize;
`;

const RegularText = styled.div`
  color: var(--main-text-lightcolor, #9aa8b6);

  font-family: Lato;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 0.75rem */
  letter-spacing: -0.0225rem;
  text-transform: capitalize;
`;

const GoogleButton = styled(Link)`
  border-radius: 6px;
  border: 1px solid var(--input-border-color, #e6e6e6);
  display: flex;
  height: 3.125rem;
  width: 100%;
  padding: 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  margin-bottom: 30px;
  color: var(--main-title-color, #0a2540);
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 0.75rem */
  letter-spacing: -0.0225rem;
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    border-color: var(--title-color);
  }
  & svg {
    width: 16px;
  }
`;

const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`;

const OrText = styled.div`
  color: var(--main-text-color, #425466);
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 0.75rem */
  letter-spacing: -0.0225rem;
  text-transform: capitalize;
  margin: 20px 0;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 200%;
    height: 1px;
    background: var(--main-text-color, #425466);
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    z-index: -1;
  }

  &:after {
    content: "";
    position: absolute;
    width: 130%;
    height: 20px;
    background: white;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    z-index: -1;
  }
`;

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm<CreateUserRequestData>();
  const setUserState = useSetRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<CreateUserRequestData> = async (data) => {
    try {
      setIsLoading(true);
      const captcha = (document as any).grecaptcha as any;

      const res = await userService.createUser({
        ...data,
      });

      console.log(res);

      console.log(res);
      setUserState(res);
      const redirectPath = queryParams.get("redirect") || "/";
      navigate(redirectPath);
    } catch (err) {
      console.log(err);
      setError("root", {});
    } finally {
      setIsLoading(false);
    }
  };

  const onClickGoogleButton = () => {
    const redirectPath = queryParams.get("redirect") || "/";
    document.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${
      AppConfig.serverUrl
    }/auth%2Fgoogle%2Fcallback&client_id=89013921262-762mm9l2lfq3dfv4rf185srjgq8ulihg.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=${encodeURIComponent(
      redirectPath
    )}`;
  };

  return (
    <LoginPageWrapper>
      <div className="mobile-header">
        <AuthHeader />
      </div>
      <CenteredForm className="form-mobile" autoComplete="off">
        <GoogleButton
          onClick={onClickGoogleButton}
          className="google-button-mobile"
        >
          <GoogleIcon />
          המשך עם גוגל{" "}
        </GoogleButton>
        <OrText className="or-text-mobile">
          או להירשם באמצעות דואר אלקטרוני
        </OrText>
        <div className="w-full mb-5">
          <div className="flex">
            <div className="mb-5 ml-5">
              <label>שם פרטי</label>

              <InputText
                {...register("firstname", {
                  required: true,
                  maxLength: 20,
                })}
                type="text"
                placeholder="יהודה"
                className={errors.firstname ? "p-invalid" : ""}
              />
            </div>
            <div className="mb-5">
              <label>שם משפחה</label>

              <InputText
                {...register("lastname", {
                  required: true,
                  maxLength: 20,
                })}
                placeholder="כהן"
                className={errors.lastname ? "p-invalid" : ""}
              />
            </div>
          </div>

          <label>מספר אישי</label>
          <InputText
            autoComplete="off"
            {...register("pNumber", {
              required: true,
              maxLength: 7,
              minLength: 7,
            })}
            type="text"
            placeholder="XXXXXXX"
            className={errors.pNumber ? "p-invalid" : ""}
          />
          <ErrorMessage>{errors.pNumber?.message}</ErrorMessage>
        </div>
        <div className="w-full mb-5">
          <label>סיסמה</label>

          <InputText
            autoComplete="off"
            {...register("password", {
              required: true,
              maxLength: 20,
              pattern: {
                value: RegexValidations.password,
                message:
                  "הסיסמה לא מספיק חזקה - אנא השתמש ב-8 תווים לפחות, שילוב של אותיות (אותיות גדולות וקטנות), מספרים וסמלים",
              },
            })}
            type="password"
            placeholder="J12345678w!"
            className={errors.password ? "p-invalid" : ""}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </div>

        <Button
          onClick={handleSubmit(onSubmit)}
          loading={isLoading}
          primary
          arrowPlacement="right"
        >
          צור חשבון{" "}
        </Button>

        <RegularText className="mb-4 mt-4 small-text-mobile">
          כבר יש לך חשבון? <ColoredLink path="/login">התחבר</ColoredLink>
        </RegularText>
        <RegularText className="mb-4 text-center small-text-mobile">
          על ידי לחיצה על "צור חשבון" או "המשך עם גוגל", אתה מסכים{" "}
          <ColoredLink
            path="https://ghostwrites.ai/legals/terms-of-use-agreement/"
            differentTab
          >
            לתנאי שימוש{" "}
          </ColoredLink>
          . של Neword{" "}
          <ColoredLink
            differentTab
            path="https://ghostwrites.ai/legals/privacy-policy/"
          >
            {" "}
            קרא את מדיניות הפרטיות שלנו{" "}
          </ColoredLink>
          .
        </RegularText>
      </CenteredForm>
    </LoginPageWrapper>
  );
};

export default Signup;
