import styled from "styled-components";
import Button from "../../components/common/form/Button";
import { ReactComponent as PlusIcon } from "../../assets/Icons/Plus.svg";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Avatar } from "primereact/avatar";
import Badge from "../../components/common/Badge";
import { UserRole } from "../../core/types/userRole";
import { User } from "../../core/entities/user";
import React, { useMemo, useState } from "react";
import { formatUserName } from "../../common/utils/formatUserName";
import { Color } from "../../core/theme/types/color";
import { Theme } from "../../core/theme/theme";
import { useRecoilValue } from "recoil";
import { userState, usersState } from "../../state/userState";
import AddTeammateModal from "../../components/modals/AddTeammateModal";

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
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const AvatarStyled = styled(Avatar)`
  background-color: #0a2540;
  color: #ffffff;
`;

const TeamPage: React.FC = () => {
  const userEx = useRecoilValue(userState);
  const teammates = useRecoilValue(usersState);

  const statusBodyTemplate = (user: User) => {
    const fullName = `${formatUserName(user.firstName)} ${formatUserName(
      user.lastName
    )}`;

    return (
      <div className="flex align-items-center">
        <AvatarStyled
          label={user.email.at(0)?.toLocaleUpperCase()}
          shape="circle"
        />
        <span className="ml-3 mr-3">{fullName}</span>
        <div>
          <Badge
            bgColor={getColor(user.role).bg}
            textColor={getColor(user.role).text}
          >
            {user.role}
          </Badge>
        </div>
      </div>
    );
  };

  const getColor = (role: UserRole): { bg: Color; text: Color } => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return { bg: "purple", text: "bg" };

      case UserRole.ADMIN:
        return { bg: "pink", text: "bg" };

      case UserRole.EDITOR:
        return { bg: "yellow", text: "bg" };

      default:
        return { bg: "pink", text: "bg" };
    }
  };

  const [showAddTeammatesModal, setShowAddTeammatesModal] = useState(false);

  return (
    <>
      <div className="flex justify-content-between align-items-center mb-5">
        <div>
          <Title>חברי צוות</Title>
          <Subtitle>נהל את חברי הצוות שלך</Subtitle>
        </div>
        {(userEx?.role === UserRole.ADMIN ||
          userEx?.role === UserRole.SUPER_ADMIN) && (
          <Button
            primary
            icon={<PlusIcon />}
            onClick={() => setShowAddTeammatesModal(true)}
          >
            הוסף חבר צוות{" "}
          </Button>
        )}
      </div>

      <DataTable
        value={teammates}
        tableStyle={{ minWidth: "15rem" }}
        editMode="row"
      >
        {/* <Column field="website" header="Website URL"></Column> */}
        <Column
          bodyStyle={{ textAlign: "right" }}
          header="שם מלא"
          body={statusBodyTemplate}
        ></Column>
        <Column
          bodyStyle={{ textAlign: "right" }}
          header="אימייל"
          field="email"
        ></Column>
        <Column
          header="סטטוס"
          body={(user: User) => (user.isActive ? "פעיל" : "לא פעיל")}
          bodyStyle={{ textAlign: "right" }}
        ></Column>
        <Column
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        ></Column>
      </DataTable>
      {showAddTeammatesModal && (
        <AddTeammateModal onHide={() => setShowAddTeammatesModal(false)} />
      )}
    </>
  );
};

export default TeamPage;
