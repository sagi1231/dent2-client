import styled from "styled-components";
import Card from "../../../common/Card";
import { DocumentCategory } from "neword-core";

interface Props {
  title: string;
  icon: JSX.Element;
  selected?: boolean;
  onClick: () => void;
}

const CardStyled = styled(Card)<Props>`
  cursor: pointer;
  padding: 15px 20px;
  display: flex;
  border-radius: 8px;
  border: ${(props) =>
    props.selected
      ? "1px solid var(--primary-purple, #e6e6e6)"
      : "1px solid var(--input-border-color, #e6e6e6)"};
  align-items: center;

  &:hover {
    border: 1px solid var(--primary-purple, #e6e6e6);
  }
`;

const IconWrapper = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
  height: 30px;
  width: 30px;
`;

const TextWrapper = styled.div`
  padding-right: 1.5em;
  display: flex;
  flex-direction: column;
`;

const BoxTitle = styled.span`
  font-size: 12px;
  width: 100%;
  letter-spacing: -0px;
  font-weight: bold;
`;

const CardFilterItem: React.FC<Props> = (props) => {
  return (
    <CardStyled {...props}>
      <IconWrapper {...props}>{props.icon}</IconWrapper>

      <TextWrapper>
        <BoxTitle>{props.title}</BoxTitle>
      </TextWrapper>
    </CardStyled>
  );
};

export default CardFilterItem;
