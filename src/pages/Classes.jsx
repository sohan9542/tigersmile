import React from "react";
import LayoutContainer from "../layout/LayoutContainer";
import Button from "@mui/material/Button";
import { subjects } from "../assets/subjects";
import { Link } from "react-router-dom";
const Classes = () => {
  return (
    <LayoutContainer>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10">
        {subjects.map((item, ind) => (
          <Link to='/calender'>
          <Button
            variant="outlined"
            key={ind}
            fullWidth
            className="font-semibold"
            style={{ height: "200px" }}
          >
            {item.name}
          </Button></Link>
        ))}
      </div>
    </LayoutContainer>
  );
};

export default Classes;
