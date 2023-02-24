import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useAuth } from "../store/auth";

export default function ProtectedRoute({ children }) {
  const user = useAuth((state) => state.user, shallow);
  const loading = useAuth((state) => state.loading, shallow);

  const navigate = useNavigate();

  if (loading) return <p>loading...</p>;

  //Si no hay usuario regresate
  if (!user.id) {
    navigate("/");
    return;
  }

  return (
    <>
      <div>{children}</div>
    </>
  );
}
