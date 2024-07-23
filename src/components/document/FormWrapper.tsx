import styled from "styled-components";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { useParams } from "react-router";
import { DocumentEntity, DocumentEntityType } from "neword-core";
import { useMemo, useState } from "react";
import Button from "../common/form/Button";
import { useRecoilState } from "recoil";
import { documentState } from "../../state/documentState";
import documentService from "../../core/services/document.service";
import DescriptionInput from "./components/DescriptionInput";
import { InputText } from "primereact/inputtext";
import documentsDictionary from "./documentsDictionary";
import AttachmentInput from "../common/form/AttachmentInput";
import AudienceSelect from "../common/form/AudienceSelect";

const TextHeader = styled.div`
  color: #000;
  font-family: "Assistant";
  font-size: 18.298px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%; /* 20.128px */
  letter-spacing: -0.549px;
  margin-top: 20px;
  margin-bottom: 17px;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 30px;
  flex: 1;
  border: 1px solid #e6e6e6;
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-top: 40px;
  background: var(--main-hebrew, #6300c1);
  width: 170px;
  justify-content: center;
`;

const FormWrapper: React.FC = () => {
  const { documentId } = useParams<{
    documentId: string;
  }>();
  const [document, setDocument] = useRecoilState(
    documentState(documentId as string)
  );
  const [isLoading, setIsLoaded] = useState(false);

  const FormComponent = useMemo(
    () => documentsDictionary[document.type].form,
    [document.type]
  );

  const methods = useFormContext<DocumentEntity<typeof document.type>>();
  const [, setDoc] = useRecoilState(documentState(documentId as string));

  const onGenerate = async () => {
    setIsLoaded(true);
    const params = methods.getValues().inputParams;

    try {
      const doc = await documentService.generateDocument(
        documentId as string,
        params
      );
      setDoc(doc);
      methods.setValue("output", doc.output);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoaded(false);
    }
  };

  return (
    <Wrapper className="col-4">
      <FormProvider {...methods}>
        <DescriptionInput />
        {<FormComponent />}
        <TextHeader>תמונת הפוסט</TextHeader>
        <AttachmentInput<
          DocumentEntity<DocumentEntityType.INSTAGRAM_CAPTION>
        > name="inputParams.imageUrl" />

        <TextHeader>קהל יעד</TextHeader>

        <AudienceSelect fieldName="test" />

        <StyledButton
          loading={isLoading}
          onClick={methods.handleSubmit(onGenerate)}
          primary
        >
          יצירת תוכן
        </StyledButton>
      </FormProvider>
    </Wrapper>
  );
};

export default FormWrapper;
