import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.error(e);
    }
  };
  const signInWithG = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error(e);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <input
        placeholder="Email...."
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <input
        placeholder="password...."
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <br />
      <button onClick={signIn}>Sign-in</button>
      <button onClick={signInWithG}>Sign-In with Google</button>
      <button onClick={logOut}>LogOut</button>
    </div>
  );
}
