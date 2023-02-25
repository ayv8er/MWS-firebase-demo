import { createContext, useContext, useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import { OpenIdExtension } from "@magic-ext/oidc";
import { app } from "../firebase";
import {
  getAuth,
  getIdToken,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext cannot be used outside of it's Provider");
  }
  return context;
};

export const auth = getAuth(app);

export const AuthContextProvider = ({ children }) => {
  const [magic, setMagic] = useState(null);

  useEffect(() => {
    async function initMagic() {
      if (!magic) {
        const makeMagic = new Magic(
          process.env.REACT_APP_MAGIC_PUBLISHABLE_API_KEY,
          {
            extensions: [new OpenIdExtension()],
          }
        );
        makeMagic.preload();
        setMagic(makeMagic);
      }
    }
    initMagic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMagic = async (token) => {
    const { currentUser } = auth;
    const jwt = token ? token : await getIdToken(currentUser);
    await magic.openid.loginWithOIDC({
      jwt,
      providerId: process.env.REACT_APP_MAGIC_PROVIDER_ID,
    });
  };

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const token = user.accessToken;
      await getMagic(token);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const registerWithEmailAndPassword = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const token = user.accessToken;
      await getMagic(token);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = async () => {
    await magic.user.logout();
    signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        magic,
        getMagic,
        logInWithEmailAndPassword,
        registerWithEmailAndPassword,
        sendPasswordReset,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
