import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
  const [isEmailAlreadyExists, setIsEmailAlreadyExists] =
    useState<boolean>(false);
  const [alertText2, setAlertText2] = useState<string>("");
  const [alerTxt1, setAlerTxt1] = useState<string>("");
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [dbUsers, setDbUsers] = useState<any>(null);

  // ------------- used in edit-user.tsx ---- -- starts
  type TEditedUserData = {
    username?: string;
    first_name?: string;
    last_name?: string;
    birthday?: string;
    gender?: string;
    street?: string;
    postcode?: number;
    city?: string;
    phone?: number;
    email?: string;
    authId?: string;
    id?: string;
    // password1: string;
    // password2: string;
  };
  const [editedUserData, setEditedUserData] = useState<TEditedUserData>({
    username: "",
    first_name: "",
    last_name: "",
    birthday: "",
    gender: "",
    street: "",
    postcode: 0,
    city: "",
    phone: 0,
    email: "",
    authId: "",
    id: "",
    // password1: "",
    // password2: "",
  });
  // ------------- used in edit-user.tsx ---- -- starts
  // -------- Handle Input - only used in edit-user.tsx   starts -------
  const handleInputValueChange = (e: any) => {
    setEditedUserData({
      ...editedUserData,
      [e.target.name]: e.target.value,
    });
  };
  // -------- Handle Input - only used in edit-user.tsx   ends -------

  // ------------- Check if User Online / Logged in ------------- start //
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
  // ------------- Check if User Online / Logged in ------------- ends //

  // -------------  Sign Up  FB & FS) ------------- start //
  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      insertDoc("users", {
        authId: userCredential.user.uid,
        email: userCredential.user.email,
      });
      console.log("userCredential: ", userCredential);
    } catch (err: any) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        setIsEmailAlreadyExists(true);
        setOpenAlert(true);
        setAlerTxt1(
          "This email already registered. Please try with another email."
        );
      }
      console.log("error in signup in Context: ", err);
    }
  };
  // -------------  Sign Up  FB & FS) ------------- ends //

  // ------------- Login User (FB) ------------- start //
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // setUser(userCredential.user);
    } catch (err: any) {
      if (err.message === "Firebase: Error (auth/user-not-found).") {
        setIsEmailAlreadyExists(false);
        setOpenAlert(true);
        setAlerTxt1("This email is not exists. Please try with another email.");
      }
      console.log(
        "err: ",
        err.message === "Firebase: Error (auth/user-not-found)."
      );
    } finally {
      setLoading(false);
    }
  };
  // ------------- Login User ------------- ends //

  // ------------- Logout User ------------- start //
  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };
  // ------------- Logout User ------------- ends //

  // ------------- Delete User ------------- start //
  const delUser = (e: any) => {
    const user: any = auth.currentUser;
    try {
      const deleteU: any = deleteUser(user);

      console.log("deleteU: ", deleteU);
      console.log("User deleted");
    } catch (err) {
      console.log("error user deleting: ", err);
    }
  };
  // --------------- Delete User ------------- ends //

  // ------------- insertDoc FS ------------- start //
  const insertDoc = async (collect: any, data: any) => {
    try {
      const docRef = await addDoc(collection(db, collect), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  // ------------- insertDoc FS ------------- ends //

  const getDBUsers = async () => {
    try {
      const colRef = collection(db, "users");
      // queries
      const q = query(colRef, where("email", "==", user.email));

      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log("doc.data(): ", doc.data());
          setDbUsers({ ...doc.data(), id: doc.id });
          setEditedUserData({ ...doc.data(), id: doc.id });
        });
      });
    } catch (err) {
      console.log("error in updateProfile:", err);
    }
  };

  console.log("user", user);
  // console.log("openAlert: ", openAlert);
  // console.log("isEmailAlreadyExists: ", isEmailAlreadyExists);

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
        openSnackBar,
        setOpenSnackBar,
        delUser,
        insertDoc,
        getDBUsers,
        editedUserData,
        setEditedUserData,
        handleInputValueChange,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
