import { useRecoilValue } from "recoil";
import { documentsSummariesState } from "../../state/documentState";
import { useParams } from "react-router";
import Link from "../common/Link";
import DocumentBlock from "../document/DocumentBlock";

const DocsList: React.FC = () => {
  const { websiteId } = useParams();
  const docs = useRecoilValue(documentsSummariesState(websiteId as string));
  return (
    <>
      {docs.map((doc) => (
        <DocumentBlock doc={doc} />
      ))}
    </>
  );
};

export default DocsList;
