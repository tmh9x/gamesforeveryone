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
  open?:boolean;
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
}) => {

  const { setOpenAlert, openAlert } = useAuth();


  const handleClose = (event: any, reason?: string): void => {
    console.log("reason: ", reason);
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  console.log("openAlert: ", openAlert);

  return (
    <Dialog
      open={openAlert}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {text1}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {buttonTxt1 && (
          <Button onClick={(e) => handleClose(e, e)}>{buttonTxt1}</Button>
        )}
        {buttonTxt2 && (
          <Button onClick={(e) => handleClose(e, e)}>{buttonTxt2}</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default AlertDialogSlide;
