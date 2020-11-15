import { auth } from "./firebase";
import { useEffect, useState } from "react";
import firebase from "firebase";

const useAuth = () => {
  const [user, setUser] = useState<firebase.User | null>();
  const [isLogin, setIsLogin] = useState(false);
  const logout = () => auth.signOut();

  const login = (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password);

  const register = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password);

  const sendVerification = () => user?.sendEmailVerification();

  const sendPasswordMail = (email: string) =>
    auth.sendPasswordResetEmail(email);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userData) => {
      if (userData) {
        console.log(userData.email);
        console.log(userData.emailVerified);
        setUser(userData);
        setIsLogin(true);
      } else {
        setUser(null);
        setIsLogin(false);
      }
    });
    return unsubscribe;
  }, []);
  return {
    user,
    isLogin,
    logout,
    login,
    register,
    sendVerification,
    sendPasswordMail
  };
};

export default useAuth;
