import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import SupportIcon from "@mui/icons-material/Support";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import emailjs from "@emailjs/browser";

const theme = createTheme();

export default function Contact() {
  const form = React.useRef<HTMLFormElement>();
  const currentForm = form.current;
  if (currentForm == null) return;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

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
            ref={form}
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
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
    </ThemeProvider>
  );
}
