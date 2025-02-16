import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import Navbar from "../Navbar";

const RetailerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = Cookies.get("pricepicktoken");
        if (!token) {
          setError("Authentication required. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://pricpickbackend.onrender.com/retailer/product/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProducts(response.data.products);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const password = prompt("Enter your password to confirm deletion:");
      if (!password) {
        alert("Password is required to delete the product.");
        return;
      }

      const token = Cookies.get("pricepicktoken"); // Get authentication token
      if (!token) {
        alert("Authentication required. Please log in.");
        return;
      }

      const response = await axios.delete(
        `https://pricpickbackend.onrender.com/retailer/product/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { password }, // Send password in the request body
        }
      );

      alert(response.data.message);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error(
        "Error deleting product:",
        err.response?.data?.message || err
      );
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  };

  const handleStockChange = (id, amount) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id
          ? { ...product, stock: product.stock + amount }
          : product
      )
    );
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <Navbar />
      <div className="flex bg-white p-8">
        <div className="w-1/4 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="space-y-4 h-auto">
            {/* Increased spacing */}
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer p-3 rounded-lg mb-4 transition-all ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Product List */}
        <div className="w-3/4 pl-6">
          <h1 className="text-3xl font-bold mb-6">Retailer Products</h1>
          {loading ? (
            <div className="flex justify-center items-center h-[90vh]">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  background: "#ffffff",
                }}
              >
                <ThreeDots color="palevioletred" height={80} width={80} />
              </div>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-600">No products available.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <li
                  key={product._id}
                  className="p-4 border rounded-lg shadow-sm bg-white flex flex-col space-y-2"
                >
                  <h2 className="text-xl font-semibold text-blue-600">
                    {product.name}
                  </h2>
                  <p className="text-gray-700">{product.description}</p>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>
                      Category: <strong>{product.category}</strong>
                    </span>
                    <span>
                      Stock: <strong>{product.stock}</strong>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600">
                      ${product.price}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-sm text-red-500">
                        -{product.discount}% Off
                      </span>
                    )}
                  </div>
                  {editingProduct === product._id ? (
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleStockChange(product._id, 1)}
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        + Stock
                      </button>
                      <button
                        onClick={() => handleStockChange(product._id, -1)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        - Stock
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="px-3 py-1 bg-gray-500 text-white rounded"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => setEditingProduct(product._id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default RetailerProducts;
