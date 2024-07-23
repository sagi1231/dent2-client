import styled from "styled-components";

interface Props {
  title?: string;
  subtitle?: string;
}
const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.029rem;
  margin-top: 30px;
  color: var(--title-color);
`;

const SectionSubTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.029rem;
  margin-bottom: 30px;
  color: var(--text-color);
`;
const PageTitle: React.FC<Props> = (props) => {
  return (
    <div className="ml-2">
      <SectionTitle>{props.title}</SectionTitle>
      <SectionSubTitle>{props.subtitle}</SectionSubTitle>
    </div>
  );
};

export default PageTitle;
