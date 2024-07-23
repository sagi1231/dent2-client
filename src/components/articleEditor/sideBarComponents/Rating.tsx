import styled from "styled-components";
import { ReactComponent as VeryBadIcon } from "../../../assets/Icons/RatingIcons/VeryBad.svg";
import { ReactComponent as BadIcon } from "../../../assets/Icons/RatingIcons/Bad.svg";
import { ReactComponent as OkIcon } from "../../../assets/Icons/RatingIcons/Ok.svg";
import { ReactComponent as GoodIcon } from "../../../assets/Icons/RatingIcons/Good.svg";
import { ReactComponent as ExcellentIcon } from "../../../assets/Icons/RatingIcons/Excellent.svg";
import Card from "../../common/Card";
import CardTitle from "../../common/CardTitle";
import { useState } from "react";
import { RatingTypes } from "./types/RatingType";
import { ReactComponent as LightbulbIcon } from "../../../assets/Icons/Lightbulb.svg";

const RatingWrapper = styled.div`
  display: flex;
`;

const RatingBlockWrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div<{ active: Boolean }>`
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  svg {
    width: 20px;
    height: 20px;
    transition-duration: 0.1s;
    cursor: pointer;
    path {
      fill: ${(props) =>
        props.active ? "var(--primary-purple)" : "var(--title-color)"};
    }
  }
  svg:hover {
    width: 22px;
    height: 22px;
  }
`;

const NoticeWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    width: 40px;
    height: 40px;
  }

  small {
    color: var(--text-color);
  }
`;

const Rating: React.FC = () => {
  const [RatingActive, setRatingActive] = useState<RatingTypes>();

  return (
    <Card className="mb-3">
      <CardTitle title="Your Feedback Matters"></CardTitle>
      <RatingWrapper>
        <IconWrapper
          onClick={() => {
            setRatingActive(RatingTypes.VERY_BAD);
            console.log("click");
          }}
          active={RatingActive === RatingTypes.VERY_BAD}
        >
          <VeryBadIcon />
        </IconWrapper>
        <IconWrapper
          onClick={() => setRatingActive(RatingTypes.BAD)}
          active={RatingActive === RatingTypes.BAD}
        >
          <BadIcon />
        </IconWrapper>
        <IconWrapper
          onClick={() => setRatingActive(RatingTypes.OK)}
          active={RatingActive === RatingTypes.OK}
        >
          <OkIcon />
        </IconWrapper>
        <IconWrapper
          onClick={() => setRatingActive(RatingTypes.GOOD)}
          active={RatingActive === RatingTypes.GOOD}
        >
          <GoodIcon />
        </IconWrapper>
        <IconWrapper
          onClick={() => setRatingActive(RatingTypes.EXCELLENT)}
          active={RatingActive === RatingTypes.EXCELLENT}
        >
          <ExcellentIcon />
        </IconWrapper>
      </RatingWrapper>
      <NoticeWrapper>
        <LightbulbIcon />
        <small>
          Rating this article will help Ghostwrite AI to improve its articles in
          the future.
        </small>
      </NoticeWrapper>
    </Card>
  );
};

export default Rating;
