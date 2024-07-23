import React, { ReactElement, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { DocumentEntityType, DocumentEntity } from "neword-core";
import { documentState } from "../../state/documentState";
import { useRecoilValue } from "recoil";
import Masonry from "@mui/lab/Masonry";

import { useFieldArray, useFormContext } from "react-hook-form";
import { BlockWrapper } from "./components/BlockWrapper";
import documentsDictionary from "./documentsDictionary";

const Wrapper = styled.div`
  padding: 10px;
  background-color: #f6f9fc;
  overflow-y: scroll;
  display: flex;
  flex-direction: row-reverse;
`;

const BlockSection: React.FC = () => {
  const { documentId } = useParams<{
    documentId: string;
  }>();
  const document = useRecoilValue(documentState(documentId as string));

  const {
    control,
    formState: { errors },
  } = useFormContext<DocumentEntity<typeof document.type>>();

  const { fields, append, remove } = useFieldArray<
    DocumentEntity<typeof document.type>
  >({
    control,
    name: "output",
  });

  const onDelet = (blockindex: number) => {
    remove(blockindex);
  };

  const columns = useMemo(
    () => documentsDictionary[document.type].columns,
    [document.type]
  );

  return (
    <Wrapper className="col-8 ">
      <Masonry columns={columns || 3}>
        {fields.map((block, index) => (
          <BlockWrapper key={block.id} index={index} onDelet={onDelet} />
        ))}
      </Masonry>
    </Wrapper>
  );
};

export default BlockSection;
