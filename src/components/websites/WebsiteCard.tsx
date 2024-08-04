import { useMemo } from "react";
import ProgressiveImage from "react-progressive-graceful-image";
import styled from "styled-components";
import { formatWebsiteUrl } from "../../common/utils/formatWebsiteUrl";

import Link from "../common/Link";
import { SpeedDial } from "primereact/speeddial";
import bgsrc from "../../assets/images/card-bg.png";
import Button from "../common/form/Button";
import { ReactComponent as ArrowRight } from "../../assets/Icons/ArrowRight.svg";

interface Props {
  websiteId: string;
  websiteDomain: string;
}

const ImageWrapper = styled.div`
  padding: 20px;
  border: solid 1px var(--border-color);
  border-radius: 13px;
  margin-bottom: 20px;
`;
const BoxImage = styled.img`
  width: 100%;
  box-sizing: content-box;
  object-fit: contain;
  height: 193px;
  border-radius: 13px;

  transition-duration: 0.25s;
`;

const BoxDesc = styled.div`
  text-transform: lowercase;
  display: flex !important;
  flex-direction: column;
  color: var(--title-color);
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  line-height: 100%; /* 1.25rem */
  letter-spacing: -0.0375rem;
  gap: 7px;
`;

const ManageLink = styled.div`
  margin-left: 5px;
  background: white;
  border-radius: 600px;
  color: var(--title-color);
  font-weight: 500;
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  line-height: 100%; /* 1.25rem */
  letter-spacing: -0.0375rem;
  gap: 3px;
  display: flex;
  align-items: center;
  text-transform: lowercase;
  transition: transform 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
  transition-property: background-color, opacity;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  & .HoverArrow {
    --arrowSpacing: 5px;
    --arrowHoverTransition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
    --arrowHoverOffset: translateX(3px);
    --arrowTipTransform: none;
    --arrowLineOpacity: 0;
    position: relative;
    top: 1px;
    margin-left: var(--arrowSpacing);

    stroke-width: 2px;
    fill: none;
    stroke: currentColor;
  }
  & .HoverArrow__linePath {
    opacity: var(--arrowLineOpacity);
    transition: opacity var(--hoverTransition, var(--arrowHoverTransition));
  }
  & .HoverArrow__tipPath {
    transform: var(--arrowTipTransform);
    transition: transform var(--hoverTransition, var(--arrowHoverTransition));
  }
`;

const CardWrapper = styled.div`
  border-radius: 13px;
  position: relative;
  background: white;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  padding: 20px;
  display: flex;
  flex-direction: column;

  &:hover .HoverArrow__linePath {
    opacity: 1;
  }

  &:hover .HoverArrow__tipPath {
    opacity: 1;
    transition: transform 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translateX(3px);
  }
`;

const WebsiteCard: React.FC<Props> = (props) => {
  return (
    <div className="col-3">
      <Link path={`/`}>
        <CardWrapper>
          <ImageWrapper>
            <ProgressiveImage
              src={`https://icon.horse/icon/${props.websiteDomain}`}
              placeholder={bgsrc}
            >
              {(src) => <BoxImage src={src} />}
            </ProgressiveImage>
          </ImageWrapper>
          <BoxDesc className="">
            {/* <span></span> */}
            <ManageLink>
              {props.websiteDomain}
              <ArrowRight />
            </ManageLink>
          </BoxDesc>
        </CardWrapper>
      </Link>
    </div>
  );
};

export default WebsiteCard;
