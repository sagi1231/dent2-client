import styled from "styled-components";
import { TriggerWorkerRequestData } from "../../../core/services/requests/worker/triggerWorkerRequestData";
import CardTitle from "../../common/CardTitle";
import Templates from "../../../pages/websitePages/Templates";
import { WriterTemplate } from "../../../core/types/writerTemplates";
import Badge from "../../common/Badge";
import { Skeleton } from "primereact/skeleton";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WrapperPurple = styled.div`
  width: 100%;
  background: var(--text-color);

  border-radius: 6px;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  transition-duration: 0.3s;
  .line {
    border-radius: 6px;
    width: 100%;
    height: 10px;
    background: white;
    opacity: 0.3;
  }
`;

const WrapperBlue = styled.div`
  margin-top: 25px;
  width: 100%;
  background: var(--lightblue);
  border-radius: 6px;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  transition-duration: 0.3s;
  .line {
    border-radius: 6px;
    width: 100%;
    min-height: 10px;
    background: white;
    opacity: 0.3;
  }
  .number {
    font-size: 10px;
    font-weight: bold;
  }

  /* @keyframes w70 {
    from {
      width: 200px;
    }
    to {
      width: 350px;
    }
  } */
  /* animation: w70 0.3s ease forwards; */
`;

const WrapperYellow = styled.div`
  margin-top: 25px;
  width: 100%;
  background: var(--yellow);
  border-radius: 6px;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  transition-duration: 0.3s;
  .line {
    border-radius: 6px;
    width: 100%;
    min-height: 10px;
    background: white;
    opacity: 0.3;
  }
  .number {
    font-size: 10px;
    font-weight: bold;
    color: white;
  }
`;

const WrapperPink = styled.div`
  margin-top: 25px;

  width: 100%;
  background: var(--border-color);
  border-radius: 6px;
  padding: 30px 40px;
  transition-duration: 0.3s;
  display: flex;
  gap: 25px;

  .line {
    border-radius: 6px;
    width: 100%;
    height: 10px;
    background: white;
    opacity: 0.3;
  }

  /* @keyframes w71 {
    from {
      width: 500px;
    }
    to {
      width: 400px;
    }
  }
  animation: w71 0.3s ease forwards; */
`;

const templates = [
  {
    value: WriterTemplate.PILAR,
    render: (
      <>
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
        </ContentWrapper>
      </>
    ),
  },
  {
    value: WriterTemplate.LISTING,
    render: (
      <>
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
        </ContentWrapper>
      </>
    ),
  },
  {
    value: WriterTemplate.HOW_TO,
    render: (
      <>
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
        </ContentWrapper>
      </>
    ),
  },
  {
    value: WriterTemplate.TIPS,
    render: (
      <>
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
        </ContentWrapper>
      </>
    ),
  },
  {
    value: WriterTemplate.MISTAKE_LIST,
    render: (
      <>
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
        </ContentWrapper>
      </>
    ),
  },
  {
    value: WriterTemplate.BEGINNER_GUIDE,
    render: (
      <>
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
        </ContentWrapper>
      </>
    ),
  },
  {
    value: WriterTemplate.DEFINITION,
    render: (
      <>
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
        </ContentWrapper>
      </>
    ),
  },
  {
    value: WriterTemplate.IRIT,
    render: (
      <>
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
        </ContentWrapper>
      </>
    ),
  },
];

const TemplateWrapper = styled.div`
  margin-top: 20px;
`;

const Title = styled.h1`
  color: #0a2540;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 30px;
  letter-spacing: -0.3px;
  text-indent: 20px;
  line-height: 24px;
`;

const Wrapper = styled.div`
  border: solid 1px var(--border-color);
  padding: 40px;
  border-radius: 6px;
  position: relative;
`;

const BadgeWrapper = styled.div`
  position: absolute;
  top: 35px;
  left: 1;
  transform: translate(+100%, +0%);
  z-index: 9;
`;

const ArticlePreview: React.FC<{ data: TriggerWorkerRequestData }> = ({
  data,
}) => {
  const template = templates.find((t) => t.value === data.template)!.render;
  return (
    <Wrapper>
      <BadgeWrapper>
        <Badge
          large
          bgColor={data.disablePublish ? "yellowOpacity" : "purple"}
          textColor={data.disablePublish ? "title" : "bg"}
        >
          {data.disablePublish ? "פרסום לא מופעל" : "פרסום מופעל"}
        </Badge>
      </BadgeWrapper>
      {data.title ? (
        <Title>{data.title}</Title>
      ) : (
        <div className="flex flex-column align-items-end">
          <Skeleton width="95%" />
          <Skeleton width="100%" className="mt-2" />
        </div>
      )}

      <TemplateWrapper>{template}</TemplateWrapper>
    </Wrapper>
  );
};

export default ArticlePreview;
