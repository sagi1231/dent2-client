import styled from "styled-components";
import Card from "../../../common/Card";
import { ContentCardIcons, ContentCardIconKey } from "./iconMappings";
import { ContentCardType } from "./cardTypes";
import { useMemo } from "react";
import { Theme } from "../../../../core/theme/theme";

type iconColor = "green" | "purple";

interface Props {
  title: string;
  image: string;
  description: string;
  type: ContentCardType | any; // Add 'type' property with ContentCardType type
  highlightTitleTerm?: string;
}

const CardStyled = styled(Card)<Props>`
  display: flex;
  border: 1px solid var(--input-border-color, #e6e6e6);
  flex-direction: column;
  padding: 12px;
  cursor: pointer;

  &:hover {
    border: 1px solid var(--title-color, #e6e6e6);
  }
`;

const ImageWrapper = styled.div<Props>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
  margin-bottom: 12px;
  img {
    width: 100%;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BoxTitle = styled.span`
  color: var(--title-color, #0a2540);

  leading-trim: both;
  text-edge: cap;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 1rem */
  letter-spacing: -0.03rem;
`;

const BoxDesc = styled.span<Props>`
  color: var(--title-color, #0a2540);
  text-align: right;
  leading-trim: both;
  text-edge: cap;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 0.875rem */
  letter-spacing: -0.02625rem;
`;

const IconWrapper = styled.div`
  margin-top: 30px;
`;

const ContentCard: React.FC<Props> = (props) => {
  const title = useMemo(
    () =>
      props.highlightTitleTerm
        ? props.title.replace(
            new RegExp(props.highlightTitleTerm, "gi"),
            (match) =>
              `<span style='background-color:${Theme.colors.purpleOpacity};'>${match}</span>`
          )
        : props.title,
    [props.title, props.highlightTitleTerm]
  );

  const titleHtml = useMemo(
    () => ({
      __html: title,
    }),
    [title]
  );

  const IconComponent = ContentCardIcons[props.type as ContentCardIconKey];
  return (
    <>
      <CardStyled {...props}>
        <ImageWrapper {...props}>
          <img src={props.image} alt="icon" />
        </ImageWrapper>

        <TextWrapper>
          <BoxTitle dangerouslySetInnerHTML={titleHtml}></BoxTitle>
          <BoxDesc {...props}>{props.description}</BoxDesc>
        </TextWrapper>
        <IconWrapper>
          <IconComponent /> {/* Render the correct icon component */}
        </IconWrapper>
      </CardStyled>
    </>
  );
};

export default ContentCard;
