import { InputText } from "primereact/inputtext";
import styled from "styled-components";
import Card from "../../components/common/Card";
import CardIconTitle from "../../components/common/CardIconTitle";
import CardSubtitle from "../../components/common/CardSubtitle";
import Button from "../../components/common/form/Button";
import FormStyle from "../../components/common/form/FormStyle";
import { ReactComponent as SettingsIcon } from "../../assets/Icons/Settings.svg";
import { Divider } from "primereact/divider";
import PerferenceTabsNav from "../../components/website/PerferenceTabsNav";
import { useCallback, useEffect, useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../state/userState";
import { User } from "../../core/entities/user";
import userService from "../../core/services/user.service";
import { throttle } from "lodash";
import CardTitle from "../../components/common/CardTitle";
import PhoneSelector from "../../components/common/form/phoneSelector/PhoneSelector";
import SubMenuLayout from "../../components/common/SubMenuLayout";

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const UserPreferences: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    trigger,
    control,
  } = useForm<User>({ defaultValues: user || {} });

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    try {
      setUser(data);
      await userService.updateUser({
        ...data,
        company: undefined,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const submitDebounced = useCallback(throttle(onSubmit, 300), []);

  return (
    <>
      <div className="grid">
        <div className="col-10">
          <Title>הגדרות משתמש</Title>
          <Subtitle>נהל את הפרטים שלך.</Subtitle>

          <FormStyle onChange={handleSubmit(submitDebounced)}>
            <div className="grid">
              <div className="col-6">
                <label htmlFor="username">שם פרטי</label>
                <InputText
                  {...register("firstName")}
                  placeholder="הכנס שם פרטי"
                />
              </div>
              <div className="col-6">
                <label htmlFor="username">שם משפחה</label>
                <InputText
                  {...register("lastName")}
                  placeholder="הכנס שם משפחה"
                />
              </div>
              {/* <div className="col-6">
                  <label htmlFor="username">Phone Number</label>
                  <div className="flex">
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <PhoneSelector
                          onChange={field.onChange}
                          value={field.value}
                        />
                      )}
                    />
                  </div>
                  {user?.isActive && user.phone && (
                    <small id="email-varified" className="text-green-400">
                      Phone Verified
                    </small>
                  )}
                </div> */}
              <div className="col-6">
                <label htmlFor="username">אימייל</label>
                <InputText
                  disabled
                  {...register("email")}
                  placeholder="example@example.com"
                />
              </div>
              {/* <CardSubtitle subTitle={"Privacy settings"} />
                <div className="col-6">
                  <label htmlFor="password">New Password</label>
                  <InputText placeholder="New Password" />
                </div>
                <div className="col-6">
                  <label htmlFor="username">Validate Password</label>
                  <InputText placeholder="Validate Password" />
                </div> */}
            </div>
          </FormStyle>
        </div>
      </div>
    </>
  );
};

export default UserPreferences;
