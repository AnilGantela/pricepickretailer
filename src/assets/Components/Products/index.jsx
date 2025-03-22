import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import Navbar from "../Navbar";
import ProductCard from "../ProductCard";
import {
  CategoryContainer,
  CategoryContainerTitle,
  CategoryList,
  CategoryListItem,
  ProductPageContainer,
  ProductsContainer,
} from "./styledComponents";

const RetailerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedStock, setUpdatedStock] = useState(0);
  const [updatedDiscount, setUpdatedDiscount] = useState(0);

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
          "https://pricepick-1032723282466.us-central1.run.app/retailer/product/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProducts(response.data.products);
        console.log(response.data.products);
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

      const token = Cookies.get("pricepicktoken");
      if (!token) {
        alert("Authentication required. Please log in.");
        return;
      }

      const response = await axios.delete(
        `https://pricpickbackend.onrender.com/retailer/product/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { password },
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

  const handleUpdateProduct = async (product) => {
    const password = prompt("Enter your password to update the product:");
    if (!password) {
      alert("Password is required to update the product.");
      return;
    }

    try {
      const token = Cookies.get("pricepicktoken");
      if (!token) {
        alert("Authentication required. Please log in.");
        return;
      }

      const response = await axios.put(
        `https://pricpickbackend.onrender.com/retailer/product/update/${product._id}`,
        {
          stock: updatedStock,
          discount: updatedDiscount,
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(response.data.message);
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p._id === product._id
            ? { ...p, stock: updatedStock, discount: updatedDiscount }
            : p
        )
      );
      setEditingProduct(null);
    } catch (err) {
      console.error(
        "Error updating product:",
        err.response?.data?.message || err
      );
      alert(err.response?.data?.message || "Failed to update product.");
    }
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <Navbar />
      <ProductPageContainer>
        <CategoryContainer>
          <CategoryContainerTitle>Categories</CategoryContainerTitle>
          <CategoryList>
            {categories.map((category) => (
              <CategoryListItem
                key={category}
                $selectedbg={
                  selectedCategory === category ? "white" : "#0000c5"
                }
                $selected={selectedCategory === category ? "#0000c5" : "white"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </CategoryListItem>
            ))}
          </CategoryList>
        </CategoryContainer>

        <ProductsContainer>
          <h1 className="text-3xl font-bold mb-6">Retailer Products</h1>
          {loading ? (
            <div className="flex justify-center items-center h-[90vh]">
              <ThreeDots color="palevioletred" height={80} width={80} />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-600">No products available.</p>
          ) : (
            <ul>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  productImages={product.images}
                ></ProductCard>
              ))}
            </ul>
          )}
        </ProductsContainer>
      </ProductPageContainer>
    </>
  );
};

export default RetailerProducts;
