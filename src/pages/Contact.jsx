// pages/Contact.jsx
import { useState } from "react";
import { useSubmitContactMutation } from "../features/contact/contactApiSlice";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import toast from "react-hot-toast";

const SUBJECTS = [
  { value: "general", label: "General Inquiry" },
  { value: "order-issue", label: "Order Issue" },
  { value: "return-exchange", label: "Return / Exchange" },
  { value: "custom-design", label: "Custom Design" },
  { value: "partnership", label: "Partnership" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
    orderId: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitContact, { isLoading }] = useSubmitContactMutation();

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContact(form).unwrap();
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "general", message: "", orderId: "" });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send message");
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <HiOutlineCheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-black text-white mb-3">Message Sent!</h2>
        <p className="text-gray-400 mb-8">
          We&apos;ll get back to you within 24 hours. Check your email for updates.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold
            rounded-xl hover:bg-white/10 transition-all cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-primary text-xs tracking-[.35em] uppercase font-bold">
          Get In Touch
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white mt-3 tracking-tight">
          CONTACT <span className="text-primary">US</span>
        </h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">
          Have a question, feedback, or need help? We&apos;re here for you.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left: Info Cards */}
        <div className="space-y-4">
          {[
            {
              icon: HiOutlineMail,
              title: "Email Us",
              info: "hello@jaimax.in",
              sub: "We reply within 24 hrs",
            },
            {
              icon: HiOutlinePhone,
              title: "Call Us",
              info: "+91 12345 67890",
              sub: "Mon-Sat, 10AM - 7PM",
            },
            {
              icon: HiOutlineLocationMarker,
              title: "Visit Us",
              info: "Mumbai, Maharashtra",
              sub: "India",
            },
            {
              icon: HiOutlineClock,
              title: "Business Hours",
              info: "Mon - Sat",
              sub: "10:00 AM - 7:00 PM IST",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="bg-white/[.02] border border-white/[.06] rounded-2xl p-6
                hover:border-primary/20 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center
                  justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wider font-bold">
                    {c.title}
                  </p>
                  <p className="text-white font-bold mt-1">{c.info}</p>
                  <p className="text-gray-500 text-sm">{c.sub}</p>
                </div>
              </div>
            </div>
          ))}

          {/* FAQ link */}
          <div className="bg-gradient-to-br from-primary/5 to-emerald-500/5 border
            border-primary/10 rounded-2xl p-6 text-center">
            <p className="text-white font-bold mb-1">Quick Answers?</p>
            <p className="text-gray-500 text-sm mb-4">
              Check our FAQ section for instant answers.
            </p>
            <a
              href="/faq"
              className="inline-flex items-center gap-1 text-primary text-sm font-bold
                hover:gap-2 transition-all"
            >
              Visit FAQs →
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white/[.02] border border-white/[.06] rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">Send us a Message</h3>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <InputField
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <InputField
                label="Phone (optional)"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
              <div>
                <label className="block text-xs text-gray-500 font-bold uppercase
                  tracking-wider mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full bg-white/[.04] border border-white/[.08] rounded-xl
                    px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50
                    transition-all appearance-none cursor-pointer"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s.value} value={s.value} className="bg-gray-900">
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {form.subject === "order-issue" && (
              <div className="mb-4">
                <InputField
                  label="Order ID (optional)"
                  name="orderId"
                  value={form.orderId}
                  onChange={handleChange}
                  placeholder="ORD-XXXXXXXX"
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block text-xs text-gray-500 font-bold uppercase
                tracking-wider mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                maxLength={2000}
                placeholder="Tell us how we can help..."
                className="w-full bg-white/[.04] border border-white/[.08] rounded-xl
                  px-4 py-3 text-sm text-white placeholder-gray-600 resize-none
                  focus:outline-none focus:border-primary/50 transition-all"
              />
              <p className="text-right text-[10px] text-gray-700 mt-1">
                {form.message.length}/2000
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-primary text-black font-extrabold tracking-wider
                rounded-xl hover:shadow-[0_0_30px_rgba(0,255,136,.25)] transition-all
                hover:scale-[1.01] disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Sending..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, ...props }) {
  return (
    <div>
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