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
  const handleFormData = async () => {
    try {
      const response = await fetch(
        "https://pricpickbackend.onrender.com/retailer/add-details",
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

  // Render Retailer Details in Grid Layout
  const renderRetailerGrid = () => (
    <div className="w-full h-[90vh] flex items-center justify-center bg-gray-100 p-4">
      <div className="grid grid-cols-5 grid-rows-3 gap-4 w-full h-full p-6 bg-white shadow-lg rounded-lg">
        <div className="col-span-2 flex flex-col justify-center bg-pink-600/50 text-white rounded-lg shadow-lg backdrop-blur-md transition transform hover:bg-pink-600/70 hover:scale-105 duration-300 p-6">
          <p className="text-xl font-semibold text-left pl-6">Retailer</p>
          <p className="text-5xl font-bold text-center">{details.username}</p>
        </div>

        {/* Profile Image */}
        <div className="row-span-2 col-start-3 flex items-center justify-center bg-pink-500/50 rounded-lg shadow-lg backdrop-blur-md transition transform hover:bg-pink-600/70 hover:scale-105 duration-300">
          <img
            src={details.photo}
            alt="Retailer Photo"
            className="w-40 h-40 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Shop Name */}
        <div className="col-span-2 col-start-4 flex flex-col justify-center bg-pink-500/50 text-white rounded-lg shadow-lg backdrop-blur-md transition transform hover:bg-pink-600/70 hover:scale-105 duration-300 p-6">
          <p className="text-xl font-semibold text-left pl-6">Shop Name</p>
          <p className="text-4xl font-bold text-center">{details.shopname}</p>
        </div>

        {/* Address & Location */}
        <div className="col-span-2 row-span-2 col-start-4 row-start-2 p-6 bg-pink-500/50 text-white rounded-lg shadow-lg backdrop-blur-md flex flex-col justify-center transition transform hover:bg-pink-600/70 hover:scale-105 duration-300">
          <p className="text-xl font-semibold text-left pl-6">Address</p>
          <p className="text-4xl text-center font-bold">{details.address}</p>
          <div className="flex gap-4 mt-2 text-2xl font-bold">
            <p>{details.pincode}</p>
            <p>{details.city}</p>
          </div>
        </div>

        {/* Email */}
        <div className="col-span-2 col-start-1 row-start-2 flex flex-col justify-center bg-pink-500/50 text-white rounded-lg shadow-lg backdrop-blur-md transition transform hover:bg-pink-600/70 hover:scale-105 duration-300 p-6">
          <p className="text-xl font-semibold text-left pl-6">Email</p>
          <p className="text-3xl text-center font-bold">{details.email}</p>
        </div>

        {/* Phone Number */}
        <div className="row-start-3 flex flex-col justify-center bg-pink-500/50 text-white rounded-lg shadow-lg backdrop-blur-md transition transform hover:bg-pink-600/70 hover:scale-105 duration-300 p-6">
          <p className="text-xl font-semibold text-left pl-6">Phone</p>
          <p className="text-4xl text-center font-bold">
            {details.phoneNumber}
          </p>
        </div>

        {/* Shop Timing */}
        <div className="col-span-2 row-start-3 flex flex-col justify-center bg-pink-500/50 text-white rounded-lg shadow-lg backdrop-blur-md transition transform hover:bg-pink-600/70 hover:scale-105 duration-300 p-6">
          <p className="text-xl font-semibold text-left pl-6">Shop Timing</p>
          <p className="text-4xl text-center font-bold">{details.shoptime}</p>
        </div>
      </div>
    </div>
  );

  const renderAddRetailerForm = () => (
    <div className="w-full h-[90vh] flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg grid grid-cols-2 gap-6">
        {/* Image Upload Section */}
        <div className="flex flex-col items-center justify-center bg-gray-200 rounded-lg p-4">
          <label className="text-gray-700 font-semibold">Upload Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setFormData({ ...formData, photo: reader.result });
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg bg-white"
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
