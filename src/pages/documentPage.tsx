import styled from "styled-components";
import { useParams } from "react-router";
import TopMenu from "../components/core/topMenu";
import FormWrapper from "../components/document/FormWrapper";
import BlockSection from "../components/document/BlockSection";
import { useRecoilValue } from "recoil";
import { DocumentEntity, DocumentTypeFactory } from "neword-core";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { documentState } from "../state/documentState";
import { useCallback, useEffect } from "react";
import { throttle } from "lodash";
import documentService from "../core/services/document.service";

const BodyWrapper = styled.div`
  display: flex;
  height: calc(100vh - 74px);
  margin-right: 97px;
  flex-direction: row;
`;

const DocumentPage: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();

  const document = useRecoilValue(documentState(documentId as string));

  const methods = useForm<DocumentEntity<typeof document.type>>({
    defaultValues: document,
  });

  const onOutputChange = async () => {
    const output = methods.getValues().output;

    await documentService.updateDocument({ ...document, output: output });
  };

  const submitDebounced = useCallback(throttle(onOutputChange, 100), [
    document,
  ]);

  const watchedValues = methods.watch(["output"]);

  useEffect(() => {
    submitDebounced();

    return () => {
      submitDebounced.cancel();
    };
  }, [submitDebounced, watchedValues]);

  return (
    <>
      <TopMenu />
      <FormProvider {...methods}>
        <form>
          <BodyWrapper>
            <FormWrapper />
            <BlockSection />
          </BodyWrapper>
        </form>
      </FormProvider>
    </>
  );
};

export default DocumentPage;
