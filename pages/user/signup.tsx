import React, { useContext, useEffect, useState } from "react";

import AlertDialogSlide from "../../components/alerts/AlertDialogSlide";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const Signup = () => {
  const { signup, alerTxt1 } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      await signup(data.email, data.password);
      router.push("/user/login");
    } catch (err) {
      console.log("error in handleSignup:", err);
    }
  };

  // console.log('data', data);
  return (
    <div
      style={{
        width: "40%",
        margin: "30px auto",
      }}
    >
      <h1 className="text-center my-3 ">Register</h1>
      <form onSubmit={handleSignup}>
        <label>Email address</label>
        <input
          onChange={(e: any) =>
            setData({
              ...data,
              email: e.target.value,
            })
          }
          value={data.email}
          required
          type="email"
          placeholder="Enter email"
        />

        <label>Password</label>
        <input
          onChange={(e: any) =>
            setData({
              ...data,
              password: e.target.value,
            })
          }
          value={data.password}
          required
          type="password"
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
      <AlertDialogSlide
        dialogTitle="Alert"
        text1={alerTxt1}
        buttonTxt1={"Close"}
      />
    </div>
  );
};

export default Signup;
