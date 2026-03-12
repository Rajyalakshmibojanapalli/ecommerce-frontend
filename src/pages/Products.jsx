import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../features/products/productsApiSlice";
import { useGetCategoriesQuery } from "../features/categories/categoriesApiSlice";
import ProductGrid from "../components/product/ProductGrid";
import Pagination from "../components/ui/Pagination";
import { HiOutlineAdjustments, HiOutlineX } from "react-icons/hi";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "-createdAt",
    page: Number(searchParams.get("page")) || 1,
  });

  // Build query params
  const queryParams = {};
  Object.entries(filters).forEach(([k, v]) => { if (v) queryParams[k] = v; });

  const { data, isLoading, isFetching } = useGetProductsQuery(queryParams);
  const { data: catData } = useGetCategoriesQuery();

  const products = data?.data?.products || [];
  const pagination = data?.pagination;
  const categories = catData?.data?.categories || [];

  // Sync URL
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v && v !== "-createdAt" && !(k === "page" && v === 1)) params.set(k, v);
    });
    setSearchParams(params);
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters((p) => ({ ...p, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({ search: "", category: "", minPrice: "", maxPrice: "", sort: "-createdAt", page: 1 });
  };

  const sortOptions = [
    { value: "-createdAt", label: "Newest" },
    { value: "price", label: "Price: Low to High" },
    { value: "-price", label: "Price: High to Low" },
    { value: "-ratingsAverage", label: "Top Rated" },
    { value: "-totalSold", label: "Best Selling" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {filters.search ? `Results for "${filters.search}"` : "All Products"}
          </h1>
          {pagination && (
            <p className="text-sm text-gray-500 mt-1">{pagination.totalItems} products found</p>
          )}
        </div>
        <button onClick={() => setFiltersOpen(!filtersOpen)}
          className="md:hidden flex items-center gap-2 px-4 py-2 bg-dark-light 
            border border-dark-border rounded-lg text-gray-300 cursor-pointer">
          <HiOutlineAdjustments className="w-5 h-5" /> Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className={`${filtersOpen ? "fixed inset-0 z-50 bg-dark p-6 overflow-y-auto" : "hidden"} 
          md:block md:static md:w-64 flex-shrink-0`}>
          <div className="flex items-center justify-between mb-6 md:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setFiltersOpen(false)} className="cursor-pointer">
              <HiOutlineX className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-400 block mb-2">Search</label>
              <input type="text" value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)} placeholder="Search..."
                className="w-full bg-dark-light border border-dark-border rounded-lg px-3 py-2 
                  text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-400 block mb-2">Category</label>
              <div className="space-y-1">
                <button onClick={() => updateFilter("category", "")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition cursor-pointer
                    ${!filters.category ? "bg-primary/10 text-primary" : "text-gray-400 hover:text-white hover:bg-dark-lighter"}`}>
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button key={cat._id} onClick={() => updateFilter("category", cat._id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition cursor-pointer
                      ${filters.category === cat._id ? "bg-primary/10 text-primary" : "text-gray-400 hover:text-white hover:bg-dark-lighter"}`}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-400 block mb-2">Price Range</label>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" value={filters.minPrice}
                  onChange={(e) => updateFilter("minPrice", e.target.value)}
                  className="w-1/2 bg-dark-light border border-dark-border rounded-lg px-3 py-2 
                    text-sm text-white focus:outline-none focus:border-primary" />
                <input type="number" placeholder="Max" value={filters.maxPrice}
                  onChange={(e) => updateFilter("maxPrice", e.target.value)}
                  className="w-1/2 bg-dark-light border border-dark-border rounded-lg px-3 py-2 
                    text-sm text-white focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-400 block mb-2">Sort By</label>
              <select value={filters.sort} onChange={(e) => updateFilter("sort", e.target.value)}
                className="w-full bg-dark-light border border-dark-border rounded-lg px-3 py-2 
                  text-sm text-white focus:outline-none focus:border-primary cursor-pointer">
                {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            <button onClick={clearFilters}
              className="w-full py-2 text-sm text-red-400 hover:text-red-300 
                border border-red-500/20 rounded-lg hover:bg-red-500/10 transition cursor-pointer">
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <ProductGrid products={products} loading={isLoading || isFetching} />
          <Pagination pagination={pagination}
            onPageChange={(page) => setFilters((p) => ({ ...p, page }))} />
        </div>
      </div>
    </div>
  );
}