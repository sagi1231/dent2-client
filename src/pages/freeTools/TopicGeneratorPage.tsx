import styled from "styled-components";

const Title = styled.h1`
  text-align: center;

  /* position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 155px; */
  color: #0a2540;

  font-size: 48px;
  font-weight: 700;
  letter-spacing: -2.88px;
`;

const TopicGeneratorPage: React.FC = () => {
  return (
    <>
      <Title>Generate Topic Ideas</Title>
    </>
  );
};

export default TopicGeneratorPage;
