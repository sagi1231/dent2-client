import styled from "styled-components";
import { ReactComponent as HelpIcon } from "../../assets/Icons/Help.svg";
import Button from "../common/form/Button";

interface Props {
  children?: JSX.Element | JSX.Element[];
  bullets: string[];
}

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.div`
  display: flex;
  gap: 10px;

  font-style: normal;

  letter-spacing: -0.02625rem;
  color: var(--title-color);
  font-size: 14px;
  font-weight: 600;

  & svg {
    fill: #0a2540;
    width: 0.81363rem;
    height: 0.81363rem;
  }
`;

const PackageIncludes: React.FC<Props> = ({ bullets }) => {
  return (
    <ListWrapper>
      {bullets.map((item, index) => (
        <ListItem key={index}>
          <div>{item}</div>
          <div>
            <HelpIcon />
          </div>
        </ListItem>
      ))}
    </ListWrapper>
  );
};

export default PackageIncludes;
