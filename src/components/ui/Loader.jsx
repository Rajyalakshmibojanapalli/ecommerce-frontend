export default function Loader({ size = "md", className = "" }) {
  const sizeMap = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12", xl: "w-16 h-16" };
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeMap[size]} border-2 border-dark-border border-t-primary rounded-full animate-spin`} />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="text-center">
        <Loader size="xl" />
        <p className="mt-4 text-gray-400 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}