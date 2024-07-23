import { TriggerWorkerRequestData } from "../../../../core/services/requests/worker/triggerWorkerRequestData";
import styled from "styled-components";
import Tone from "../../../writerSettings/Tone";

const Title = styled.h1`
  color: #0a2540;
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -2.88px;
  margin-bottom: 30px;
`;

const ChooseWriter = () => {
  return (
    <div>
      <Title>בחר את קול הכותב שלך</Title>
      <Tone<TriggerWorkerRequestData> fieldName="tone" threeColumn />
    </div>
  );
};

export default ChooseWriter;
