// pages/Addresses.jsx
import { useState } from "react";
import {
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} from "../features/address/addressApiSlice";
import {
  HiOutlinePlus, HiOutlineTrash, HiOutlinePencil,
  HiOutlineHome, HiOutlineOfficeBuilding, HiOutlineLocationMarker,
  HiOutlineStar, HiStar, HiOutlineX,
} from "react-icons/hi";
import toast from "react-hot-toast";

const LABELS = [
  { value: "home", label: "Home", icon: HiOutlineHome },
  { value: "work", label: "Work", icon: HiOutlineOfficeBuilding },
  { value: "other", label: "Other", icon: HiOutlineLocationMarker },
];

const INITIAL = {
  label: "home", fullName: "", phone: "", addressLine1: "",
  addressLine2: "", city: "", state: "", pincode: "", landmark: "",
};

export default function Addresses() {
  const { data, isLoading } = useGetAddressesQuery();
  const [addAddress, { isLoading: adding }] = useAddAddressMutation();
  const [updateAddress, { isLoading: updating }] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [setDefault] = useSetDefaultAddressMutation();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(INITIAL);

  const addresses = data?.data?.addresses || [];

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const openEdit = (addr) => {
    setForm({
      label: addr.label, fullName: addr.fullName, phone: addr.phone,
      addressLine1: addr.addressLine1, addressLine2: addr.addressLine2 || "",
      city: addr.city, state: addr.state, pincode: addr.pincode,
      landmark: addr.landmark || "",
    });
    setEditId(addr._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateAddress({ id: editId, ...form }).unwrap();
        toast.success("Address updated");
      } else {
        await addAddress(form).unwrap();
        toast.success("Address added");
      }
      setShowForm(false);
      setEditId(null);
      setForm(INITIAL);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await deleteAddress(id).unwrap();
      toast.success("Address deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight">
          MY <span className="text-primary">ADDRESSES</span>
        </h1>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setEditId(null); setForm(INITIAL); }}
            className="flex items-center gap-2 px-5 py-3 bg-primary text-black
              font-bold text-sm rounded-xl hover:shadow-lg transition-all cursor-pointer"
          >
            <HiOutlinePlus className="w-4 h-4" /> Add New
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white/[.02] border border-white/[.06] rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">
              {editId ? "Edit Address" : "New Address"}
            </h3>
            <button
              onClick={() => { setShowForm(false); setEditId(null); }}
              className="p-2 text-gray-500 hover:text-white cursor-pointer"
            >
              <HiOutlineX className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Label */}
            <div className="flex gap-2 mb-6">
              {LABELS.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, label: l.value }))}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold
                    border transition-all cursor-pointer ${
                      form.label === l.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-white/10 text-gray-500"
                    }`}
                >
                  <l.icon className="w-4 h-4" /> {l.label}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <Field label="Full Name" name="fullName" value={form.fullName}
                onChange={handleChange} required />
              <Field label="Phone" name="phone" value={form.phone}
                onChange={handleChange} required />
            </div>
            <Field label="Address Line 1" name="addressLine1" value={form.addressLine1}
              onChange={handleChange} required className="mb-4" />
            <Field label="Address Line 2 (optional)" name="addressLine2"
              value={form.addressLine2} onChange={handleChange} className="mb-4" />
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <Field label="City" name="city" value={form.city}
                onChange={handleChange} required />
              <Field label="State" name="state" value={form.state}
                onChange={handleChange} required />
              <Field label="Pincode" name="pincode" value={form.pincode}
                onChange={handleChange} required />
            </div>
            <Field label="Landmark (optional)" name="landmark" value={form.landmark}
              onChange={handleChange} className="mb-6" />

            <button
              type="submit"
              disabled={adding || updating}
              className="w-full py-3 bg-primary text-black font-bold rounded-xl
                hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {adding || updating ? "Saving..." : editId ? "Update Address" : "Save Address"}
            </button>
          </form>
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/[.03] rounded-xl h-28 animate-pulse" />
          ))}
        </div>
      ) : addresses.length === 0 && !showForm ? (
        <div className="text-center py-20">
          <HiOutlineLocationMarker className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500">No addresses saved yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => {
            const L = LABELS.find((l) => l.value === addr.label) || LABELS[2];
            return (
              <div
                key={addr._id}
                className={`relative bg-white/[.02] border rounded-xl p-5 transition-all group ${
                  addr.isDefault ? "border-primary/30 bg-primary/[.02]" : "border-white/[.06]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center
                      justify-center flex-shrink-0">
                      <L.icon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-white">{addr.fullName}</p>
                        <span className="text-[10px] font-bold text-gray-600 bg-white/5
                          px-2 py-0.5 rounded uppercase">
                          {L.label}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold text-primary bg-primary/10
                            px-2 py-0.5 rounded-full flex items-center gap-0.5">
                            <HiStar className="w-3 h-3" /> Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {addr.addressLine1}
                        {addr.addressLine2 && `, ${addr.addressLine2}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        {addr.city}, {addr.state} — {addr.pincode}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">📞 {addr.phone}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefault(addr._id)}
                        className="p-2 rounded-lg text-gray-500 hover:text-primary
                          hover:bg-primary/10 cursor-pointer transition-all"
                        title="Set as default"
                      >
                        <HiOutlineStar className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => openEdit(addr)}
                      className="p-2 rounded-lg text-gray-500 hover:text-white
                        hover:bg-white/10 cursor-pointer transition-all"
                    >
                      <HiOutlinePencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(addr._id)}
                      className="p-2 rounded-lg text-gray-500 hover:text-red-400
                        hover:bg-red-500/10 cursor-pointer transition-all"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Field({ label, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3
          text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50
          transition-all"
      />
    </div>
  );
}