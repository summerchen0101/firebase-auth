import { auth, provider } from "./firebase";
import { useEffect, useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

const useAuth = () => {
  const history = useHistory();
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

  const loginWithGoogle = () => {
    auth.signInWithRedirect(provider);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userData) => {
      if (userData) {
        console.log(userData.email);
        setUser(userData);
        setIsLogin(true);
      } else {
        setUser(null);
        setIsLogin(false);
      }
    });

    auth
      .getRedirectResult()
      .then(function (result) {
        const credential = result.credential;
        // The signed-in user info.
        // if (credential) {
        //   auth.signInWithCredential(credential);
        // }
        history.push("/");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
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
    sendPasswordMail,
    loginWithGoogle
  };
};

export default useAuth;
