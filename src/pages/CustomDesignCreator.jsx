// pages/CustomDesignCreator.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateDesignMutation,
  useGetDesignPricesQuery,
} from "../features/customDesign/customDesignApiSlice";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineSave,
  HiOutlineUpload,
} from "react-icons/hi";
import toast from "react-hot-toast";

const PRODUCT_TYPES = [
  { id: "tshirt", label: "T-Shirt", emoji: "👕" },
  { id: "hoodie", label: "Hoodie", emoji: "🧥" },
  { id: "polo", label: "Polo", emoji: "👔" },
  { id: "tank-top", label: "Tank Top", emoji: "🎽" },
  { id: "sweatshirt", label: "Sweatshirt", emoji: "🧤" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

const COLORS = [
  { name: "White", hex: "#F5F5F5" },
  { name: "Black", hex: "#1A1A1A" },
  { name: "Navy", hex: "#1B2A4A" },
  { name: "Red", hex: "#DC2626" },
  { name: "Forest", hex: "#2D5F2D" },
  { name: "Mustard", hex: "#FFDB58" },
  { name: "Coral", hex: "#FF7F50" },
  { name: "Royal Blue", hex: "#4169E1" },
  { name: "Lavender", hex: "#B57EDC" },
  { name: "Teal", hex: "#008080" },
  { name: "Burgundy", hex: "#722F37" },
  { name: "Olive", hex: "#6B8E23" },
];

const TEMPLATES = [
  { id: "blank", name: "Blank Canvas", emoji: "⬜" },
  { id: "minimal-wave", name: "Minimal Wave", emoji: "〰️" },
  { id: "urban-graffiti", name: "Urban Graffiti", emoji: "🎨" },
  { id: "retro-sunset", name: "Retro Sunset", emoji: "🌅" },
  { id: "abstract-geo", name: "Abstract Geo", emoji: "◆" },
  { id: "nature-bloom", name: "Nature Bloom", emoji: "🌿" },
  { id: "neon-dreams", name: "Neon Dreams", emoji: "⚡" },
];

export default function CustomDesignCreator() {
  const navigate = useNavigate();
  const { data: priceData } = useGetDesignPricesQuery();
  const [createDesign, { isLoading }] = useCreateDesignMutation();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    productType: "tshirt",
    size: "M",
    color: COLORS[0],
    template: "blank",
    design: { frontText: { content: "", font: "Arial", color: "#FFFFFF", size: 24 } },
    quantity: 1,
    notes: "",
  });

  const basePrices = priceData?.data?.basePrices || {};
  const customFee = priceData?.data?.customImageFee || 150;
  const basePrice = basePrices[form.productType] || 499;
  const totalPrice = (basePrice + (form.design.frontImage ? customFee : 0)) * form.quantity;

  const handleSubmit = async () => {
    if (!form.name.trim()) return toast.error("Give your design a name!");

    try {
      const res = await createDesign({
        ...form,
        color: form.color,
      }).unwrap();
      toast.success("Design saved!");
      navigate("/my-designs");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-primary text-xs tracking-[.35em] uppercase font-bold">
          Design Studio
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white mt-3 tracking-tight">
          CREATE YOUR{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400
            bg-clip-text text-transparent">
            CUSTOM TEE
          </span>
        </h1>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {["Product", "Color & Size", "Design", "Review"].map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i + 1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold
              transition-all cursor-pointer ${
                step === i + 1
                  ? "bg-primary text-black"
                  : step > i + 1
                  ? "bg-primary/20 text-primary"
                  : "bg-white/5 text-gray-600"
              }`}
          >
            <span className="w-5 h-5 rounded-full bg-black/20 flex items-center
              justify-center text-[10px] font-black">
              {step > i + 1 ? "✓" : i + 1}
            </span>
            <span className="hidden sm:inline">{s}</span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Preview */}
        <div className="flex items-center justify-center">
          <div className="relative w-64 md:w-80">
            {/* T-Shirt shape */}
            <div
              className="aspect-[3/4] rounded-3xl shadow-2xl flex flex-col items-center
                justify-center p-8 transition-colors duration-500 border border-white/10"
              style={{ backgroundColor: form.color.hex }}
            >
              <span className="text-5xl mb-2 opacity-80">
                {PRODUCT_TYPES.find((p) => p.id === form.productType)?.emoji}
              </span>

              {form.template !== "blank" && (
                <span className="text-3xl mb-2">
                  {TEMPLATES.find((t) => t.id === form.template)?.emoji}
                </span>
              )}

              {form.design.frontText?.content && (
                <p
                  className="text-center font-bold leading-tight break-words max-w-full"
                  style={{
                    color: form.design.frontText.color,
                    fontSize: `${Math.min(form.design.frontText.size, 32)}px`,
                    fontFamily: form.design.frontText.font,
                  }}
                >
                  {form.design.frontText.content}
                </p>
              )}

              {!form.design.frontText?.content && form.template === "blank" && (
                <p className="text-sm opacity-30 font-bold">Your Design Here</p>
              )}
            </div>

            {/* Size badge */}
            <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-primary
              text-black font-black text-sm flex items-center justify-center shadow-lg">
              {form.size}
            </div>
          </div>
        </div>

        {/* Steps Content */}
        <div className="bg-white/[.02] border border-white/[.06] rounded-2xl p-6 md:p-8">
          {/* STEP 1: Product Type */}
          {step === 1 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Choose Product Type</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PRODUCT_TYPES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setForm((f) => ({ ...f, productType: p.id }))}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                      form.productType === p.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-white/[.06] text-gray-400 hover:border-white/10"
                    }`}
                  >
                    <span className="text-3xl block mb-2">{p.emoji}</span>
                    <span className="text-sm font-bold">{p.label}</span>
                    <span className="block text-xs mt-1 opacity-60">
                      ₹{basePrices[p.id] || 499}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Color & Size */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Color & Size</h3>

              <p className="text-xs text-gray-600 uppercase tracking-wider font-bold mb-3">
                Color — {form.color.name}
              </p>
              <div className="grid grid-cols-6 gap-3 mb-8">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setForm((f) => ({ ...f, color: c }))}
                    className={`aspect-square rounded-xl transition-all cursor-pointer
                      hover:scale-110 ${
                        form.color.name === c.name
                          ? "ring-[3px] ring-primary ring-offset-[3px] ring-offset-gray-950 scale-110"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>

              <p className="text-xs text-gray-600 uppercase tracking-wider font-bold mb-3">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setForm((f) => ({ ...f, size: s }))}
                    className={`w-14 h-14 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                      form.size === s
                        ? "bg-primary text-black"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Design */}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Design Your Tee</h3>

              {/* Template */}
              <p className="text-xs text-gray-600 uppercase tracking-wider font-bold mb-3">
                Template
              </p>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setForm((f) => ({ ...f, template: t.id }))}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      form.template === t.id
                        ? "border-primary bg-primary/10"
                        : "border-white/[.06] hover:border-white/10"
                    }`}
                  >
                    <span className="text-xl block">{t.emoji}</span>
                    <span className="text-[10px] text-gray-500 font-bold mt-1 block">
                      {t.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Text */}
              <p className="text-xs text-gray-600 uppercase tracking-wider font-bold mb-3">
                Front Text
              </p>
              <input
                type="text"
                maxLength={50}
                value={form.design.frontText?.content || ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    design: {
                      ...f.design,
                      frontText: { ...f.design.frontText, content: e.target.value },
                    },
                  }))
                }
                placeholder="Your text here..."
                className="w-full bg-white/[.04] border border-white/[.08] rounded-xl
                  px-4 py-3 text-white text-sm mb-4 placeholder-gray-600
                  focus:outline-none focus:border-primary/50"
              />

              {/* Text color */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-gray-500 font-bold">Text Color:</span>
                <input
                  type="color"
                  value={form.design.frontText?.color || "#FFFFFF"}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      design: {
                        ...f.design,
                        frontText: { ...f.design.frontText, color: e.target.value },
                      },
                    }))
                  }
                  className="w-8 h-8 rounded-lg border-none cursor-pointer"
                />
              </div>

              {/* Design name */}
              <p className="text-xs text-gray-600 uppercase tracking-wider font-bold mb-3 mt-6">
                Design Name
              </p>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="My Awesome Tee"
                className="w-full bg-white/[.04] border border-white/[.08] rounded-xl
                  px-4 py-3 text-white text-sm placeholder-gray-600
                  focus:outline-none focus:border-primary/50"
              />
            </div>
          )}

          {/* STEP 4: Review */}
          {step === 4 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Review Your Design</h3>

              <div className="space-y-4">
                <ReviewRow label="Design Name" value={form.name || "—"} />
                <ReviewRow
                  label="Product"
                  value={PRODUCT_TYPES.find((p) => p.id === form.productType)?.label}
                />
                <ReviewRow label="Size" value={form.size} />
                <ReviewRow label="Color" value={form.color.name} />
                <ReviewRow
                  label="Template"
                  value={TEMPLATES.find((t) => t.id === form.template)?.name}
                />
                <ReviewRow
                  label="Front Text"
                  value={form.design.frontText?.content || "None"}
                />

                {/* Quantity */}
                <div className="flex items-center justify-between py-3 border-b border-white/[.06]">
                  <span className="text-sm text-gray-500">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setForm((f) => ({ ...f, quantity: Math.max(1, f.quantity - 1) }))
                      }
                      className="w-8 h-8 rounded-lg bg-white/5 text-white font-bold
                        cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-white font-bold w-8 text-center">
                      {form.quantity}
                    </span>
                    <button
                      onClick={() =>
                        setForm((f) => ({ ...f, quantity: Math.min(50, f.quantity + 1) }))
                      }
                      className="w-8 h-8 rounded-lg bg-white/5 text-white font-bold
                        cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Notes */}
                <div className="pt-2">
                  <p className="text-xs text-gray-600 uppercase tracking-wider font-bold mb-2">
                    Additional Notes (optional)
                  </p>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    rows={3}
                    placeholder="Any special instructions..."
                    className="w-full bg-white/[.04] border border-white/[.08] rounded-xl
                      px-4 py-3 text-white text-sm placeholder-gray-600 resize-none
                      focus:outline-none focus:border-primary/50"
                  />
                </div>

                {/* Price */}
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-bold">Total</span>
                    <span className="text-2xl font-black text-primary">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-600 mt-1">
                    Base ₹{basePrice} × {form.quantity} qty
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[.06]">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 px-5 py-3 text-sm text-gray-400
                  bg-white/5 rounded-xl hover:bg-white/10 font-bold transition-all cursor-pointer"
              >
                <HiOutlineArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="flex items-center gap-2 px-5 py-3 text-sm bg-primary text-black
                  font-bold rounded-xl hover:shadow-lg transition-all cursor-pointer"
              >
                Next <HiOutlineArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 text-sm bg-primary text-black
                  font-bold rounded-xl hover:shadow-[0_0_25px_rgba(0,255,136,.3)]
                  transition-all cursor-pointer disabled:opacity-50"
              >
                <HiOutlineSave className="w-4 h-4" />
                {isLoading ? "Saving..." : "Save Design"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[.06]">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm text-white font-bold">{value}</span>
    </div>
  );
}