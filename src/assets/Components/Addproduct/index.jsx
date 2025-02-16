import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../Navbar";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    discount: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = Cookies.get("pricepicktoken"); // Get token from cookies
      if (!token) {
        setError("Authentication required. Please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://pricpickbackend.onrender.com/retailer/product/create",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }, // Send token in headers
        }
      );

      setSuccess("Product added successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        discount: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Error adding product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full  mt-2.5 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-3xl bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Create Product
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="discount"
              placeholder="Discount (%)"
              value={formData.discount}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded font-semibold"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
