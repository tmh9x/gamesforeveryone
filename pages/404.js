import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  const navigate = () => {
    router.push("/");
  };
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <p style={{ cursor: "pointer" }} onClick={navigate}>
        Go Home
      </p>
      <Button onClick={navigate} variant="contained">
        Go Home
      </Button>
    </>
  );
}
