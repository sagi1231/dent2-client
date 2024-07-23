import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { formatUserName } from "../../../common/utils/formatUserName";
import { PublishIntegration } from "../../../core/entities/publishIntegration";
import Card from "../../common/Card";
import CardTitle from "../../common/CardTitle";

const CardWrapper = styled.div`
  background: white;
  padding: 0 1.5rem;
  padding-top: 1.5rem;
  height: 220px;
  border-radius: 13px;
`;

const ColTitle = styled.span`
  display: block;
  font-size: 14px;
`;

const ColContent = styled.span`
  display: block;
  color: #c0c0c0;
  font-size: 12px;
`;

interface Props {
  website: PublishIntegration;
}

const WebsiteMetaData: React.FC<Props> = ({ website }) => {
  return (
    <Card className="mt-3">
      <CardTitle title="Information & Metadata"></CardTitle>
      <div className="grid">
        <div className="col-6 flex-column">
          <ColTitle>Website URL</ColTitle>
          <ColContent>{website.websiteUrl}</ColContent>
          <br />
          <ColTitle>Website ID</ColTitle>
          <ColContent>{website.id}</ColContent>
        </div>
        <div className="col-6 flex-column">
          <ColTitle>Type</ColTitle>
          <ColContent>{formatUserName(website.type.toLowerCase())}</ColContent>
          <br />
          <ColTitle>Created At</ColTitle>
          <ColContent>{new Date(website.createdAt).toDateString()}</ColContent>
        </div>
      </div>
    </Card>
  );
};

export default WebsiteMetaData;
