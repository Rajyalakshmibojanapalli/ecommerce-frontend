import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
  selectIsAdmin,
} from "../features/auth/authSlice";
import { useGetMeQuery } from "../features/auth/authApiSlice";
import { PageLoader } from "../components/ui/Loader";

export default function AdminRoute({ children }) {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const isAdmin = useSelector(selectIsAdmin);

  // ✅ Wait for user data if token exists but user not loaded yet
  const { isLoading } = useGetMeQuery(undefined, {
    skip: !token || !!user, // skip if no token OR user already loaded
  });

  // No token at all
  if (!token) return <Navigate to="/login" replace />;

  // Token exists but still loading user data
  if (isLoading || (token && !user)) return <PageLoader />;

  // User loaded but not admin
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}