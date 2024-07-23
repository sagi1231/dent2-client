import { InputText } from "primereact/inputtext";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import userService from "../core/services/user.service";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import { userState } from "../state/userState";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { Message } from "primereact/message";
import FormStyle from "../components/common/form/FormStyle";
import Button from "../components/common/form/Button";
import { ReactComponent as Logo } from "../assets/Logo/ColoredLogo.svg";
import Link from "../components/common/Link";
import { CompleteSignupRequestData } from "../core/services/requests/signup/completeSignupRequestData";
import { ValidatePhoneCodeRequest } from "../core/services/requests/signup/validatePhoneCodeRequest";
import ErrorMessage from "../components/common/ErrorMessage";
import { toast } from "react-toastify";
import AuthHeader from "../components/auth/AuthHeader";

const LoginPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  border-radius: 0.75rem;
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

const VerifyEmailPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ValidatePhoneCodeRequest>();
  const [user, setUserState] = useRecoilState(userState);
  const refreshUserSelectorState = useRecoilRefresher_UNSTABLE(userState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isLoadingResend, setIsLoadingResend] = useState(false);

  const onSubmit: SubmitHandler<ValidatePhoneCodeRequest> = async (data) => {
    try {
      setIsLoading(true);
      const res = await userService.verifyCode(data);
      user &&
        setUserState({
          ...user,
          isActive: true,
        });

      refreshUserSelectorState();

      navigate("/websites/new");
    } catch (err) {
      console.log(err);
      setError("root", {});
    } finally {
      setIsLoading(false);
    }
  };

  //   useEffect(() => {
  //     const supportModal = (window as any).Beacon as any;
  //     supportModal("show-message", "7bac219c-d0d8-48c7-ac14-3fee464b97cc");
  //   }, []);

  const resendCode = useCallback(async () => {
    setIsLoadingResend(true);
    try {
      await userService.resendEmailVerificationCode();
    } catch (err) {
    } finally {
      setIsLoadingResend(false);
      toast("קוד חדש נשלח");
    }
  }, []);

  return (
    <LoginPageWrapper>
      <Logo />
      <AuthHeader />
      <CenteredForm autoComplete="off">
        <div className="flex flex-column">
          <div className=" mr-5">
            <label>
              אנא הזן את הקוד בן 6 הספרות שלך שView Allאליו שלחנו אותך{" "}
              <strong>{user?.email}</strong>
            </label>

            <InputText
              {...register("code", {
                required: true,
                maxLength: {
                  value: 6,
                  message: "הקוד צריך להיות בן 6 ספרות",
                },
                minLength: {
                  value: 6,
                  message: "הקוד צריך להיות בן 6 ספרות",
                },
              })}
              type="text"
              placeholder="221099"
              className={errors.code ? "p-invalid" : ""}
            />
            <ErrorMessage>{errors.code?.message}</ErrorMessage>
          </div>
          <Button
            loading={isLoadingResend}
            className="mb-5"
            onClick={resendCode}
          >
            שלח שוב{" "}
          </Button>
        </div>

        <Button
          className="mb-4"
          onClick={handleSubmit(onSubmit)}
          loading={isLoading}
          primary
          arrowPlacement="right"
        >
          תאשר
        </Button>
      </CenteredForm>
    </LoginPageWrapper>
  );
};

export default VerifyEmailPage;
