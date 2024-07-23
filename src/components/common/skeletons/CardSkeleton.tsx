import { Skeleton } from "@mui/material";
import styled from "styled-components";
import Link from "../Link";

const BoxImage = styled(Skeleton)`
  width: 40%;
  box-sizing: content-box;
  height: 100%;
  object-fit: cover;
  border-radius: 13px;
  transition-duration: 0.25s;
`;

const BoxDesc = styled.div`
  font-size: 16px;
  margin-left: 20px;
  display: flex !important;
  flex-direction: column;
  line-break: anywhere;
  font-weight: 600;
`;

const ManageLink = styled.a`
  font-size: 14px;
  color: #510bf4;
  text-decoration: none;
  font-weight: 300;
`;

const CardWrapper = styled.div`
  border-radius: 13px;
  padding: 0px;
  position: relative;
  height: 160px;
  padding: 15px;
  display: block;

  &:hover {
    ${BoxImage} {
      transform: scale(0.9);
    }
  }
`;

const CardSkeleton: React.FC = () => {
  return (
    <div className="col-4 p-3">
      <CardWrapper>
        <Skeleton width={"70%"} variant="text"></Skeleton>
        <Skeleton width={"80%"} variant="text"></Skeleton>
        <Skeleton variant="rectangular" width={"90%"} height={"70%"} />
      </CardWrapper>
    </div>
  );
};

export default CardSkeleton;
