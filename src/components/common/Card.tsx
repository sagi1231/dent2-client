import styled from "styled-components";

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
  className?: string;
  onClick?: () => void;
}

const CardWrapper = styled.div`
  background: white;
  padding: 1.5rem;
  border: 1px solid var(--border-color);

  border-radius: 8px;
`;

const Card: React.FC<Props> = ({ children, className, onClick }) => {
  return (
    <CardWrapper onClick={onClick} className={className}>
      {children}
    </CardWrapper>
  );
};

export default Card;
