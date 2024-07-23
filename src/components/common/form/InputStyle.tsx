import styled from "styled-components";

const InputStyle = styled.div`
  input {
    width: 100%;
    border-radius: 6px !important;
    height: 50px;
    border-color: #e6e6e6;
    font-size: 14px;
  }
  small {
    opacity: 0.5;
  }
  .p-dropdown.p-component.p-inputwrapper {
    width: 100%;
    border-radius: 6px !important;
    height: 60px;
    border-color: #e6e6e6 !important;
    margin-top: 5px;

    span {
      margin-top: 8px;
      font-size: 14px;
    }
  }

  input::placeholder {
    font-size: 14px;
  }

  fieldset {
    border-color: #e6e6e6 !important;
    border-width: 1px !important;
  }

  input:enabled:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: none;
    border-color: #d6d6d6;
  }

  input:hover {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: none;
    border-color: #d6d6d6 !important;
  }

  input[readonly] {
    background: rgb(248 248 248);
    border-radius: 6px;
  }

  label {
    font-family: "" Assistant "" !important;
    font-size: 12px !important;
    font-weight: 500;
    line-height: 1.8em !important;
    letter-spacing: -0.03em;
  }

  label.MuiFormLabel-root.Mui-focused {
    color: #140a18 !important;
    font-weight: 400;
  }

  .MuiInputBase-formControl {
    border-radius: 6px !important;
  }

  .card-subtitle {
    margin-left: 0.5rem;
  }
`;

export default InputStyle;
