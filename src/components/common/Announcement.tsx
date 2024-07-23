import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../../assets/Icons/Close.svg";

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
  className?: string;
}

const AnnouncementWrapper = styled.div`
  height: 60px;
  background: var(--title-color);
  color: white;
  padding: 0px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--title-color);
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
  letter-spacing: -0.1px;
  text-transform: capitalize;
  & div {
    color: white;
  }
  & svg.icon {
    width: 20px;
    height: 20px;
  }
  & svg.icon path {
    fill: white;
  }
`;

const Announcement: React.FC<Props> = ({ children, className }) => {
  return (
    <AnnouncementWrapper className={className}>
      {children}
      <CloseIcon className="icon" />
    </AnnouncementWrapper>
  );
};

export default Announcement;
