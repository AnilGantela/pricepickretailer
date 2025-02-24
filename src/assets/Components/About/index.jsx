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
        console.log(data);
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
    <div className="w-full h-[90vh] flex items-center justify-center bg-gray-100 p-4">
      <div className="grid grid-cols-5 grid-rows-3 gap-10 w-full h-full p-6 bg-white shadow-lg rounded-lg">
        <div className="col-span-2 flex items-center justify-center">
          <p className="text-xl font-semibold">{details.username}</p>
        </div>

        <div className="row-span-2 col-start-3 flex items-center justify-center">
          <img
            src={details.photo}
            alt="photo"
            className="w-40 h-40 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="col-span-2 col-start-4 flex items-center justify-center text-lg font-semibold">
          {details.shopname}
        </div>

        <div className="col-span-2 row-span-2 col-start-4 row-start-2 p-4">
          <div className="text-gray-700">{details.address}</div>
          <div className="flex gap-4 mt-2 text-gray-700">
            <div>{details.pincode}</div>
            <div>{details.city}</div>
          </div>
        </div>

        <div className="col-span-2 col-start-1 row-start-2 flex items-center text-gray-700">
          {details.email}
        </div>

        <div className="row-start-3 flex items-center text-gray-700">
          {details.phoneNumber}
        </div>

        <div className="col-span-2 row-start-3 flex items-center text-gray-700">
          {details.shoptime}
        </div>
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
