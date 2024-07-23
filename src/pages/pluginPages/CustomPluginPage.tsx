import styled from "styled-components";
import Card from "../../components/common/Card";
import CustomBG from "../../assets/images/CMSIcons/CustomBG.png";
import CardTitle from "../../components/common/CardTitle";
import FormStyle from "../../components/common/form/FormStyle";
import { InputText } from "primereact/inputtext";
import { useParams } from "react-router";
import { useController, useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { websiteState } from "../../state/websitesState";
import { PublishIntegration } from "../../core/entities/publishIntegration";
import { IntegrationType } from "../../core/types/integrationType";
import { Dropdown } from "primereact/dropdown";
import { IntegrationAuthType } from "../../core/types/integrationAuthType";
import RegexValidations from "../../core/validation/regexValidations";
import Button from "../../components/common/form/Button";
import { publishIntegrationState } from "../../state/publishIntegrationState";
import { useCallback, useMemo } from "react";
import { publisherService } from "../../core/services/publisher.service";

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

const CardStyle = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  & img {
    width: 150px;
  }
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.3px;
  line-height: 22px;
`;
const ListWrapper = styled.ol`
  list-style: none;
  counter-reset: my-counter;
`;
const ListItem = styled.li`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.3px;
  line-height: 22px;
  margin-bottom: 10px;

  & span {
    font-weight: bold;
  }

  &::before {
    counter-increment: my-counter;
    content: counter(my-counter) ". ";
    font-weight: bold; /* Bold the numbers */
    margin-left: -1em;
    margin-right: 5px;
  }
`;

const TextInsideInput = styled.div`
  position: relative;
  margin-top: 10px;
  & input {
    margin-top: 0;
    padding-left: 100px;
  }
`;

const InnerText = styled.div`
  position: absolute;
  top: 0%;
  padding-left: 20px;
  padding-right: 20px;
  color: rgb(10, 37, 64);
  font-size: 12px;
  font-weight: bold;
  height: 50px;
  display: flex;
  align-items: center;
  background: var(--light-bg);
  border: solid 1px var(--border-color);
  border-radius: 12px 0 0 12px;
  letter-spacing: -0.1px;
`;

const Wrapper = styled.div`
  a {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.3px;
    color: var(--primary-purple);
  }
`;

const StyledButton = styled(Button)``;

const CustomPluginPage: React.FC = () => {
  const { websiteId } = useParams();
  const website = useRecoilValue(websiteState(websiteId as string));
  const [cmsIntegration, setCmsIntegration] = useRecoilState(
    publishIntegrationState(websiteId as string)
  );

  const updateMode = useMemo(() => !!cmsIntegration, [cmsIntegration]);

  const { register, control, getValues, handleSubmit } =
    useForm<PublishIntegration>({
      values: cmsIntegration,
    });

  const createCms = useCallback(async () => {
    try {
      const createdCmsIntegration =
        await publisherService.createPublishIntegration(getValues());
      setCmsIntegration(createdCmsIntegration);
    } catch (err) {}
  }, [getValues, setCmsIntegration]);

  const updateCms = useCallback(async () => {
    if (updateMode && cmsIntegration) {
      try {
        await publisherService.updatePublishIntegrationById(
          cmsIntegration?.id,
          getValues()
        );
      } catch (err) {}
    }
  }, [cmsIntegration, getValues, updateMode]);

  const { field } = useController({
    control,
    name: "authType",
  });

  return (
    <>
      <Title>Custom</Title>
      <Subtitle>Sync your articles with a custom CMS</Subtitle>

      <Wrapper className="grid">
        <div className="col-4 mr-6">
          <CardStyle>
            <img src={CustomBG} />
            <CardTitle title="Custom" className="mt-3 mb-0" />
          </CardStyle>
        </div>
        <div className="col-6">
          <div className="flex flex-column justify-content-center h-full">
            <CardTitle title="Custom API Connection setup" />
            <FormStyle onChange={handleSubmit(updateCms)}>
              <label>API url</label>
              <TextInsideInput className="mb-4">
                <InnerText>https://</InnerText>
                <InputText
                  {...register("apiUrl", {
                    required: true,
                    setValueAs: (value: string) => {
                      const formatted = value
                        .replace("https://", "")
                        .replace("http://", "");
                      return `https://${formatted}`;
                    },
                    pattern: {
                      value: RegexValidations.url,
                      message: "Website address is invalid",
                    },
                  })}
                />
              </TextInsideInput>
              <label>Request method</label>
              <InputText disabled value="POST" className="mb-4" />
              <label>Auth</label>

              <Dropdown
                className="mb-4"
                options={[
                  {
                    label: "Basic",
                    value: IntegrationAuthType.BASIC,
                  },
                  {
                    label: "Token",
                    value: IntegrationAuthType.BEARER_TOKEN,
                  },
                ]}
                value={field.value}
                onChange={field.onChange}
              />
              {field.value === IntegrationAuthType.BASIC && (
                <>
                  <Card className="mb-4">
                    <div className="grid">
                      <div className="col-6">
                        <label>Username</label>
                        <InputText
                          placeholder="Admin"
                          {...register("username")}
                        />
                      </div>
                      <div className="col-6">
                        {" "}
                        <label>Password</label>
                        <InputText
                          placeholder="Admin123"
                          {...register("password")}
                        />
                      </div>
                    </div>
                  </Card>
                </>
              )}
              {field.value === IntegrationAuthType.BEARER_TOKEN && (
                <Card className="mb-4">
                  <InputText
                    {...register("token")}
                    placeholder="$fn438hf348fh3$#fr3f$"
                  />
                </Card>
              )}
              {!updateMode && (
                <Button onClick={handleSubmit(createCms)} primary>
                  Create Custom Integration
                </Button>
              )}
            </FormStyle>
            <Paragraph className="mt-4">
              Need help? email us at{" "}
              <a href="mailto=admin@ghostwrites.ai">admin@ghostwrites.ai</a>
            </Paragraph>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default CustomPluginPage;
