import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import Popup from "reactjs-popup";
import { IoMdClose } from "react-icons/io"; // ✅ Import from react-icons
import "reactjs-popup/dist/index.css";
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
  Input,
  TextArea,
  SubmitButton,
  GlassModal,
  CloseButton,
  AddProductContainer,
  SearchContainer,
  SearchElement,
  SearchElementConainter,
  SearchInput,
  SearchElementInnerContainer,
  TitleText,
  ContentContainer,
  ChartConainter,
  FormSideContainer,
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
    description: "", // ✅ Added description
    price: "",
    category: "",
    stock: "",
    discount: "",
    images: [], // ✅ Multiple images
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

  const [showPreview, setShowPreview] = useState(false);

  // ✅ Handle "Next" click
  const handleNext = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };
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

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("discount", formData.discount);

      // ✅ Append images properly (Make sure input name matches backend `upload.array("images")`)
      formData.images.forEach((image) => {
        formDataToSend.append("images", image); // "images" must match Multer config
      });

      console.log("Images Before Submit:", formData.images);

      const response = await axios.post(
        "https://pricepick-1032723282466.us-central1.run.app/retailer/product/create",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Required for file upload
          },
        }
      );

      setSuccess("Product added successfully!");
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        discount: "",
        images: [],
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Error adding product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
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

        // Ensure results are an array and sort by price (ascending)
        let sortedResults = (
          Array.isArray(data.results) ? data.results : []
        ).sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        const url = data.history;
        const cleanedUrl = url.replace(/^"|"$/g, "");

        setEmbedUrl(`${cleanedUrl}`);

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
            {/* 🔹 POPUP */}
            {showPreview && (
              <Popup
                modal
                open={showPreview}
                onClose={() => setShowPreview(false)}
              >
                {(close) => (
                  <GlassModal>
                    <CloseButton onClick={close}>
                      <IoMdClose size={24} />
                    </CloseButton>

                    <PreviewContainer>
                      <FormTitle>
                        Preview {error && <ErrorText>{error}</ErrorText>}
                        {success && <SuccessText>{success}</SuccessText>}
                      </FormTitle>

                      {/* 🔹 Preview Details */}
                      <PreviewTopContainer>
                        <h1 className="text-lg font-bold text-gray-800">
                          Product Title:{" "}
                          <span className="text-blue-600">
                            {formData.name || "Product Title"}
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

                      {/* 🔹 Submit Button */}
                      <button
                        onClick={handleSubmit}
                        className="w-full bg-green-500 text-white p-3 rounded font-semibold mt-3"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                    </PreviewContainer>
                  </GlassModal>
                )}
              </Popup>
            )}

            {/* 🔹 FORM */}
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

              <Form onSubmit={handleNext}>
                <TextArea
                  name="description"
                  placeholder="Product Description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={300} // Set the maximum length to 300 characters (change as needed)
                  required
                />
                <FormSideContainer>
                  <FormTopContainer>
                    <TitleInput
                      type="text"
                      name="name"
                      placeholder="Product Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <PriceInput
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </FormTopContainer>
                  <FormBottomContainer>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
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
                    />
                    <DiscountInput
                      type="number"
                      name="discount"
                      placeholder="Discount %"
                      value={formData.discount}
                      onChange={handleChange}
                    />
                  </FormBottomContainer>

                  <Input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded font-semibold mt-3"
                  >
                    Next
                  </button>
                </FormSideContainer>
              </Form>
            </FormContainer>
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
                    style={{ backgroundColor: "transparent" }}
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
