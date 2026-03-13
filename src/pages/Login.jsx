import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [login, { isLoading }] = useLoginMutation();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await login(form).unwrap();
    console.log("🔍 Full login response:", res);  // ← Debug: see response structure

    const user = res.data?.user;
    const token = res.data?.token || res.token;

    dispatch(setCredentials({ user, token }));
    toast.success("Welcome back!");

    // ✅ Redirect based on role
    if (user?.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate(from, { replace: true });
    }
  } catch (err) {
    toast.error(err.data?.message || "Login failed");
  }
};

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 gradient-primary rounded-xl flex items-center 
            justify-center mx-auto mb-4">
            <span className="text-black font-bold text-2xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}
          className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-5">
          <Input label="Email" type="email" icon={HiOutlineMail}
            placeholder="you@example.com" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Password" type="password" icon={HiOutlineLockClosed}
            placeholder="••••••••" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <Button type="submit" loading={isLoading} className="w-full">Sign In</Button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}