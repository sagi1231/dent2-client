import React, { useMemo, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useRecoilValue } from "recoil";
import { bamTableState } from "../../state/bamTableState";
import {
  GridReadyEvent,
  SortChangedEvent,
  ICellRendererParams,
} from "ag-grid-community";

const MalshabBamGrid: React.FC = () => {
  const bamTable = useRecoilValue(bamTableState);
  const gridApiRef = useRef<any>(null);

  const columns = useMemo(
    () => [
      { headerName: "ID", field: "id" },
      { headerName: "Malshab ID", field: "malshabId" },
      { headerName: "Population", field: "population" },
      { headerName: "Status", field: "status" },
      { headerName: "Path", field: "path" },
      { headerName: "Horash", field: "horash" },
      {
        headerName: "Gius Date",
        field: "giusDate",
        sortable: true,
        filter: "agDateColumnFilter",
      },
      {
        headerName: "Trs Date",
        field: "trsDate",
        sortable: true,
        filter: "agDateColumnFilter",
      },
      { headerName: "Itur Reference", field: "iturReference" },
      { headerName: "Bam Reference", field: "bamReference" },
      { headerName: "Officer", field: "officer" },
      {
        headerName: "Got Papers",
        field: "gotPapers",
        cellRenderer: (params: ICellRendererParams) =>
          params.value ? "Yes" : "No",
      },
      { headerName: "Comment", field: "comment" },
      { headerName: "Bam Comment", field: "bamComment" },
      {
        headerName: "Archived",
        field: "isArchived",
        cellRenderer: (params: ICellRendererParams) =>
          params.value ? "Yes" : "No",
      },
      { headerName: "Interviewer", field: "interviewer" },
    ],
    []
  );

  const gridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
    },
    onGridReady: (params: GridReadyEvent) => {
      gridApiRef.current = params.api;
      params.api.sizeColumnsToFit();

      // Restore the sort model from localStorage if it exists
      const sortModel = localStorage.getItem("sortModel");
      if (sortModel) {
        // params.api.setSortModel(JSON.parse(sortModel));
      }
    },
    onSortChanged: (params: SortChangedEvent) => {
      // const sortModel = params.api.getSortModel();
      // if (sortModel.length > 0) {
      //   localStorage.setItem("sortModel", JSON.stringify(sortModel));
      // }
    },
  };

  useEffect(() => {
    return () => {
      if (gridApiRef.current) {
        const sortModel = gridApiRef.current.getSortModel();
        localStorage.setItem("sortModel", JSON.stringify(sortModel));
      }
    };
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      <AgGridReact
        gridOptions={gridOptions}
        rowData={bamTable}
        columnDefs={columns}
        animateRows={true}
      />
    </div>
  );
};

export default MalshabBamGrid;
