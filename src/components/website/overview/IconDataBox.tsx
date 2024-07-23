import styled from "styled-components";
import Card from "../../common/Card";

type iconColor = "green" | "purple";

interface Props {
  iconColor: iconColor;
  icon?: JSX.Element;
  boxTitle: string;
  boxNumber: number;
  marginBottom?: boolean;
}

const CardStyled = styled(Card)<Props>`
  height: 102px;
  display: flex;
  border: 1px solid var(--input-border-color, #e6e6e6);

  align-items: center;
  ${(props) =>
    props.marginBottom
      ? `
        margin-bottom: 1em;
      `
      : ""}
`;

const IconWrapper = styled.div<Props>`
  /* background: ${(props) => getIconBackgroundColor(props)}; */
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13px;

  svg {
    width: 30px;
    height: 30px;

    path {
      fill: ${(props) => getIconBackgroundColor(props)};
    }
  }
`;

const TextWrapper = styled.div`
  padding-left: 1.5em;
  display: flex;
  flex-direction: column;
`;

const BoxTitle = styled.span`
  font-size: 14px;
  width: 100%;
  letter-spacing: -0px;
`;

const BoxDesc = styled.span<Props>`
  color: ${(props) => getIconBackgroundColor(props)};
  font-size: 24px;
  font-weight: 600;
`;

const getIconBackgroundColor = (props: Props) => {
  if (props.iconColor === "green") {
    return "#FFCB57";
  }
  return "#A960EE";
};

const IconDataBox: React.FC<Props> = (props) => {
  return (
    <>
      <CardStyled {...props}>
        <IconWrapper {...props}>{props.icon}</IconWrapper>

        <TextWrapper>
          <BoxTitle>{props.boxTitle}</BoxTitle>
          <BoxDesc {...props}>{props.boxNumber}</BoxDesc>
        </TextWrapper>
      </CardStyled>
    </>
  );
};

export default IconDataBox;
