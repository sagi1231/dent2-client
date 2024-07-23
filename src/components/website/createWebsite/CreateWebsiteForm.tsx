import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CreateWebsiteRequestData } from "../../../core/services/requests/createWebsite/createWebsiteRequestData";
import FormStyle from "../../common/form/FormStyle";
import { createWebsiteSteps } from "./createWebsiteSteps";
import styled from "styled-components";
import Button from "../../common/form/Button";
import Link from "../../common/Link";
import { ReactComponent as CloseIcon } from "../../../assets/Icons/Close.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import Preloader from "../../common/Preloader";
import { websiteService } from "../../../core/services/website.service";
import { CronExpression } from "../../../common/types/cronExpression";
import { useRecoilState } from "recoil";
import { websitesStateSelector } from "../../../state/websitesState";
import { WriterTemplate } from "../../../core/types/writerTemplates";
import { GoalType } from "../../../core/types/goalType";
import { ToneType } from "../../../core/types/toneType";
import MinimalTopMenu from "./MinimalTopMenu";
import useMultiStepForm from "../../../hooks/useMultiStepForm";
import { Language } from "../../../core/types/language";
import Testimonials from "../../../assets/images/testimonials.png";
import { ReactComponent as QoutesIcon } from "../../../assets/Icons/qoutes.svg";

const Container = styled.div`
  height: calc(100vh - 75px);
`;

const CenteredForm = styled(FormStyle)`
  margin-top: 60px;
  padding: 0px 200px;
  display: flex;
  flex-direction: column;
  place-content: center;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  align-items: flex-start;
`;

const InputsContainer = styled.div`
  margin: 20px 0;
  width: 100%;
`;

const BackButton = styled.div`
  position: absolute;
  top: 85px;
  right: 5px;
`;

const ExitButton = styled.div`
  position: absolute;
  top: 95px;
  right: 20px;

  & svg {
    width: 30px;
    height: 30px;
  }
`;

const SubTitle = styled.h2`
  margin-top: 20px;
  color: #425466;
  text-align: right;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 1.25rem */
  letter-spacing: -0.0375rem;
`;

const Title = styled.h1`
  color: #0a2540;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 2.5rem */
  letter-spacing: -0.075rem;
`;

const ProgWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #e6e6e6;
  height: 8px;
`;

const ProgBar = styled.div<{ $width?: number }>`
  height: 100%;
  width: ${(props) => (props.$width ? `${props.$width}%` : "0%")};
  background-image: linear-gradient(
    90deg,
    #a960ee,
    #f92b75,
    #90e0ff,
    #ffcb57,
    #f92b75,
    #90e0ff,
    #a960ee
  );
  background-clip: content-box;
  -webkit-background-clip: content-box; /* Safari/Chrome */
  animation: gradientAnimation 70s linear infinite;
  background-size: 300% auto;
  transition-duration: 0.4s;
`;

const AnimatedText = styled.span`
  font-weight: bold;
  background-clip: text;
  -webkit-background-clip: text; /* Safari/Chrome */
  color: transparent;
  background-image: linear-gradient(
    125deg,
    #a960ee,
    #f92b75,
    #90e0ff,
    #ffcb57,
    #f92b75,
    #90e0ff,
    #a960ee
  );
  animation: gradientAnimation 70s linear infinite;
  background-size: 300% auto;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 300% 50%;
    }
  }
`;

const TestimonialBlock = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h4 {
    font-size: 2.094rem;
    font-style: normal;
    font-weight: 700;
    line-height: 100%; /* 2.094rem */
    letter-spacing: -0.10469rem;
    color: var(--primary-purple);
  }

  svg path {
    fill: var(--primary-purple);
  }

  p {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 147%; /* 1.15431rem */
    letter-spacing: -0.02356rem;
  }
`;

const Bg = styled.div`
  background: var(--light-bg);
  height: 100%;
  padding: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  .purple {
    color: var(--primary-purple);
  }

  span {
    font-size: 1.5rem;
    text-align: center;
    font-style: normal;
    font-weight: 700;
    line-height: 100%; /* 1.5rem */
    letter-spacing: -0.045rem;
    text-transform: capitalize;
  }
`;

const CreateWebsiteForm: React.FC = () => {
  const navigate = useNavigate();
  const [websites, setWebsites] = useRecoilState(websitesStateSelector);
  const [searchParams] = useSearchParams();

  const onSubmit = async () => {
    try {
      const website = await websiteService.createWebsiteWithWorker(
        methods.getValues()
      );

      const connectCms = searchParams.get("connectCms");

      if (connectCms) {
        return navigate(`/websites/${website.id}?${searchParams.toString()}`);
      }
      setWebsites([...websites, website]);
      navigate(`/websites/${website.id}/`);
    } catch (err) {}
  };

  const {
    methods,
    component,
    showBackButton,
    onClickNextButton,
    activeStep,
    isLoading,
    navigatePrevStep,
  } = useMultiStepForm<CreateWebsiteRequestData>(createWebsiteSteps, onSubmit, {
    website: {
      description: "",
      category: "",
      url: searchParams.get("websiteUrl") || "",
    },
    writer: {
      templates: Object.values(WriterTemplate),
      goal: GoalType.CONVERSION,
      tone: ToneType.CONVERSATIONAL,
      language: Language.HEBREW,
    },
    audience: {
      painPoints: [],
    },
  });

  const shouldShowExitButton = useMemo(
    () => !searchParams.get("hideExit"),
    [searchParams]
  );

  return (
    <>
      <MinimalTopMenu title="" showAvater />
      <Container>
        <div className="grid h-full m-0">
          <div className="col-8">
            {/* <ProgWrapper>
          <ProgBar $width={progressPercentage}></ProgBar>
        </ProgWrapper> */}

            {shouldShowExitButton && (
              <Link path="/" className="flex align-items-center">
                <ExitButton>
                  <CloseIcon />
                </ExitButton>
              </Link>
            )}

            <FormProvider {...methods}>
              <CenteredForm
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
              >
                <Title>
                  {createWebsiteSteps[activeStep].title ? (
                    createWebsiteSteps[activeStep].title
                  ) : (
                    <>
                      היי שי 👋
                      <br />
                      כיף שהצטרפת אלינו
                    </>
                  )}
                </Title>
                <SubTitle>
                  {createWebsiteSteps[activeStep].subtitle ? (
                    createWebsiteSteps[activeStep].subtitle
                  ) : (
                    <>
                      נשמח לדעת קצת פרטים עליך. ככה נדע איך ליצור לך את התוכן
                      הכי מדוייק שיש
                    </>
                  )}
                </SubTitle>

                <InputsContainer>{component}</InputsContainer>
                <div className="flex">
                  {showBackButton && (
                    <Button
                      className="ml-4"
                      borderColor="title"
                      primary={false}
                      arrowPlacement="left"
                      onClick={navigatePrevStep}
                    >
                      חזור
                    </Button>
                  )}
                  <Button
                    bgColor="purple"
                    primary
                    arrowPlacement="right"
                    disabled={!methods.formState.isValid}
                    onClick={onClickNextButton}
                  >
                    {createWebsiteSteps[activeStep].nextButtonText}
                  </Button>
                </div>
              </CenteredForm>
            </FormProvider>
            {isLoading && <Preloader></Preloader>}
          </div>
          <div className="col-4 p-0">
            <Bg>
              <span>
                הצטרפו למעל
                <span className="purple"> 23,452 </span>
                יוצרי וכותבי תוכן שמשתמשים בניו-וורד בשיווק שלהם
              </span>
              <img src={Testimonials} width={170} alt="Testimonials" />
              <TestimonialBlock>
                <QoutesIcon />
                <h4>הגדלנו את החשיפה שלנו באלפי מבקרים חדשים</h4>
                <p>
                  מאז שהתחלנו להשתמש בneword.ai, הגדלנו את החשיפה שלנו באלפי
                  מבקרים חדשים והכפלנו את כמות הלידים שלנו. זה באמת היוצר תוכן
                  הכי טוב שיש!
                </p>
              </TestimonialBlock>
            </Bg>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CreateWebsiteForm;
