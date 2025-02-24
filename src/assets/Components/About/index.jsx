import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";
import Navbar from "../Navbar";

const RetailerDetails = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
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
        "https://pricpickbackend.onrender.com/retailer/details",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (response.ok && data) {
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
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        "https://pricpickbackend.onrender.com/retailer/update-details",
        {
          method: "PUT",
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

  // Render Retailer Details in Grid Layout
  const renderRetailerGrid = () => (
    <div className="grid grid-cols-5 grid-rows-3 gap-6 bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
      {/* Shop Name */}
      <div className="col-span-2 bg-gray-200 p-4 rounded-lg">
        <p className="text-lg text-gray-700">
          <strong className="text-gray-900">Shop Name:</strong>{" "}
          {details.shopname}
        </p>
      </div>

      {/* Phone Number */}
      <div className="col-span-2 bg-gray-200 p-4 rounded-lg">
        <p className="text-lg text-gray-700">
          <strong className="text-gray-900">Phone:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          ) : (
            details.phoneNumber
          )}
        </p>
      </div>

      {/* Shop Time */}
      <div className="col-span-2 row-span-2 bg-gray-200 p-4 rounded-lg">
        <p className="text-lg text-gray-700">
          <strong className="text-gray-900">Shop Time:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              name="shoptime"
              value={formData.shoptime}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          ) : (
            details.shoptime
          )}
        </p>
      </div>

      {/* Edit/Update Button */}
      <div className="col-span-5 flex justify-center mt-4">
        {isEditing ? (
          <button
            className="px-5 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
            onClick={handleUpdate}
          >
            Update
          </button>
        ) : (
          <button
            className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );

  // Render Add Retailer Form
  const renderAddRetailerForm = () => (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Add Retailer Details
      </h2>
      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-semibold">
            Shop Name:
          </label>
          <input
            type="text"
            name="shopname"
            value={details?.shopname || ""}
            disabled
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold p-3 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-[90vh] bg-gray-100">
          <ThreeDots color="palevioletred" height={80} width={80} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-[90vh] bg-gray-100 p-4">
          {details ? renderRetailerGrid() : renderAddRetailerForm()}
        </div>
      )}
    </>
  );
};

export default RetailerDetails;
