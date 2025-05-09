import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import Popup from "reactjs-popup"; // Ensure you have installed this
import Navbar from "../Navbar";
import ProductCard from "../ProductCard";
import ProductsNotFound from "../NoProductsFound";
import {
  CategoryContainer,
  CategoryContainerTitle,
  CategoryList,
  CategoryListItem,
  ProductPageContainer,
  Loader,
  ProductsContainer,
  ProductsLeftContainer,
  ProductsRightContainer,
  ProductSummerContainer,
  PopupContainer,
  CloseButton,
  ProductList,
  ProductListItem,
} from "./styledComponents";

const RetailerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(
    "Mobile & Accessories"
  );
  const [categories, setCategories] = useState([]);
  const [categorySummary, setCategorySummary] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);

  // State for Popup Preview
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = Cookies.get("pricepicktoken");
      if (!token) throw new Error("Authentication required. Please log in.");

      const response = await axios.get(
        "https://pricepick-1032723282466.us-central1.run.app/retailer/product/all",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts(response.data.products);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://pricepick-1032723282466.us-central1.run.app/retailer/product/addCategories",
        {
          headers: { Authorization: `Bearer ${Cookies.get("pricepicktoken")}` },
        }
      );

      if (response.data.success && Array.isArray(response.data.categories)) {
        setCategories(response.data.categories);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const getProductsSummary = (products) => {
    if (products.length === 0) {
      return {
        highestPriceProduct: null,
        lowestPriceProduct: null,
        newestProducts: [],
        highStockProducts: [],
        lowStockProducts: [],
      };
    }

    return {
      highestPriceProduct: products.reduce(
        (max, product) => (product.price > max.price ? product : max),
        products[0]
      ),
      lowestPriceProduct: products.reduce(
        (min, product) => (product.price < min.price ? product : min),
        products[0]
      ),
      newestProducts: products
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5),
      highStockProducts: products.filter((p) => p.stock > 50).slice(0, 5),
      lowStockProducts: products.filter((p) => p.stock < 10).slice(0, 5),
    };
  };

  useEffect(() => {
    const filteredProducts =
      selectedCategory === "Mobile & Accessories"
        ? products.filter((p) => p.category === "Mobile & Accessories")
        : products.filter((p) => p.category === selectedCategory);

    setFilteredProducts(filteredProducts);
    setCategorySummary(getProductsSummary(filteredProducts));
  }, [products, selectedCategory]);

  // Function to handle product click
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowPreview(true);
  };

  return (
    <>
      <Navbar />
      <ProductPageContainer>
        <CategoryContainer>
          <CategoryContainerTitle>Categories :</CategoryContainerTitle>
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
          <ProductsLeftContainer>
            <h1 className="text-3xl font-bold mb-6">Retailer Products</h1>
            {loading ? (
              <Loader>
                <ThreeDots color="#5f5fd4" height={80} width={80} />
              </Loader>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : filteredProducts.length === 0 ? (
              <ProductsNotFound />
            ) : (
              <ProductList>
                {filteredProducts.map((product) => (
                  <ProductListItem
                    key={product._id}
                    onClick={() => handleProductClick(product)}
                    className="cursor-pointer hover:bg-gray-100 p-2"
                  >
                    <img
                      src={product.images?.[0] || "fallback-image.jpg"}
                      height={50}
                      width={50}
                      alt={product.name}
                    />
                    <h1>{product.name}</h1>
                    <p>₹{product.price}</p>
                  </ProductListItem>
                ))}
              </ProductList>
            )}
          </ProductsLeftContainer>

          <ProductsRightContainer>
            <h1>Summary</h1>
            <ProductSummerContainer>
              <legend>Highest Price</legend>
              {categorySummary.highestPriceProduct ? (
                <ul>
                  <li>Name: {categorySummary.highestPriceProduct.name}</li>
                  <li>Price: ₹{categorySummary.highestPriceProduct.price}</li>
                </ul>
              ) : (
                <p>No data available</p>
              )}
            </ProductSummerContainer>
            <ProductSummerContainer>
              <legend>Lowest Price</legend>
              {categorySummary.lowestPriceProduct ? (
                <ul>
                  <li>Name: {categorySummary.lowestPriceProduct.name}</li>
                  <li>Price: ₹{categorySummary.lowestPriceProduct.price}</li>
                </ul>
              ) : (
                <p>No data available</p>
              )}
            </ProductSummerContainer>
            <ProductSummerContainer>
              <legend>Newly added</legend>
              {categorySummary.newestProducts &&
              categorySummary.newestProducts.length > 0 ? (
                <ul>
                  {categorySummary.newestProducts.map((product) => (
                    <li key={product._id}>
                      <p>Name: {product.name}</p>
                      <p>Price: ₹{product.price}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No data available</p>
              )}
            </ProductSummerContainer>
            <ProductSummerContainer>
              <legend>High Stock</legend>
              {categorySummary.highStockProducts &&
              categorySummary.highStockProducts.length > 0 ? (
                <ul>
                  {categorySummary.highStockProducts.map((product) => (
                    <li key={product._id}>
                      <p>Name: {product.name}</p>
                      <p>Price: ₹{product.price}</p>
                      <p>Stock: {product.stock}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No data available</p>
              )}
            </ProductSummerContainer>
            <ProductSummerContainer>
              <legend>Low Stock</legend>
              {categorySummary.lowStockProducts &&
              categorySummary.lowStockProducts.length > 0 ? (
                <ul>
                  {categorySummary.lowStockProducts.map((product) => (
                    <li key={product._id}>
                      <p>Name: {product.name}</p>
                      <p>Price: ₹{product.price}</p>
                      <p>Stock: {product.stock}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No data available</p>
              )}
            </ProductSummerContainer>
          </ProductsRightContainer>
        </ProductsContainer>
      </ProductPageContainer>

      <Popup
        modal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        closeOnDocumentClick
      >
        <PopupContainer>
          <CloseButton
            className="popup-close"
            onClick={() => setShowPreview(false)}
          >
            &times;
          </CloseButton>
          {selectedProduct ? (
            <ProductCard
              product={selectedProduct}
              productImages={selectedProduct.images}
            />
          ) : (
            <p>No product selected</p>
          )}
        </PopupContainer>
      </Popup>
    </>
  );
};

export default RetailerProducts;
