import "../styles/globals.css";

import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/AuthContext";
import { Children } from "react";
// import Login from "./login";
import NavBar from "../components/NavBar";
// import SignUp from "./SignUp";
// import SignUpPage from "./SignUpPage";
import ProtectedRoute from "../components/ProtectedRoute";
import { useRouter } from "next/router";

const noAuthRequired = ["/", "/login", "/signup"];

function MyApp({ Component, pageProps }: AppProps) {
const router = useRouter();
  return (
    <>
      <AuthContextProvider>
        <NavBar />
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
