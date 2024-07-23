import styled from "styled-components";

interface Props {
  title: string;
  icon?: JSX.Element;
  subTitle?: string;
}

const Wrapper = styled.div`
  margin-bottom: 1.5em;
`;

const IconWrapper = styled.div`
  display: flex;
  /* background: #eae2fe; */
  color: black;
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
  margin-right: 1.5em;

  & svg {
    width: 25px;
    height: 25px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    font-size: 16px;
    color: var(--title-color);
    font-weight: 600;
  }
`;

const CardIconTitle: React.FC<Props> = (props) => {
  return (
    <Wrapper className="flex flex-row">
      <IconWrapper>{props.icon}</IconWrapper>
      <TextWrapper>
        <span>{props.title}</span>
        {props.subTitle && <h5>{props.subTitle}</h5>}
      </TextWrapper>
    </Wrapper>
  );
};

export default CardIconTitle;
