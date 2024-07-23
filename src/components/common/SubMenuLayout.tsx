import styled from "styled-components";

interface Props {
  children: React.ReactElement;
  sideBar: React.ReactElement;
}

const SideBar = styled.div`
  width: 10rem;
  height: calc(100vh - 75px);
  padding-right: 20px;
  border-right: solid 1px var(--border-color);
  margin-right: 20px;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;

const Content = styled.div`
  width: calc(100% - 12rem);
`;

const SubMenuLayout: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <SideBar>{props.sideBar}</SideBar>
      <Content>{props.children}</Content>
    </Wrapper>
  );
};

export default SubMenuLayout;
