import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Button from "../common/form/Button";
import { ReactComponent as PlusIcon } from "../../assets/Icons/Plus.svg";
import { ReactComponent as PromoteIcon } from "../../assets/Icons/UpArrow.svg";
import Badge from "../common/Badge";
import AddWebsiteUrl from "../modals/AddWebsiteUrl";
import { ReactComponent as BlockIcon } from "../../assets/Icons/Block.svg";
import Card from "../common/Card";
import CardTitle from "../common/CardTitle";
import React, { useState } from "react";
import styled from "styled-components";
import { LinkStatus } from "./types/linkStatus";

const BlockIconWrapper = styled.div`
  .blocked {
    fill: #ff4a4a;
  }
  .promote {
    fill: var(--success);
  }
  svg {
    width: 12px;
    height: 12px;
  }
`;

const LinksManage: React.FC = () => {
  const [showAddBlockedWebsiteModal, setShowAddBlockedWebsiteModal] =
    useState(false);

  const websites = [
    { website: "ghostwrites.ai/termsofuse", status: LinkStatus.BLOCKED },
    { website: "ghostwrites.ai/shit", status: LinkStatus.PROMOTE },
  ];

  const statusBodyTemplate = (website: {
    website: string;
    status: LinkStatus;
  }) => {
    return (
      <div className="flex align-items-center">
        <BlockIconWrapper>
          {website.status === LinkStatus.BLOCKED ? (
            <BlockIcon className="blocked" />
          ) : (
            <PromoteIcon className="promote" />
          )}
        </BlockIconWrapper>
        <span className="ml-3">{website.website}</span>
      </div>
    );
  };

  return (
    <>
      <>
        <div className="flex justify-content-between align-items-center mb-3">
          <CardTitle
            title="Manage Links
          "
            className="mb-0"
          />
          <Button
            primary
            icon={<PlusIcon />}
            onClick={() => setShowAddBlockedWebsiteModal(true)}
          >
            Add URL
          </Button>
        </div>
        <div className="card">
          <DataTable value={websites} tableStyle={{ minWidth: "15rem" }}>
            {/* <Column field="website" header="Website URL"></Column> */}
            <Column header="Website URL" body={statusBodyTemplate}></Column>
          </DataTable>
        </div>
      </>
      {showAddBlockedWebsiteModal && (
        <React.Suspense fallback={""}>
          <AddWebsiteUrl onHide={() => setShowAddBlockedWebsiteModal(false)} />
        </React.Suspense>
      )}
    </>
  );
};

export default LinksManage;
