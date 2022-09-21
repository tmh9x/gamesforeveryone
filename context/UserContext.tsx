import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/config";

const UserContext = createContext<any>({});

export const useAuth = () => useContext(UserContext);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const [alertText2, setAlertText2] = useState<string>("");
  // const [isEmailAlreadyExists, setIsEmailAlreadyExists] = useState<boolean>(false);
  // const [alerTxt1, setAlerTxt1] = useState<string>('');
  // const [dialogTitle, setDialogTitle] = useState<string>('');
  // const [openSnackBar, setOpenSnackBar] = useState(false);
      

 

  const deleteUser = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userCredential: ", userCredential);
    } catch (err: any) {
    
      console.log("error in deleteUser in Context: ", err);
      }
    }
  };

  

   useEffect(() => {
    
    // return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
       
      }}
    >
      {loading ? null : children}
    </UserContext.Provider>
  );
};
