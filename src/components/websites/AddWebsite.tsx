import styled from "styled-components";
import { Image } from "primereact/image";
import AddIcon from "@mui/icons-material/Add";
import Link from "../common/Link";

const PriceText = styled.span`
  font-size: 16px;
  display: block;
  color: white;
  margin-top: 5px;
`;

const UpgradeText = styled.span`
  font-size: 38px;
  font-weight: 700;
  color: white;
  letter-spacing: -0.12rem;

  display: block;
`;

const PlusButton = styled.div`
  width: 60px;
  height: 60px;
  background: white;
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 0.25s;
`;

const CardWrapper = styled.div`
  border-radius: 13px;
  position: relative;
  padding: 0px;
  height: 160px;
  cursor: pointer;
  background: #741fff;

  /* &:hover {
    ${PlusButton} {
      bottom: -10px;
      right: -10px;
    }
  } */
`;

const AddWebsite: React.FC = () => {
  return (
    <Link path="/websites/new" className="col-4">
      <CardWrapper>
        <div className="p-3">
          <UpgradeText>Add Website</UpgradeText>
          <PriceText>Create a new writer and connect it</PriceText>
        </div>
        <PlusButton>
          <AddIcon />
        </PlusButton>
      </CardWrapper>
    </Link>
  );
};

export default AddWebsite;
