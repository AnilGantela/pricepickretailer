import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../Navbar";
import {
  AddProductContainer,
  SearchContainer,
  SearchElement,
  SearchElementConainter,
  SearchInput,
  SearchElementInnerContainer,
  TitleText,
  ContentContainer,
  ChartConainter,
  FormContainer,
  FormTitle,
  Form,
  TitleInput,
  PriceInput,
  FormTopContainer,
  Select,
  StockInput,
  DiscountInput,
  FormBottomContainer,
  ChartContainer,
  ChartsContainer,
  PreviewContainer,
  TopContentContainer,
  PreviewTopContainer,
  PreviewBottomContainer,
  SuccessText,
  ErrorText,
  Loader,
} from "./styleComponents";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    discount: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchInput, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [retailerPriceSummary, setRetailerPriceSummary] = useState([]);
  const [embedUrl, setEmbedUrl] = useState(""); // Added loading state for search

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://pricepick-1032723282466.us-central1.run.app/retailer/product/addCategories",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("pricepicktoken")}`, // Ensure correct token
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          setCategories([]); // Ensure it's an array
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Prevent crashing
      }
    };

    fetchCategories();
  }, []);

  // Handle input change for product form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const optimalPrice =
    retailerPriceSummary.length > 0
      ? (Math.min(...retailerPriceSummary.map((r) => r.lowestPrice)) +
          Math.max(...retailerPriceSummary.map((r) => r.highestPrice))) /
        2
      : "N/A";

  // Handle search input change
  const handleSearchValue = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = Cookies.get("pricepicktoken");
      if (!token) {
        setError("Authentication required. Please log in.");
        setLoading(false);
        return;
      }

      // Rule 1: Title must be included and > 8 characters
      if (!formData.name || formData.name.length <= 8) {
        setError("Product name must be at least 9 characters long.");
        setLoading(false);
        return;
      }

      // Rule 2: Price must be within the suggested range
      const minPrice = Math.min(
        ...retailerPriceSummary.map((r) => r.lowestPrice)
      );
      const maxPrice = Math.max(
        ...retailerPriceSummary.map((r) => r.highestPrice)
      );

      if (formData.price < minPrice || formData.price > maxPrice) {
        setError(`Price must be between ₹${minPrice} and ₹${maxPrice}.`);
        setLoading(false);
        return;
      }

      // Rule 3: Category must be selected
      if (!formData.category) {
        setError("Please select a category.");
        setLoading(false);
        return;
      }

      // Rule 4: Stock must be greater than 0
      if (formData.stock <= 0) {
        setError("Stock must be greater than 0.");
        setLoading(false);
        return;
      }

      // Rule 5: Discount must be between 0 and 100
      if (formData.discount < 0 || formData.discount > 100) {
        setError("Discount must be between 0% and 100%.");
        setLoading(false);
        return;
      }

      // If all conditions pass, proceed with API call
      await axios.post(
        "https://pricepick-1032723282466.us-central1.run.app/retailer/product/create",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Product added successfully!");
      setFormData({
        name: "",
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

  // Handle search functionality
  const submitSearch = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const searchQuery = searchInput.trim();
      if (!searchQuery) return;

      setSearchLoading(true); // Start loading state

      const URL = `https://pricepick-1032723282466.us-central1.run.app/user/${encodeURIComponent(
        searchQuery
      )}`;

      try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error("Failed to fetch search results");
        const data = await response.json();
        console.log("Fetched Data:", data);

        // Ensure results are an array and sort by price (ascending)
        let sortedResults = (
          Array.isArray(data.results) ? data.results : []
        ).sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        const url = data.history;
        const cleanedUrl = url.replace(/^"|"$/g, "");

        setEmbedUrl(cleanedUrl);
        // Remove duplicates, keeping the lowest-priced product for each (title, retailer) pair
        const uniqueResults = [];
        const seen = new Map();

        for (const item of sortedResults) {
          const key = `${item.title}-${item.retailer}`;
          const price = parseFloat(item.price);

          if (!seen.has(key) || price < seen.get(key).price) {
            seen.set(key, { ...item, price });
          }
        }

        const finalResults = Array.from(seen.values());

        // Calculate price stats for each retailer
        const retailerStats = new Map();

        finalResults.forEach((item) => {
          const { retailer, price } = item;
          if (!retailerStats.has(retailer)) {
            retailerStats.set(retailer, {
              retailer,
              prices: [],
            });
          }
          retailerStats.get(retailer).prices.push(price);
        });

        // Generate final stats
        const retailerPriceSummary = Array.from(retailerStats.values()).map(
          ({ retailer, prices }) => {
            const lowestPrice = Math.min(...prices);
            const highestPrice = Math.max(...prices);
            const averagePrice =
              prices.reduce((sum, price) => sum + price, 0) / prices.length;

            return {
              retailer,
              lowestPrice,
              highestPrice,
              averagePrice: parseFloat(averagePrice.toFixed(2)), // Round to 2 decimal places
            };
          }
        );

        setSearchResults(finalResults);
        setRetailerPriceSummary(retailerPriceSummary);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setSearchLoading(false); // Stop loading state
      }
    }
  };

  return (
    <>
      <Navbar />
      <AddProductContainer>
        <SearchContainer>
          <SearchInput
            type="search"
            value={searchInput}
            onChange={handleSearchValue}
            placeholder="Search Product"
            onKeyDown={submitSearch}
          />
          <SearchElementConainter>
            {searchLoading ? (
              <Loader className="mt-6">
                <ThreeDots color="palevioletred" height={80} width={80} />
              </Loader>
            ) : searchResults.length === 0 && searchInput.length > 0 ? (
              <p>No products found</p>
            ) : (
              searchResults.map((each) => (
                <SearchElement key={each.productLink} href={each.productLink}>
                  <TitleText>{each.title}</TitleText>
                  <SearchElementInnerContainer>
                    <p>Rs {each.price}</p>
                    <p> ~ {each.retailer}</p>
                  </SearchElementInnerContainer>
                </SearchElement>
              ))
            )}
          </SearchElementConainter>
        </SearchContainer>
        <ContentContainer>
          <TopContentContainer>
            <FormContainer>
              <FormTitle>
                <span>Create Product</span>
                <div>
                  {retailerPriceSummary?.length > 0 && (
                    <p className="text-center mt-4">
                      Suggested Price Range:{" "}
                      <strong>
                        {Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(
                          Math.min(
                            ...retailerPriceSummary.map(
                              (r) => r?.lowestPrice || 0
                            )
                          )
                        )}
                      </strong>{" "}
                      -{" "}
                      <strong>
                        {Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(
                          Math.max(
                            ...retailerPriceSummary.map(
                              (r) => r?.highestPrice || 0
                            )
                          )
                        )}
                      </strong>
                    </p>
                  )}
                </div>
              </FormTitle>

              <Form onSubmit={handleSubmit}>
                <FormTopContainer>
                  <TitleInput
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                  <PriceInput
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="p-2 border border-gray-300 rounded"
                  />
                </FormTopContainer>
                <FormBottomContainer>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>

                  <StockInput
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                  <DiscountInput
                    type="number"
                    name="discount"
                    placeholder="Discount %"
                    value={formData.discount}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </FormBottomContainer>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded font-semibold"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Add Product"}
                </button>
              </Form>
            </FormContainer>
            <PreviewContainer>
              <FormTitle>
                Preview {error && <ErrorText>{error}</ErrorText>}
                {success && <SuccessText>{success}</SuccessText>}
              </FormTitle>

              <PreviewTopContainer>
                <h1 className="text-lg font-bold text-gray-800">
                  Product Title:{" "}
                  <span className="text-blue-600">
                    {formData.name ? formData.name : "Product Title"}
                  </span>
                </h1>
                <p className="text-xl font-semibold text-gray-900">
                  ₹{" "}
                  {formData.price
                    ? (
                        formData.price -
                        (formData.price * formData.discount) / 100
                      ).toFixed(2)
                    : "00000"}{" "}
                  {formData.discount > 0 && (
                    <span className="text-xs text-green-600">
                      (After {formData.discount}% Discount)
                    </span>
                  )}
                </p>
              </PreviewTopContainer>

              <PreviewBottomContainer>
                <p>
                  <strong className="text-gray-700">Category:</strong>{" "}
                  <span className="text-gray-800">
                    {formData.category ? formData.category : "Product Category"}
                  </span>
                </p>
                <p>
                  <strong className="text-gray-700">Stock:</strong>{" "}
                  <span
                    className={`font-bold ${
                      formData.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formData.stock ? formData.stock : "0"}
                  </span>
                </p>
                <p>
                  <strong className="text-gray-700">Discount:</strong>{" "}
                  <span className="text-gray-800">
                    {formData.discount ? formData.discount : "0"}%
                  </span>
                </p>
              </PreviewBottomContainer>
              <div>
                <FormTitle>Rules:</FormTitle>
                <div className="pl-5">
                  <p>
                    <strong>✅ Title:</strong> Must be included and have a
                    length greater than 8 characters.
                  </p>
                  <p>
                    <strong>✅ Price:</strong> Must be within the suggested
                    price range.
                  </p>
                  <p>
                    <strong>✅ Discount:</strong> Must be between 0% and 100%.
                  </p>
                  <p>
                    <strong>✅ Stock:</strong> Must be greater than 0.
                  </p>
                </div>
              </div>
            </PreviewContainer>
          </TopContentContainer>

          <>
            <ChartsContainer>
              <ChartContainer>
                {searchLoading ? (
                  <Loader>
                    <ThreeDots color="palevioletred" height={80} width={80} />
                  </Loader>
                ) : (
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                      data={retailerPriceSummary}
                      margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                    >
                      <XAxis dataKey="retailer" cursor="pointer" />
                      <YAxis cursor="pointer" />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="lowestPrice"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        name="Lowest Price"
                        animationDuration={500}
                      />
                      <Line
                        type="monotone"
                        dataKey="averagePrice"
                        stroke="#8884d8"
                        strokeWidth={2}
                        name="Average Price"
                        animationDuration={500}
                      />
                      <Line
                        type="monotone"
                        dataKey="highestPrice"
                        stroke="#d88484"
                        strokeWidth={2}
                        name="Highest Price"
                        animationDuration={500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </ChartContainer>
              <ChartContainer>
                {searchLoading ? (
                  <Loader>
                    <ThreeDots color="palevioletred" height={80} width={80} />
                  </Loader>
                ) : (
                  <iframe
                    src={embedUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowTransparency="true"
                    scrolling="no"
                    title="Price History Chart"
                  ></iframe>
                )}
              </ChartContainer>
            </ChartsContainer>
          </>
        </ContentContainer>
      </AddProductContainer>
    </>
  );
};

export default ProductForm;
