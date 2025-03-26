import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";
import {
  Loader,
  RetailerDetailsContainer,
  RetailerImageContainer,
  RetailerDetailsTitle,
  RetailerTextContainer,
  RetailerDetailsContainerUp,
} from "./styledComponents";

const RetailerDetails = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    shoptime: "",
  });

  const navigate = useNavigate();
  const token = Cookies.get("pricepicktoken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchRetailerDetails();
  }, [token, navigate]);

  // Fetch Retailer Details
  const fetchRetailerDetails = async () => {
    try {
      const response = await fetch(
        "https://pricepick-1032723282466.us-central1.run.app/retailer/details",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (response.ok && data) {
        Cookies.set("retailerDetails", data);
        console.log(Cookies.get("retailerDetails"));
        setDetails(data);
        setFormData({
          phoneNumber: data.phoneNumber,
          shoptime: data.shoptime,
        });
      } else {
        setDetails(null);
      }
    } catch (error) {
      console.error("Error fetching retailer details:", error);
      setDetails(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Update
  const handleFormData = async () => {
    try {
      console.log(formData);
      const response = await fetch(
        "https://pricepick-1032723282466.us-central1.run.app/retailer/add-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setDetails((prev) => ({ ...prev, ...formData }));
        setIsEditing(false);
      } else {
        console.error("Failed to update details:", data.message);
      }
    } catch (error) {
      console.error("Error updating retailer details:", error);
    }
  };

  const renderRetailerGrid = () => (
    <RetailerDetailsContainerUp>
      <RetailerDetailsTitle>Details of You</RetailerDetailsTitle>
      <RetailerDetailsContainer>
        <RetailerImageContainer>
          <img src={details.photo} alt="shop Photo" />
        </RetailerImageContainer>
        <RetailerTextContainer>
          <p>
            Retailer: @<span>{details.username}</span>
          </p>
          <p>
            Shop Name: @<span>{details.shopname}</span>
          </p>
          <p>
            Address: {details.address?.street ?? "N/A"},{" "}
            {details.address?.city ?? "N/A"}, {details.address?.state ?? "N/A"}
          </p>
          <p>Email: {details.email}</p>
          <p>Phone: {details.phoneNumber}</p>
          <p>Shop Timing: {details.shoptime}</p>
        </RetailerTextContainer>
      </RetailerDetailsContainer>
    </RetailerDetailsContainerUp>
  );

  const renderAddRetailerForm = () => (
    <div className="w-full h-[90vh] flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg grid grid-cols-2 gap-6">
        {/* Image Upload Section */}
        <div className="flex flex-col items-center justify-center bg-gray-200 rounded-lg p-4">
          <label className="text-gray-700 font-semibold">
            Upload Photo: <span className="text-red-600">100kb</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  console.log(
                    "Converted Image Data:",
                    reader.result.substring(0, 100)
                  ); // Debug log
                  setFormData({ ...formData, photo: reader.result });
                };
                reader.readAsDataURL(file);
              }
            }}
          />

          {formData.photo && (
            <img
              src={formData.photo}
              alt="Preview"
              className="mt-4 w-40 h-40 object-cover rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Update Retailer Details
          </h2>

          <div>
            <label className="block text-gray-700 font-semibold">
              Shop Name:
            </label>
            <input
              type="text"
              name="shopname"
              onChange={handleChange}
              value={formData.shopname}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Phone Number:
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Street:</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">
                Pincode:
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Shop Time:
            </label>
            <input
              type="text"
              name="shoptime"
              value={formData.shoptime}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            onClick={handleFormData}
            className="w-full bg-green-500 text-white font-semibold p-3 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {loading ? (
        <Loader>
          <ThreeDots color="#5f5fd4" height={80} width={80} />
        </Loader>
      ) : (
        <>{details ? renderRetailerGrid() : renderAddRetailerForm()}</>
      )}
    </>
  );
};

export default RetailerDetails;
