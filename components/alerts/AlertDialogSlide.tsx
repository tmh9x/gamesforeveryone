import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useAuth } from "../../context/AuthContext";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  text1?: string;
  text2?: string;
  dialogTitle?: string;
  buttonTxt1?: string;
  buttonTxt2?: string;
  open?: boolean;
  buttonVariant1?: any;
  buttonVariant2?: any;
  buttonColor1?: any;
  buttonColor2?: any;
  allowFunction?: any;
  rejectFunction?: any;
  children?: React.ReactNode | React.ReactNode[];
}
const AlertDialogSlide: React.FC<IProps> = ({
  text1,
  text2,
  dialogTitle,
  children,
  buttonTxt1,
  buttonTxt2,
  open,
  buttonVariant1,
  buttonVariant2,
  buttonColor1,
  buttonColor2,
  allowFunction,
  rejectFunction,
}) => {
  const { setOpenAlert, openAlert, dialogTitleContext, alerTxt1 } = useAuth();

  const handleClose = (event: any, reason?: string): void => {
    const value = event.target.value;
    // allow  delete
    if (allowFunction && value === "delete") {
      allowFunction();
    }
    console.log("reason: ", reason);
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  // console.log("openAlert: ", openAlert);
  // console.log("allowFunction: ", allowFunction);

  return (
    <Dialog
      open={openAlert}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {dialogTitle ? dialogTitle : dialogTitleContext}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {text1 ? text1 : alerTxt1}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        className="dialog-btn-con"
        sx={{ justifyContent: "space-around" }}
      >
        {buttonTxt1 && (
          <Button
            variant={buttonVariant1}
            color={buttonColor1}
            onClick={(e) => handleClose(e)}
          >
            {buttonTxt1}
          </Button>
        )}
        {buttonTxt2 && (
          <Button
            value={buttonTxt2}
            variant={buttonVariant2}
            color={buttonColor2}
            onClick={(e) => handleClose(e)}
          >
            {buttonTxt2}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default AlertDialogSlide;
