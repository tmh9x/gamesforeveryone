import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/config";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEmailAlreadyExists, setIsEmailAlreadyExists] = useState<boolean>(false);
  const [alertText2, setAlertText2] = useState<string>("");
  const [alerTxt1, setAlerTxt1] = useState<string>('');
  const [dialogTitle, setDialogTitle] = useState<string>('');
      
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userCredential: ", userCredential);
    } catch (err: any) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        setIsEmailAlreadyExists(true);
        setOpenAlert(true);
        setAlerTxt1(
          'This email already registered. Please try with another email.'
        );
      }
      console.log("error in signup in Context: ", err);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (err:any) {
        if (err.message === "Firebase: Error (auth/user-not-found).") {
          setIsEmailAlreadyExists(false);
          setOpenAlert(true);
          setAlerTxt1(
            "This email is not exists. Please try with another email."
          );
        }
      console.log("err: ", err.message === "Firebase: Error (auth/user-not-found).");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  console.log("user", user);
    console.log("openAlert: ", openAlert);
  console.log("isEmailAlreadyExists: ", isEmailAlreadyExists);
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        openAlert,
        setOpenAlert,
        alertText2,
        setAlertText2,
        alerTxt1,
        setAlerTxt1,
        dialogTitle,
        setDialogTitle,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
