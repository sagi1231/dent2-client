import styled from "styled-components";

const Wrapper = styled.div`
  /* ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
} */

  .tg-list {
    text-align: center;
    display: flex;
    align-items: center;
  }

  .tg-list-item {
    margin: 0 2em;
  }

  /* h2 {
  color: #777;
}

h4 {
  color: #999;
} */

  .tgl {
    display: none;

    // add default box-sizing for this scope
    &,
    &:after,
    &:before,
    & *,
    & *:after,
    & *:before,
    & + .tgl-btn {
      box-sizing: border-box;
      &::selection {
        background: none;
      }
    }

    + .tgl-btn {
      outline: 0;
      display: block;
      width: 4em;
      height: 2em;
      position: relative;
      cursor: pointer;
      user-select: none;
      &:after,
      &:before {
        position: relative;
        display: block;
        content: "";
        width: 50%;
        height: 100%;
      }

      &:after {
        left: 0;
      }

      &:before {
        display: none;
      }
    }

    &:checked + .tgl-btn:after {
      left: 50%;
    }
  }

  .tgl-ios {
    + .tgl-btn {
      background: #fbfbfb;
      border-radius: 2em;
      padding: 2px;
      transition: all 0.4s ease;
      border: 1px solid #e8eae9;
      &:after {
        border-radius: 2em;
        background: #fbfbfb;
        transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
          padding 0.3s ease, margin 0.3s ease;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);
      }

      &:hover:after {
        will-change: padding;
      }

      &:active {
        box-shadow: inset 0 0 0 2em #e8eae9;
        &:after {
          padding-right: 0.8em;
        }
      }
    }

    &:checked + .tgl-btn {
      background: #86d993;
      &:active {
        box-shadow: none;
        &:after {
          margin-left: -0.8em;
        }
      }
    }
  }
`;

const Toggle: React.FC = () => {
  return (
    <Wrapper>
      {/* <input className="tgl tgl-ios" id="cb2" type="checkbox" />
      <label className="tgl-btn" for="cb2"></label> */}
    </Wrapper>
  );
};

export default Toggle;
