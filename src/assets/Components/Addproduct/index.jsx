import { useState } from "react";
import {
  BarChart,
  Bar,
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
} from "./styleComponents";

const electronicCategories = [
  {
    category: "Mobile & Accessories",
    subcategories: [
      "Smartphones",
      "Feature Phones",
      "Phone Cases & Covers",
      "Screen Protectors",
      "Chargers & Cables",
      "Power Banks",
      "Headphones & Earphones",
      "Smartwatches & Fitness Bands",
    ],
  },
  {
    category: "Computers & Laptops",
    subcategories: [
      "Laptops",
      "Desktop Computers",
      "Monitors",
      "Keyboards & Mice",
      "External Hard Drives & SSDs",
      "Printers & Scanners",
      "Software & Operating Systems",
    ],
  },
  {
    category: "TV & Entertainment",
    subcategories: [
      "Smart TVs",
      "LED / OLED / QLED TVs",
      "Streaming Devices",
      "Soundbars & Home Theaters",
      "Projectors",
      "Gaming Consoles",
    ],
  },
  {
    category: "Cameras & Photography",
    subcategories: [
      "DSLR Cameras",
      "Mirrorless Cameras",
      "Action Cameras",
      "Drones",
      "Camera Lenses",
      "Tripods & Gimbals",
      "Memory Cards",
    ],
  },
  {
    category: "Home Appliances",
    subcategories: [
      "Refrigerators",
      "Washing Machines",
      "Microwaves",
      "Air Conditioners",
      "Vacuum Cleaners",
      "Water Purifiers",
      "Electric Kettles",
    ],
  },
  {
    category: "Gaming & Accessories",
    subcategories: [
      "Gaming Laptops",
      "Gaming Consoles",
      "Gaming Controllers",
      "Gaming Keyboards & Mice",
      "VR Headsets",
      "Graphics Cards",
    ],
  },
  {
    category: "Networking & Accessories",
    subcategories: [
      "WiFi Routers",
      "Modems",
      "Network Switches",
      "Ethernet Cables",
      "WiFi Extenders",
    ],
  },
  {
    category: "Wearable Technology",
    subcategories: ["Smartwatches", "Fitness Bands", "AR/VR Devices"],
  },
  {
    category: "Car Electronics",
    subcategories: [
      "Car Stereos",
      "Dash Cameras",
      "GPS Navigation Devices",
      "Car Chargers",
      "Bluetooth Car Kits",
    ],
  },
];

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
  const [searchInput, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [retailerPriceSummary, setRetailerPriceSummary] = useState([]); // Added loading state for search

  // Handle input change for product form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle search input change
  const handleSearchValue = (e) => {
    setSearch(e.target.value);
  };

  // Handle product submission
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

      await axios.post(
        "https://pricepick-1032723282466.us-central1.run.app/retailer/product/create",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
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
        console.log(retailerPriceSummary);
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
              <p>Loading...</p> // Show loading while fetching
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
          <FormContainer>
            <FormTitle>
              <span>Create Product</span>
              <div>
                {error && (
                  <span style={{ color: "red", display: "inline-block" }}>
                    {error}
                  </span>
                )}
                {success && (
                  <span
                    style={{
                      color: "green",
                      display: "inline-block",
                      marginLeft: "10px",
                    }}
                  >
                    {success}
                  </span>
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
                  className="border border-gray-300 rounded"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {electronicCategories.map((group) => (
                    <optgroup key={group.category} label={group.category}>
                      {group.subcategories.map((subcategory) => (
                        <option
                          key={subcategory}
                          value={subcategory.toLowerCase()}
                        >
                          {subcategory}
                        </option>
                      ))}
                    </optgroup>
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
          {retailerPriceSummary.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-center mb-4">
                Retailer Price Trends
              </h2>
              <ChartConainter>
                {/* 📈 Line Chart */}
                <ResponsiveContainer width="100%" height={184}>
                  <LineChart
                    data={retailerPriceSummary}
                    margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                  >
                    <XAxis dataKey="retailer" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="lowestPrice"
                      stroke="#82ca9d"
                      name="Lowest Price"
                    />
                    <Line
                      type="monotone"
                      dataKey="averagePrice"
                      stroke="#8884d8"
                      name="Average Price"
                    />
                    <Line
                      type="monotone"
                      dataKey="highestPrice"
                      stroke="#d88484"
                      name="Highest Price"
                    />
                  </LineChart>
                </ResponsiveContainer>

                {/* 📊 Bar Chart */}
                <ResponsiveContainer width="100%" height={184}>
                  <BarChart
                    data={retailerPriceSummary}
                    margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                  >
                    <XAxis dataKey="retailer" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="lowestPrice"
                      fill="#82ca9d"
                      name="Lowest Price"
                    />
                    <Bar
                      dataKey="averagePrice"
                      fill="#8884d8"
                      name="Average Price"
                    />
                    <Bar
                      dataKey="highestPrice"
                      fill="#d88484"
                      name="Highest Price"
                    />
                  </BarChart>
                </ResponsiveContainer>

                {/* 🔥 Suggested Price Range */}
              </ChartConainter>
              <p className="text-center mt-4">
                Suggested Price Range:
                <strong>
                  {Math.min(...retailerPriceSummary.map((r) => r.lowestPrice))}
                </strong>{" "}
                -{" "}
                <strong>
                  {Math.max(...retailerPriceSummary.map((r) => r.highestPrice))}
                </strong>
              </p>
            </>
          )}
        </ContentContainer>
      </AddProductContainer>
    </>
  );
};

export default ProductForm;
