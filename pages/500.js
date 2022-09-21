import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Custom500() {
  const router = useRouter();
  const navigate = () => {
    router.push("/");
  };
  return (
    <>
      <h1>500 - Server-side error occurred</h1>
      <p style={{ cursor: "pointer" }} onClick={navigate}>
        Go Home
      </p>
      <Button onClick={navigate} variant="contained">
        Go Home
      </Button>
    </>
  );
}
