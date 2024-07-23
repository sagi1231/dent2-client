import styled from "styled-components";

const FormStyle = styled.form`
  input {
    width: 100%;
    border-radius: 8px;
    height: 50px;
    border: 1px solid #e6e6e6;
    margin-top: 10px;
    padding: 20px;
    color: #0a2540;
    font-size: 14px;
    letter-spacing: -0.36px;
  }

  textarea {
    width: 100%;
    border-radius: 8px;
    border: 1px solid #e6e6e6;
    margin-top: 10px;
    padding: 20px;
    color: #0a2540;
    font-size: 14px;
    letter-spacing: -0.36px;
  }

  .p-dropdown.p-component.p-inputwrapper {
    width: 100%;
    border-radius: 8px;
    height: 50px;
    border-color: #e6e6e6 !important;
    margin-top: 10px;

    span {
      margin-top: 4px;
      font-size: 14px;
    }
  }

  input::placeholder {
    font-size: 14px;
    color: #83878a;

    letter-spacing: -0.36px;
  }

  textarea::placeholder {
    font-size: 14px !important;
  }

  fieldset {
    border-color: #e6e6e6 !important;
    border-width: 1px !important;
  }

  input:enabled:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: none;
    border-color: var(--title-color);
  }

  textarea:enabled:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: none;
    border-color: var(--title-color);
  }

  textarea:hover {
    border-color: #d6d6d6 !important;
  }

  input:hover {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: none;
    border-color: var(--title-color) !important;
  }

  input[readonly] {
    background: rgb(248 248 248);
    border-radius: 8px;
  }

  label {
    color: #425466;

    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.36px;
    text-transform: capitalize;
  }

  label.MuiFormLabel-root.Mui-focused {
    color: #140a18 !important;
    font-weight: 400;
  }

  .MuiInputBase-formControl {
    border-radius: 8px !important;
  }

  .card-subtitle {
    margin-right: 0.5rem;
  }
`;

export default FormStyle;
