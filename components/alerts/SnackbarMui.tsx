import * as React from "react";

import { Alert, IconButton, Snackbar } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../context/AuthContext";

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

}

const SnackbarMui: React.FC<IProps> = ({
  text,
  width = "90%",
  height = "30px",
  maxWidth = "80%",
  margin= 'auto auto',
  left = "0",
  right = "0",
  top = "50%",
  bottom= 'unset',
  border,
  borderRadius,
  background,
  duration = 3000,
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
      
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="large" />
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
        onClose={handleClose}
        severity="warning"
        sx={{ width: "100%", textAlign: "center",backgroundColor:'blue' }}
      >
        {text}
      </Alert> */}
      {/* </Snackbar> */}
    </>
  );
};
export default SnackbarMui;
