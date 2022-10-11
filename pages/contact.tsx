import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import ReCAPTCHA from "react-google-recaptcha";
import SnackbarMui from "../components/alerts/SnackbarMui";
import SupportIcon from "@mui/icons-material/Support";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import emailjs from "@emailjs/browser";
import formatData from "../utils/formatData";
import { useAuth } from "../context/AuthContext";

const theme = createTheme();

interface IProps {}
const Contact: React.FC<IProps> = ({}) => {
  const { setOpenSnackBar } = useAuth();
  const [alertText, setAlertText] = React.useState("");

  const form = React.useRef<HTMLFormElement>();
  const currentForm = form.current;

 

  const recaptchaRef: any = React.useRef<ReCAPTCHA & HTMLDivElement>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // --- check if the fields are empty -------
    if (!data.get("email") || !data.get("fullname") || !data.get("message")) {
      console.log("no email");

      setAlertText("Please complete all fields!");
      setOpenSnackBar(true);
      return null;
    } else {
      const token = recaptchaRef?.current?.execute();

      if (currentForm == null) return;

      console.log({
        email: data.get("email"),
        fullname: data.get("fullname"),
        message: data.get("message"),
      });

      const serviceId: string = process.env
        .NEXT_PUBLIC_EMAIL_JS_SERVICE_ID as string;
      const templateId: string = process.env
        .NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID as string;
      const publicKey: string = process.env
        .NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY as string;

      emailjs.sendForm(serviceId, templateId, currentForm, publicKey).then(
        (result) => {
          console.log("result.text", result.text);
          setOpenSnackBar(true);
          setAlertText("Your message has been sent successfully");
          resetForm();
        },
        (error) => {
          console.log("error.text", error.text);
        }
      );
    }
  };

  const onReCAPTCHAChange = (captchaCode: any) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    // Else reCAPTCHA was executed successfully so proceed with the
    // alert

    // Reset the reCAPTCHA so that it can be executed again if user
    // submits another email.
    recaptchaRef?.current?.reset();
    // await recaptchaRef?.current?.executeAsync();
  };

  function resetForm() {
    // const form = document.getElementById("contact-form") as HTMLTableElement;
    const form = document.getElementById("contact-form") as HTMLFormElement;
    if (form !== null) {
      form.reset();
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <SupportIcon color="warning" />
          </Avatar>
          <Typography component="h1" variant="h5">
            How Can We Help You?
          </Typography>
          <Box
            id="contact-form"
            ref={form}
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={onReCAPTCHAChange}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fullname"
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  minRows={6}
                  maxRows={15}
                  name="message"
                  label="Message"
                  type="message"
                  id="message"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Message
            </Button>
          </Box>
        </Box>
      </Container>
      {alertText && <SnackbarMui text={alertText} top="10%" />}
    </ThemeProvider>
  );
};
export default Contact;
