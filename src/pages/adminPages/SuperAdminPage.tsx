import { useRecoilValue } from "recoil";
import { allUsersState } from "../../state/userState";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";
import Button from "../../components/common/form/Button";
import Link from "../../components/common/Link";
import AppConfig from "../../config/appConfig";
import { useCallback, useEffect, useState } from "react";
import userService from "../../core/services/user.service";
import InputStyle from "../../components/common/form/InputStyle";
import { InputText } from "primereact/inputtext";
import { User } from "../../core/entities/user";

const DataGridStyled = styled(DataGrid)`
  background-color: white;
  border-radius: 13px;
  border: none !important;
`;

const SuperAdminAllUsersPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userService.getAllUsers(search).then((d) => setUsers(d));
  }, [search]);

  const generateSilentLoginLink = useCallback(async (id: string) => {
    const link = await userService.silentLoginLink(id);
    document.location.href = link;
  }, []);

  const columns: GridColDef[] = [
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
    },
    {
      field: "id",
      headerName: "Login as",
      renderCell: (params: any) => (
        <Link onClick={() => generateSilentLoginLink(params.id)}>Login</Link>
      ),
    },
  ];
  return (
    <>
      <InputText
        placeholder="kaki@gmail.com"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <DataGridStyled
        sortModel={[
          {
            field: "email",
            sort: "asc",
          },
        ]}
        columns={columns}
        rows={users || []}
        scrollbarSize={10}
      />
    </>
  );
};

export default SuperAdminAllUsersPage;
