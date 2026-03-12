const colors = {
  green: "bg-primary/20 text-primary",
  red: "bg-red-500/20 text-red-400",
  yellow: "bg-yellow-500/20 text-yellow-400",
  blue: "bg-blue-500/20 text-blue-400",
  gray: "bg-gray-500/20 text-gray-400",
  purple: "bg-purple-500/20 text-purple-400",
};

export default function Badge({ children, color = "green", className = "" }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full 
      text-xs font-medium ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }) {
  const map = {
    Pending: "yellow", Processing: "blue", Confirmed: "blue",
    Shipped: "purple", "Out for Delivery": "purple",
    Delivered: "green", Cancelled: "red", Returned: "red",
  };
  return <Badge color={map[status] || "gray"}>{status}</Badge>;
}