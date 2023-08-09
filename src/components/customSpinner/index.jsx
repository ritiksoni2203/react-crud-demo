import React from "react";
import { Spinner } from "reactstrap";
import "./loader.css";

const CustomSpinner = () => {
  return (
    <div className="LoadingContainer">
      <div className="LoadingBox">
        <Spinner color="danger" />
      </div>
    </div>
  );
};
export default CustomSpinner;
