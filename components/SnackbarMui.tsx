import * as React from "react";

import { IconButton, Snackbar } from "@mui/material";
import Slide, { SlideProps } from "@mui/material/Slide";

import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/AuthContext";

interface IProps {
  text?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  bottom?: string;
  margin?: string;
  left?: string;
  right?: string;
  top?: string;
  border?: string;
  borderRadius?: string;
  background?: string;
  duration?: number;

  // children?: React.ReactNode | React.ReactNode[];
}
const SnackbarMui: React.FC<IProps> = ({
  text,
  width,
  height,
  maxWidth,
  bottom,
  margin,
  left,
  right,
  top,
  border,
  borderRadius,
  background,
  duration,
}) => {
  const { openSnackBar, setOpenSnackBar } = useAuth();

  const SnackbarStyle = {
    width: width,
    height: height,
    maxWidth: maxWidth,
    bottom: bottom,
    margin: margin,
    left: left,
    right: right,
    top: top,
    border: border,
    borderRadius: borderRadius,
    background: background,
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  console.log("openSnackBar: ", openSnackBar);

  return (
    <>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={duration}
        onClose={handleClose}
        message={text}
        action={action}
        style={SnackbarStyle}
      />
      {/* <Alert
        onClose={handleSnackBarClose}
        severity="warning"
        sx={{ width: "100%", textAlign: "center" }}
        >
        {snackBarText}
      </Alert> */}
      {/* </Snackbar> */}
    </>
  );
};
export default SnackbarMui;
