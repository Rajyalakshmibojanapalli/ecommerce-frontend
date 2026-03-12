import { HiOutlineShoppingBag } from "react-icons/hi";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Empty({
  icon: Icon = HiOutlineShoppingBag,
  title = "Nothing here", description = "",
  actionLabel, actionLink,
}) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Icon className="w-16 h-16 text-gray-600 mb-4" />
      <h3 className="text-xl font-semibold text-gray-300 mb-2">{title}</h3>
      {description && <p className="text-gray-500 mb-6">{description}</p>}
      {actionLabel && (
        <Button onClick={() => navigate(actionLink || "/products")}>{actionLabel}</Button>
      )}
    </div>
  );
}