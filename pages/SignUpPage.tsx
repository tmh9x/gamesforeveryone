import React, { useState } from "react";
// import { getAuth } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase/config";

// import {getAuth} from 'firebase/app';

interface ISignUpPage {
  children?: JSX.Element | JSX.Element[];

  // children: React.ReactNode;
}

function SignUpPage({ children, }: ISignUpPage) {
// const SignUpPage: React.FC<ISignUpPage> = (props) => {
  // const { children } = props;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPwValid, setIsPwValid] = useState<boolean>(false);
  const [authing, setAuthing] = useState<boolean>(false);


  const register = async (email: string, password: string) => {
    setAuthing(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Create User errorMessage: ", errorMessage, errorCode);
      // ..
    } finally {
      setAuthing(false);
    }
  };

  const handleSubmitRegisterClick = (e:any) => {
    /* ---- Email Check ---- */
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      // invalid email, maybe show an error to the user.
      console.log("not valid email");
      setIsEmailValid(true);
    } else if (password.length < 6) {
      setIsPwValid(true);
    } else {
      register(email, password);
      // redirect("/cards/1");
    }
  };



console.log("auth: ", auth);

  return (
    <div>
      <p>Login Page</p>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmitRegisterClick} disabled={authing}>
        Sign In
      </button>
    </div>
  );
};

export default SignUpPage;
