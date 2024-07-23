import Lottie from "lottie-react";
import { Skeleton } from "primereact/skeleton";
import styled from "styled-components";
import PenAnimation from "../../assets/Icons/PenLottie.json";
import Card from "../common/Card";

const CardStyle = styled.div`
  border: 1px solid var(--input-border-color, #e6e6e6);
  border-radius: 6px;
  position: relative;
  height: 160px;
  background: white;
  padding: 15px;
  display: flex;
  align-items: center;
`;

const SkeletonWrapper = styled.div`
  width: calc(100% - 160px);

  .bg-purple {
    background-color: var(--primary-purple);
    opacity: 0.5;
  }
`;

const GeneratingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  align-items: center;
  margin-top: 20px;
  letter-spacing: -0.4px;
  position: absolute;
  right: 25px;
  bottom: 15px;
`;

const style = {
  height: 35,
};

const GeneratingArticleLoader = () => {
  return (
    <div className="col-12">
      <CardStyle>
        <Skeleton height="130px" width="160px" className="mr-2"></Skeleton>
        <SkeletonWrapper>
          <Skeleton width="7%" height="25px" className="mb-3"></Skeleton>
          <Skeleton width="40%" className="mb-3"></Skeleton>
          <div className="flex">
            <Skeleton width="10%" className="mr-2"></Skeleton>
            <Skeleton width="10%" className="mr-2"></Skeleton>
            <Skeleton width="10%" className="mr-2"></Skeleton>
            <Skeleton width="10%" className="mr-2"></Skeleton>
            <Skeleton width="10%" className="mr-2"></Skeleton>
            <Skeleton width="10%" className="mr-2"></Skeleton>
          </div>
        </SkeletonWrapper>
        <GeneratingWrapper>
          <Lottie animationData={PenAnimation} loop={true} style={style} />
          <div className="flex flex-column ml-3">
            <small>Neword</small>
            <span>מייצרים מאמר</span>
          </div>
        </GeneratingWrapper>
      </CardStyle>
    </div>
  );
};

export default GeneratingArticleLoader;
