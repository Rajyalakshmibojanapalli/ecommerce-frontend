import { useState } from "react";
import {
  useGetCouponsQuery, useCreateCouponMutation, useDeleteCouponMutation,
} from "../../features/coupons/couponsApiSlice";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import Badge from "../../components/ui/Badge";
import Loader from "../../components/ui/Loader";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

export default function AdminCoupons() {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    code: "", discountType: "percentage", discountValue: "",
    minOrderAmount: "", maxDiscount: "", usageLimit: "",
    startDate: "", endDate: "",
  });

  const { data, isLoading } = useGetCouponsQuery();
  const [createCoupon, { isLoading: creating }] = useCreateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const coupons = data?.data?.coupons || [];

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createCoupon(form).unwrap();
      toast.success("Coupon created");
      setModal(false);
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete coupon?")) return;
    try {
      await deleteCoupon(id).unwrap();
      toast.success("Coupon deleted");
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  if (isLoading) return <Loader size="lg" className="py-20" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Coupons</h1>
        <Button onClick={() => setModal(true)}>
          <HiOutlinePlus className="w-5 h-5" /> Add Coupon
        </Button>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                {["Code", "Type", "Value", "Min Order", "Used", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-sm font-medium text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id} className="border-b border-dark-border/50">
                  <td className="px-5 py-4 text-sm text-primary font-mono font-bold">{c.code}</td>
                  <td className="px-5 py-4 text-sm text-white capitalize">{c.discountType}</td>
                  <td className="px-5 py-4 text-sm text-white">
                    {c.discountType === "percentage" ? `${c.discountValue}%` : `₹${c.discountValue}`}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-400">₹{c.minOrderAmount}</td>
                  <td className="px-5 py-4 text-sm text-gray-400">{c.usedCount}/{c.usageLimit || "∞"}</td>
                  <td className="px-5 py-4">
                    <Badge color={c.isActive && new Date(c.endDate) > new Date() ? "green" : "red"}>
                      {c.isActive && new Date(c.endDate) > new Date() ? "Active" : "Expired"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => handleDelete(c._id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition cursor-pointer">
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Create Coupon" size="lg">
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Code" value={form.code} placeholder="SAVE20"
              onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required />
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Type</label>
              <select value={form.discountType}
                onChange={(e) => setForm({ ...form, discountType: e.target.value })}
                className="w-full bg-dark-light border border-dark-border rounded-lg px-4 py-2.5 
                  text-white focus:outline-none focus:border-primary cursor-pointer">
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Value" type="number" value={form.discountValue} required
              onChange={(e) => setForm({ ...form, discountValue: e.target.value })} />
            <Input label="Min Order (₹)" type="number" value={form.minOrderAmount}
              onChange={(e) => setForm({ ...form, minOrderAmount: e.target.value })} />
            <Input label="Max Discount (₹)" type="number" value={form.maxDiscount}
              onChange={(e) => setForm({ ...form, maxDiscount: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Usage Limit" type="number" value={form.usageLimit}
              onChange={(e) => setForm({ ...form, usageLimit: e.target.value })} />
            <Input label="Start Date" type="date" value={form.startDate} required
              onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            <Input label="End Date" type="date" value={form.endDate} required
              onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          </div>
          <Button type="submit" loading={creating}>Create Coupon</Button>
        </form>
      </Modal>
    </div>
  );
}