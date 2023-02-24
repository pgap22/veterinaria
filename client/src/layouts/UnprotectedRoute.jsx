import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useAuth } from "../store/auth";

export default function UnProtectedRoute({ children }) {
  const user = useAuth((state) => state.user, shallow);
  const loading = useAuth((state) => state.loading, shallow);
  const navigate = useNavigate();

  if (loading) return <p>loading...</p>
  
  //Si hay usuario regresa a home
  if (user.id) {
    navigate("/home");
    return;
  }


  return (
    <>
      <div>{children}</div>
    </>
  );
}
