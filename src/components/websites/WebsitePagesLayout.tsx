import { BreadCrumb } from "primereact/breadcrumb";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { websiteState } from "../../state/websitesState";

const Title = styled.h1`
  color: black;
  font-size: 28px;
  margin-bottom: 0px;
  margin-top: 0;
  font-weight: 600;
`;

const Subtitle = styled.h2`
  color: #c0c0c0;
  font-size: 16px;
  margin-bottom: 1.5em;
  margin-top: 0;
  font-weight: 300;
`;

const WebsitePageLayout: React.FC = () => {
  const { websiteId } = useParams();
  const website = useRecoilValue(websiteState(websiteId as string));

  return (
    <>
      <Title>{website?.domain}</Title>
      <Subtitle>overview your websites</Subtitle>
    </>
  );
};

export default WebsitePageLayout;
