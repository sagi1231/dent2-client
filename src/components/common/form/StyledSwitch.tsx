import { Switch } from "@mui/material";
import styled from "styled-components";

const StyledSwitch = styled(Switch)`
  & .MuiSwitch-thumb {
    /* width: 20px;
    height: 20px; */
    box-shadow: none;
  }

  &.MuiSwitch-root {
    height: 50px;
    width: 71px;
    border-radius: 80px;
  }

  & .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase {
    padding: 15px;
  }

  & .css-1yjjitx-MuiSwitch-track {
    border-radius: 30px;
  }
`;

export default StyledSwitch;
