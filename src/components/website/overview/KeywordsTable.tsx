import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Card from "../../common/Card";
import CardTitle from "../../common/CardTitle";
import { useParams } from "react-router";
import { workerState } from "../../../state/workerState";
import { useRecoilState, useRecoilValue } from "recoil";
import { websiteDashboardDataState } from "../../../state/websiteDashboardDataState";
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
  const websiteDashboardData = useRecoilValue(
    websiteDashboardDataState(websiteId as string)
  );

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
      <Card>
        <DataTable
          emptyMessage={
            <EmptyMessageWrapper>לא נמצאו מילות מפתח</EmptyMessageWrapper>
          }
          value={websiteDashboardData.keywordsAnalytics}
        >
          <Column field="baseKeyword" header="מילות מפתח"></Column>
          <Column field="articles" header="כמות פוסטים"></Column>
          <Column
            field="views"
            header="כמות צפיות"
            body={stockBodyTemplate}
          ></Column>
        </DataTable>
      </Card>
    </>
  );
};

export default KeywordsTable;
