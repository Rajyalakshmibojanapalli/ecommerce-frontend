import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";
import { useGetMeQuery } from "../features/auth/authApiSlice";
import { PageLoader } from "../components/ui/Loader";

export default function ProtectedRoute({ children }) {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  // ✅ Wait for user data if token exists but user not loaded yet
  const { isLoading } = useGetMeQuery(undefined, {
    skip: !token || !!user,
  });

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isLoading || (token && !user)) return <PageLoader />;

  return children;
}