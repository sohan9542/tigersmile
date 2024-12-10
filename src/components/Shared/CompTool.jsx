import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
const CompTool = ({ title }) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton>
        <HelpOutlineIcon style={{ width: "18px" }} />
      </IconButton>
    </Tooltip>
  );
};

export default CompTool;
