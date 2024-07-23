import { TriggerWorkerRequestData } from "../../../../core/services/requests/worker/triggerWorkerRequestData";
import Card from "../../../common/Card";
import CardTitle from "../../../common/CardTitle";
import styled from "styled-components";
import { WriterTemplate } from "../../../../core/types/writerTemplates";
import RadioGroup from "../../../common/form/RadioGroup";
import React from "react";
import { Tooltip } from "primereact/tooltip";
import Badge from "../../../common/Badge";
import { ReactComponent as InfoIcon } from "../../../../assets/Icons/Info.svg";

interface Props {
  smallVersion?: boolean;
}

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
  padding: 6px 8px;
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
    text-align: left;
  }
  .illus {
    width: 100px;
    margin-right: 20px;
  }
  .infoicon {
    width: 14px;
    height: 14px;
    right: -27px;
    top: 0;
    path {
      fill: #bdc7ca !important;
    }
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
    background: white;
    padding: 5px;
  }
`;

const Title = styled.h1`
  color: #0a2540;
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -2.88px;
  margin-bottom: 30px;
`;

const ContentWrapper = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TooltipTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    width: 20px;
    height: 20px;
  }
  span {
    font-weight: 600;
    color: var(--title-color);
  }
`;

const ChooseTemplate: React.FC<Props> = (props) => {
  return (
    <>
      <Title>בחר תבנית</Title>
      <RadioWrapper>
        <RadioGroup<TriggerWorkerRequestData>
          ColumnNumber="4"
          fieldName="template"
          options={[
            {
              value: WriterTemplate.PILAR,
              render: (
                <>
                  <Tooltip target=".infoicon.pillar">
                    <div className="p-4">
                      <TooltipTitle>
                        <span>Pillar Post</span>
                      </TooltipTitle>
                      <small className="">
                        Pillar blog posts are foundations for clusters of
                        <br />
                        related content.
                      </small>
                      <br />
                      <div className="flex mt-4">
                        <Badge bgColor="purple">
                          Highlighting Product Value
                        </Badge>
                      </div>
                    </div>
                  </Tooltip>
                  <CardStyle className="active">
                    <ContentWrapper>
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
                          <CardTitle title="Pillar Post" className="mb-0" />
                          <InfoIcon
                            className="infoicon pillar"
                            data-pr-position="right"
                          />
                        </div>
                      </div>
                    </ContentWrapper>
                  </CardStyle>
                </>
              ),
            },
            {
              value: WriterTemplate.LISTING,
              render: (
                <>
                  <Tooltip target=".infoicon.pillar">
                    <div className="p-4">
                      <TooltipTitle>
                        <span>Product Listicle</span>
                      </TooltipTitle>
                      <small className="">
                        Presenting tools and services in a numbered format to
                        <br />
                        makes content more accessible
                      </small>
                      <br />
                      <div className="flex mt-4">
                        <Badge bgColor="purple">
                          Highlighting Product Value
                        </Badge>
                      </div>
                    </div>
                  </Tooltip>
                  <CardStyle>
                    <ContentWrapper>
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
                          <CardTitle
                            title="Product Listicle"
                            className="mb-0"
                          />
                          <InfoIcon
                            className="infoicon pillar"
                            data-pr-position="right"
                          />
                        </div>
                      </div>
                    </ContentWrapper>
                  </CardStyle>
                </>
              ),
            },
            {
              value: WriterTemplate.HOW_TO,
              render: (
                <>
                  <Tooltip target=".infoicon.pillar">
                    <div className="p-4">
                      <TooltipTitle>
                        <span>How to's Post</span>
                      </TooltipTitle>
                      <small className="">
                        This Template offers step-by-step instructions to
                        <br />
                        complete a task or solve a problem.
                      </small>
                      <br />
                      <div className="flex mt-4">
                        <Badge bgColor="purple">
                          Highlighting Product Value
                        </Badge>
                      </div>
                    </div>
                  </Tooltip>
                  <CardStyle>
                    <ContentWrapper>
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
                      <div>
                        <div className="flex align-items-center mb-2 justify-content-between">
                          <CardTitle title="How to's Post" className="mb-0" />
                          <InfoIcon
                            className="infoicon pillar"
                            data-pr-position="right"
                          />
                        </div>
                      </div>
                    </ContentWrapper>
                  </CardStyle>
                </>
              ),
            },
            {
              value: WriterTemplate.TIPS,
              render: (
                <>
                  <Tooltip target=".infoicon.pillar">
                    <div className="p-4">
                      <TooltipTitle>
                        <span>Tips Post</span>
                      </TooltipTitle>
                      <small className="">
                        Presenting tips in a numbered format to simplify complex
                        <br />
                        ideas.
                      </small>
                      <br />
                      <div className="flex mt-4">
                        <Badge bgColor="purple">
                          Highlighting Product Value
                        </Badge>
                      </div>
                    </div>
                  </Tooltip>
                  <CardStyle>
                    <ContentWrapper>
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
                          <CardTitle title="Tips Post" className="mb-0" />
                          <InfoIcon
                            className="infoicon pillar"
                            data-pr-position="right"
                          />
                        </div>
                      </div>
                    </ContentWrapper>
                  </CardStyle>
                </>
              ),
            },
            {
              value: WriterTemplate.MISTAKE_LIST,
              render: (
                <>
                  <Tooltip target=".infoicon.pillar">
                    <div className="p-4">
                      <TooltipTitle>
                        <span>Common Mistakes</span>
                      </TooltipTitle>
                      <small className="">
                        Presenting common mistakes in a numbered format to
                        <br />
                        simplify complex ideas.
                      </small>
                      <br />
                      <div className="flex mt-4">
                        <Badge bgColor="purple">
                          Highlighting Product Value
                        </Badge>
                      </div>
                    </div>
                  </Tooltip>
                  <CardStyle>
                    <ContentWrapper>
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
                          <InfoIcon
                            className="infoicon pillar"
                            data-pr-position="right"
                          />
                        </div>
                      </div>
                    </ContentWrapper>
                  </CardStyle>
                </>
              ),
            },
            {
              value: WriterTemplate.BEGINNER_GUIDE,
              render: (
                <>
                  <Tooltip target=".infoicon.pillar">
                    <div className="p-4">
                      <TooltipTitle>
                        <span>Beginner's Guides</span>
                      </TooltipTitle>
                      <small className="">
                        Provide a detailed roadmap for beginners to follow and
                        <br />
                        implement knowledge.
                      </small>
                      <br />
                      <div className="flex mt-4">
                        <Badge bgColor="purple">
                          Highlighting Product Value
                        </Badge>
                      </div>
                    </div>
                  </Tooltip>
                  <CardStyle>
                    <ContentWrapper>
                      <div className="illus">
                        <WrapperPurple>
                          <div className="line"></div>
                        </WrapperPurple>
                        <WrapperBlue>
                          <div className="line"></div>
                        </WrapperBlue>
                        <WrapperYellow>
                          <div className="flex">
                            <span className="mr-2 number">1.</span>
                            <div className="line"></div>
                          </div>
                          <div className="flex">
                            <span className="mr-2 number">2.</span>
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
                          <InfoIcon
                            className="infoicon pillar"
                            data-pr-position="right"
                          />
                        </div>
                      </div>
                    </ContentWrapper>
                  </CardStyle>
                </>
              ),
            },
            {
              value: WriterTemplate.DEFINITION,
              render: (
                <>
                  <Tooltip target=".infoicon.pillar">
                    <div className="p-4">
                      <TooltipTitle>
                        <span>Term Explainer</span>
                      </TooltipTitle>
                      <small className="">
                        explains a term, concept, or process. break down <br />
                        specific topics for easy understanding.
                      </small>
                      <br />
                      <div className="flex mt-4">
                        <Badge bgColor="purple">
                          Highlighting Product Value
                        </Badge>
                      </div>
                    </div>
                  </Tooltip>
                  <CardStyle>
                    <ContentWrapper>
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
                          <InfoIcon
                            className="infoicon pillar"
                            data-pr-position="right"
                          />
                        </div>
                      </div>
                    </ContentWrapper>
                  </CardStyle>
                </>
              ),
            },
          ]}
        />
      </RadioWrapper>
    </>
  );
};

export default ChooseTemplate;
