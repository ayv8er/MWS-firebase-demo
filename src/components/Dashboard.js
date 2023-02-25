import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useAuthContext, auth } from "../store/auth-context";
import "./forms.css";

function Dashboard() {
  const authContext = useAuthContext();
  const [user, loading] = useAuthState(auth);
  const [metadata, setMetadata] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, navigate]);

  const callMagic = async () => {
    await authContext.getMagic();
    const isUserLoggedIn = await authContext.magic.user.isLoggedIn();
    if (isUserLoggedIn) {
      const metadata = await authContext.magic.user.getMetadata();
      setMetadata(metadata);
    }
  };

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
        Logged in as
        {user && <div>{user.email}</div>}
        {metadata && <div>{metadata.publicAddress}</div>}
        <button className="btn" onClick={callMagic}>
          Call Magic
        </button>
        <button className="btn" onClick={authContext.logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
export default Dashboard;
