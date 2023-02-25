import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useAuthContext, auth } from "../store/auth-context";
import "./forms.css";

function Register() {
  const authContext = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!email || !password) {
      alert("Please enter email and password!");
      return;
    }
    // Password is not being hashed
    authContext.registerWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="outer">
        <div className="inner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="outer">
      <div className="inner">
        <input
          type="text"
          className="textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          className="textBox"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter Password"
        />
        <button
          className="btn"
          onClick={register}
          disabled={
            !password || !confirmPassword || password !== confirmPassword
          }
        >
          Register
        </button>
        <button className="btn" onClick={() => navigate("/")}>
          Back to Login
        </button>
      </div>
    </div>
  );
}
export default Register;
