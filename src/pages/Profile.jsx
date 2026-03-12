import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, setUser } from "../features/auth/authSlice";
import { useUpdateProfileMutation, useChangePasswordMutation } from "../features/auth/authApiSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "" });
  const [passForm, setPassForm] = useState({ currentPassword: "", newPassword: "" });

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: passLoading }] = useChangePasswordMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(form).unwrap();
      dispatch(setUser(res.data.user));
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await changePassword(passForm).unwrap();
      setPassForm({ currentPassword: "", newPassword: "" });
      toast.success("Password changed");
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-8">My Profile</h1>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center 
          text-3xl font-bold text-primary">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{user?.name}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleUpdate}
        className="bg-dark-card border border-dark-border rounded-xl p-6 mb-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Edit Profile</h3>
        <Input label="Name" icon={HiOutlineUser} value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" icon={HiOutlineMail} value={user?.email} disabled className="opacity-50" />
        <Input label="Phone" icon={HiOutlinePhone} value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Button type="submit" loading={isLoading}>Update Profile</Button>
      </form>

      <form onSubmit={handleChangePassword}
        className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Change Password</h3>
        <Input label="Current Password" type="password" value={passForm.currentPassword}
          onChange={(e) => setPassForm({ ...passForm, currentPassword: e.target.value })} required />
        <Input label="New Password" type="password" value={passForm.newPassword}
          onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })} required />
        <Button type="submit" loading={passLoading} variant="outline">Change Password</Button>
      </form>
    </div>
  );
}