import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Card from "../../common/Card";
import CardTitle from "../../common/CardTitle";
import { useParams } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { classNames } from "primereact/utils";
import { KeywordsAnalytics } from "../../../core/entities/keywordsAnalytics";
import styled from "styled-components";

const EmptyMessageWrapper = styled.div`
  text-align: right;
  padding: 20px;
  font-weight: bold;
`;
const KeywordsTable: React.FC = () => {
  const { websiteId } = useParams();

  const stockBodyTemplate = (rowData: KeywordsAnalytics) => {
    const stockClassName = classNames(
      "border-circle w-2rem h-2rem inline-flex font-bold justify-content-center align-items-center text-sm",
      {
        "bg-orange-100 text-orange-900": rowData.views === 0,
        "bg-yellow-100 text-yellow-900":
          rowData.views > 0 && rowData.views < 40,
        "bg-teal-100 text-teal-900": rowData.views >= 40,
      }
    );

    return <div className={stockClassName}>{rowData.views}</div>;
  };
  return (
    <>
      <CardTitle title={"מילות מפתח מובילות"} />
      <Card></Card>
    </>
  );
};

export default KeywordsTable;
