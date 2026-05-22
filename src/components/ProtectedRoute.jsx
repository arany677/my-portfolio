import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth"; // এটি ইনস্টল করতে হবে: npm install react-firebase-hooks

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  return children;
}
