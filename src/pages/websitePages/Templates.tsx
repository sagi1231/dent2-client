import { Divider } from "primereact/divider";
import { InputSwitch } from "primereact/inputswitch";
import {
  Form,
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import styled from "styled-components";
import Badge from "../../components/common/Badge";
import Card from "../../components/common/Card";
import CardTitle from "../../components/common/CardTitle";
import RadioGroup from "../../components/common/form/RadioGroup";
import PageTitle from "../../components/common/PageTitle";
import WebsiteTabsNav from "../../components/website/WebsiteTabsNav";
import { Writer } from "../../core/entities/writer";
import RadioGroupMulti from "../../components/common/form/RadioGroupMulti";
import { WriterTemplate } from "../../core/types/writerTemplates";
import { useRecoilState } from "recoil";
import { writerState } from "../../state/writerState";
import { useParams } from "react-router";
import { useCallback, useEffect } from "react";
import writerService from "../../core/services/writer.service";

const WrapperPurple = styled.div`
  width: 90px;
  background: var(--text-color);

  border-radius: 6px;
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition-duration: 0.3s;
  .line {
    border-radius: 6px;
    width: 100%;
    height: 4px;
    background: white;
    opacity: 0.3;
  }
`;

const WrapperBlue = styled.div`
  margin-top: 5px;
  width: 70px;
  background: var(--lightblue);
  border-radius: 6px;
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition-duration: 0.3s;
  .line {
    border-radius: 6px;
    width: 100%;
    min-height: 4px;
    background: white;
    opacity: 0.3;
  }
  .number {
    font-size: 6px;
    font-weight: bold;
  }
`;

const WrapperYellow = styled.div`
  margin-top: 5px;
  width: 70px;
  background: var(--yellow);
  border-radius: 6px;
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition-duration: 0.3s;
  .line {
    border-radius: 6px;
    width: 100%;
    min-height: 4px;
    background: white;
    opacity: 0.3;
  }
  .number {
    font-size: 6px;
    font-weight: bold;
    color: white;
  }
`;

const WrapperPink = styled.div`
  margin-top: 5px;

  width: 80px;
  background: var(--border-color);
  border-radius: 6px;
  padding: 8px 6px;
  transition-duration: 0.3s;
  display: flex;
  gap: 5px;

  .line {
    border-radius: 6px;
    width: 100%;
    height: 4px;
    background: white;
    opacity: 0.3;
  }
`;

const CardStyle = styled(Card)`
  height: 100%;
  border: none;

  small {
    text-align: right;
  }
  .illus {
    width: 100px;
    margin-left: 20px;
  }

  /* &:hover {
    border-color: var(--title-color);
  } */

  &:hover ${WrapperBlue} {
    width: 80px;
  }

  &:hover ${WrapperPink} {
    width: 70px;
  }
`;

const RadioWrapper = styled.div`
  .singleradio {
    height: 100%;
    padding-left: 10px;
    background: white;
  }
`;

const Templates: React.FC = () => {
  const { websiteId } = useParams();
  const [writer, setWriter] = useRecoilState(writerState(websiteId as string));
  const methods = useForm<Writer>({
    values: writer,
  });

  const templates = useWatch({
    control: methods.control,
    name: "templates",
  }) as string[];

  const onSubmit: SubmitHandler<Writer> = useCallback(async (data: Writer) => {
    try {
      setWriter(data);
      await writerService.updateWriter(writer.id, {
        ...data,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    methods.handleSubmit(onSubmit)();
  }, [templates]);

  const newLocal = (
    <div className="illus">
      <WrapperPurple>
        <div className="line"></div>
      </WrapperPurple>
      <WrapperBlue>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </WrapperBlue>
      <WrapperPink>
        <div className="line"></div>
      </WrapperPink>
    </div>
  );
  return (
    <>
      <PageTitle
        title="בחירת תבניות"
        subtitle="בחר תבניות עבור הכותב האוטומטי שלך. אתה יכול לבחור אחד או רבים"
      />
      <FormProvider {...methods}>
        <RadioWrapper>
          <RadioGroupMulti<Writer>
            ColumnNumber="3"
            fieldName="templates"
            options={[
              {
                value: WriterTemplate.PILAR,
                render: (
                  <>
                    <CardStyle className="active">
                      <div className="flex ">
                        <div className="illus">
                          <WrapperPurple>
                            <div className="line"></div>
                          </WrapperPurple>
                          <WrapperBlue>
                            <div className="line"></div>
                            <div className="line"></div>
                          </WrapperBlue>
                          <WrapperBlue>
                            <div className="line"></div>
                          </WrapperBlue>
                          <WrapperPink>
                            <div className="line"></div>
                          </WrapperPink>
                        </div>
                        <div>
                          <div className="flex align-items-center mb-2 justify-content-between">
                            <CardTitle title="עמוד פוסט" className="mb-0" />
                          </div>
                          <small className="">
                            פוסטים של עמודי בלוג הם יסודות לאשכולות של תוכן
                            הקשור לעסק שלך.
                          </small>
                        </div>
                      </div>
                    </CardStyle>
                  </>
                ),
              },
              {
                value: WriterTemplate.LISTING,
                render: (
                  <>
                    <CardStyle>
                      <div className="flex">
                        <div className="illus">
                          <WrapperPurple>
                            <div className="line"></div>
                          </WrapperPurple>
                          <WrapperYellow>
                            <div className="flex">
                              <span className="ml-2 number">1.</span>
                              <div className="line"></div>
                            </div>
                            <div className="flex">
                              <span className="ml-2 number">2.</span>
                              <div className="line"></div>
                            </div>
                            <div className="flex">
                              <span className="ml-2 number">3.</span>
                              <div className="line"></div>
                            </div>
                          </WrapperYellow>
                          <WrapperPink>
                            <div className="line"></div>
                          </WrapperPink>
                        </div>
                        <div>
                          <div className="flex align-items-center mb-2 justify-content-between">
                            <CardTitle
                              title="Product Listicle"
                              className="mb-0"
                            />
                          </div>
                          <small className="">
                            Presenting tools and services in a numbered format
                            {/* to makes content more accessible */}
                          </small>
                        </div>
                      </div>
                    </CardStyle>
                  </>
                ),
              },
              {
                value: WriterTemplate.HOW_TO,
                render: (
                  <CardStyle>
                    <div className="flex ">
                      {newLocal}
                      <div>
                        <div className="flex align-items-center mb-2 justify-content-between">
                          <CardTitle title="How to's Post" className="mb-0" />
                        </div>
                        <small className="">
                          This Template offers step-by-step instructions to
                          complete a task or solve a problem.
                        </small>
                      </div>
                    </div>
                  </CardStyle>
                ),
              },
              {
                value: WriterTemplate.TIPS,
                render: (
                  <CardStyle>
                    <div className="flex">
                      <div className="illus">
                        <WrapperPurple>
                          <div className="line"></div>
                        </WrapperPurple>
                        <WrapperYellow>
                          <div className="flex">
                            <span className="ml-2 number">1.</span>
                            <div className="line"></div>
                          </div>
                          <div className="flex">
                            <span className="ml-2 number">2.</span>
                            <div className="line"></div>
                          </div>
                          <div className="flex">
                            <span className="ml-2 number">3.</span>
                            <div className="line"></div>
                          </div>
                        </WrapperYellow>
                        <WrapperPink>
                          <div className="line"></div>
                        </WrapperPink>
                      </div>
                      <div>
                        <div className="flex align-items-center mb-2 justify-content-between">
                          <CardTitle title="Tips Post" className="mb-0" />
                        </div>
                        <small className="">
                          הצגת טיפים בפורמט ממוספר להפשטת רעיונות מורכבים.
                        </small>
                      </div>
                    </div>
                  </CardStyle>
                ),
              },
              {
                value: WriterTemplate.MISTAKE_LIST,
                render: (
                  <CardStyle>
                    <div className="flex">
                      <div className="illus">
                        <WrapperPurple>
                          <div className="line"></div>
                        </WrapperPurple>
                        <WrapperYellow>
                          <div className="flex">
                            <span className="mr-2 number">1.</span>
                            <div className="line"></div>
                          </div>
                          <div className="flex">
                            <span className="mr-2 number">2.</span>
                            <div className="line"></div>
                          </div>
                          <div className="flex">
                            <span className="mr-2 number">3.</span>
                            <div className="line"></div>
                          </div>
                        </WrapperYellow>
                        <WrapperPink>
                          <div className="line"></div>
                        </WrapperPink>
                      </div>
                      <div>
                        <div className="flex align-items-center mb-2 justify-content-between">
                          <CardTitle title="Common Mistakes" className="mb-0" />
                        </div>
                        <small className="">
                          Presenting common mistakes in a numbered format to
                          simplify complex ideas.
                        </small>
                      </div>
                    </div>
                  </CardStyle>
                ),
              },
              {
                value: WriterTemplate.BEGINNER_GUIDE,
                render: (
                  <CardStyle>
                    <div className="flex">
                      <div className="illus">
                        <WrapperPurple>
                          <div className="line"></div>
                        </WrapperPurple>
                        <WrapperBlue>
                          <div className="line"></div>
                        </WrapperBlue>
                        <WrapperYellow>
                          <div className="flex">
                            <span className="ml-2 number">1.</span>
                            <div className="line"></div>
                          </div>
                          <div className="flex">
                            <span className="ml-2 number">2.</span>
                            <div className="line"></div>
                          </div>
                        </WrapperYellow>
                        <WrapperPink>
                          <div className="line"></div>
                        </WrapperPink>
                      </div>
                      <div>
                        <div className="flex align-items-center mb-2 justify-content-between">
                          <CardTitle
                            title="Beginner's Guides"
                            className="mb-0"
                          />
                        </div>
                        <small className="">
                          ספק מפת דרכים מפורטת למתחילים לעקוב אחריהם וליישם ידע.
                        </small>
                      </div>
                    </div>
                  </CardStyle>
                ),
              },
              {
                value: WriterTemplate.DEFINITION,
                render: (
                  <CardStyle>
                    <div className="flex">
                      <div className="illus">
                        <WrapperPurple>
                          <div className="line"></div>
                        </WrapperPurple>
                        <WrapperBlue>
                          <div className="line"></div>
                        </WrapperBlue>
                        <WrapperBlue>
                          <div className="line"></div>
                        </WrapperBlue>
                        <WrapperBlue>
                          <div className="line"></div>
                        </WrapperBlue>

                        <WrapperPink>
                          <div className="line"></div>
                        </WrapperPink>
                      </div>
                      <div>
                        <div className="flex align-items-center mb-2 justify-content-between">
                          <CardTitle title="Term Explainer" className="mb-0" />
                        </div>
                        <small className="">
                          explains a term, concept, or process. break down
                          specific topics for easy understanding.
                        </small>
                      </div>
                    </div>
                  </CardStyle>
                ),
              },
            ]}
          />
        </RadioWrapper>
      </FormProvider>
      <div className="grid">
        <div className="col-4"></div>
        <div className="col-4"></div>
        <div className="col-4"></div>
        <div className="col-4"></div>
        <div className="col-4"></div>
        <div className="col-4"></div>
        <div className="col-4"></div>
      </div>
    </>
  );
};

export default Templates;
