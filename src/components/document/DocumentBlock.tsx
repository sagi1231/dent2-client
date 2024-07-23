import styled from "styled-components";
import Link from "../common/Link";
import { DocumentEntity, DocumentEntityType } from "neword-core";
import { useMemo } from "react";
import DocBoxes from "./components/DocBoxes";
import { Theme } from "../../core/theme/theme";

const BoxImage = styled.img`
  box-sizing: content-box;
  height: 90px;
  width: 120px;
  object-fit: cover;
  border-radius: 6px;
  transition-duration: 0.25s;
`;

const BoxDesc = styled.div`
  margin-top: 0px;
  display: flex !important;
  padding-right: 15px;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DocumentType = styled.span`
  font-size: 16px;
  line-break: auto;
  font-weight: 600;
  color: ${Theme.colors.purple};
`;

const DocName = styled.span`
  font-size: 16px;
  line-break: auto;
  font-weight: 400;
  color: black;
`;

const ArticleInformationWrapper = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  flex-wrap: wrap;
`;

const InformationItem = styled.span<{ $purple?: boolean }>`
  color: ${(props) => (props.$purple ? "#741FFF" : "black")};
  font-size: 12px;

  display: flex;
  align-items: center;
  svg {
    font-size: 14px;
    margin-left: 5px;
  }
`;

const ArticleKeywordsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const KeywordsBadge = styled.span`
  background: #f2f2f2;
  color: black;
  padding: 0.5em 1em;
  border-radius: 6px;
  background: rgb(242, 242, 242);
  color: black;
  padding: 0.5em 1em;

  font-size: 12px;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const IconButton = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 20px;
  color: #828282;
  font-size: 22px !important;
  transition-duration: 0.2s;
  border-radius: 6px;
  border: solid 1px var(--border-color);
  &:hover {
    border-color: var(--title-color);
  }
`;

const IconSizeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    width: 14px;
    height: 14px;
  }
`;

const CardWrapper = styled(Link)`
  border: 1px solid var(--input-border-color, #e6e6e6);
  border-radius: 6px;
  position: relative;
  height: 135px;
  background: white;
  padding: 15px;
  display: flex;
  flex-direction: row;

  &:hover {
    border-color: var(--title-color);
  }
  ${IconButton} {
    color: #741fff;
  }
`;

interface Props<T extends DocumentEntityType> {
  doc: Omit<DocumentEntity<T>, "output" | "inputParams">;
}

const DocumentBlock: React.FC<Props<any>> = ({ doc }) => {
  const docBox = useMemo(() => {
    return DocBoxes.find((box) => box.type === doc.type);
  }, [doc.type]);

  return (
    <div key={doc.id} className="col-12 relative">
      <CardWrapper className="articlewrapper" path={`/document/${doc.id}`}>
        <BoxImage src={docBox?.image} />

        <BoxDesc className="">
          <div className="flex">
            <DocumentType>
              {docBox?.title}
              {" | "}
            </DocumentType>
            &nbsp;
            <DocName>״{doc.name}״</DocName>
          </div>
        </BoxDesc>

        {/* <Link differentTab path={props.articleSummary.externalLink}>
            <PreviewButton />
          </Link>
          <IconButton /> */}
      </CardWrapper>
    </div>
  );
};

export default DocumentBlock;
