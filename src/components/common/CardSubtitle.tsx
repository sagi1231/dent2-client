import styled from "styled-components";

interface Props {
  subTitle: string;
  fullWidth?: boolean;
}

const Subtitle = styled.span`
  font-size: 16px;
  color: rgb(29, 26, 39);
  font-weight: 400;
  margin-top: 1.5em;
  margin-bottom: 0.75em;
  display: block;
`;

const CardSubtitle: React.FC<Props> = (props) => {
  return <Subtitle className="card-subtitle w-full">{props.subTitle}</Subtitle>;
};

export default CardSubtitle;
