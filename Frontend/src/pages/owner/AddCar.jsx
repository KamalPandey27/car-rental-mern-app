import React, { useState } from "react";
import { assets } from "../../assets/assets";
import api from "../../api/axios";
import Loader from "../../components/Loader";

import Location from "../../components/Location";
function AddCar() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    year: "",
    perDayPrice: "",
    category: "",
    transmission: "",
    fuelType: "",
    seatingCapacity: "",
    location: "",
    description: "",
    image: null,
  });

  const uploadCarData = async (e) => {
    e.preventDefault();

    if (!location) {
      alert("Please select location");
      setLoading(false);
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("brand", carData.brand);
    formData.append("model", carData.model);
    formData.append("year", carData.year);
    formData.append("perDayPrice", carData.perDayPrice);
    formData.append("category", carData.category);
    formData.append("transmission", carData.transmission);
    formData.append("fuelType", carData.fuelType);
    formData.append("seatingCapacity", carData.seatingCapacity);
    formData.append("location", location);
    formData.append("description", carData.description);
    formData.append("image", carData.image);
    try {
      const response = await api.post("/api/v1/car/carListing", formData);

      if (response.data.success) {
        setLoading(false);
        setCarData({
          brand: "",
          model: "",
          year: "",
          perDayPrice: "",
          category: "",
          transmission: "",
          fuelType: "",
          seatingCapacity: "",
          description: "",
          image: null,
        });
        setLocation("");
        alert("Car Listed Successfully");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <section className="pb-10">
      {loading && <Loader />}
      <div className="mb-10">
        <h1 className="sm:text-3xl text-2xl font-medium mb-2">Add New Car</h1>
        <div className="text-gray-500/90 max-w-150">
          Fill in details to list a new car for booking, including pricing,
          availability, and car specifications.
        </div>
      </div>
      <form
        className="text-gray-500/90 flex flex-col gap-5"
        onSubmit={uploadCarData}
      >
        <div className="flex gap-5 items-center">
          <label htmlFor="car-image">
            <img
              src={
                carData.image
                  ? URL.createObjectURL(carData.image)
                  : assets.upload_icon
              }
              alt="upload_icon"
              className="w-25 h-15 cursor-pointer"
            />
            <input
              required
              name="image"
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) =>
                setCarData({ ...carData, image: e.target.files[0] })
              }
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="Brand">Brand</label>
            <input
              required
              type="text"
              id="Brand"
              value={carData.brand}
              onChange={(e) =>
                setCarData({ ...carData, brand: e.target.value })
              }
              placeholder="e.g. BMW , Mercedes , Audi..."
              className="p-1.5 outline-none border border-gray-400/90 rounded placeholder:text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Model">Model</label>
            <input
              required
              type="text"
              id="Model"
              value={carData.model}
              onChange={(e) =>
                setCarData({ ...carData, model: e.target.value })
              }
              placeholder="e.g. X5 , E-Class ,M14..."
              className="p-1.5 outline-none border border-gray-400/90 rounded placeholder:text-sm "
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 grid-cols-2 gap-3 ">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="year">Year</label>
            <input
              required
              type="number"
              name=""
              id="year"
              min={2005}
              value={carData.year}
              onChange={(e) => setCarData({ ...carData, year: e.target.value })}
              placeholder="0"
              className="p-1.5 outline-none border  border-gray-500/90 rounded placeholder:text-sm "
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="price">Daily Price ($)</label>
            <input
              required
              type="number"
              name=""
              id="price"
              value={carData.perDayPrice}
              onChange={(e) =>
                setCarData({ ...carData, perDayPrice: e.target.value })
              }
              placeholder="0"
              className="p-1.5 outline-none border rounded placeholder:text-sm  border-gray-500/90 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category">Category</label>
            <select
              required
              id="category"
              value={carData.category}
              onChange={(e) =>
                setCarData({ ...carData, category: e.target.value })
              }
              className="p-1.5 outline-none border border-gray-500/90 rounded text-sm "
            >
              <option value=""> Select Category</option>
              <option value="Sedan">Sedan</option>
              <option value="Suv">Suv</option>
              <option value="van">Van</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 grid-cols-2 gap-3 ">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="Transmission">Transmission</label>
            <select
              required
              id="Transmission"
              value={carData.transmission}
              onChange={(e) =>
                setCarData({ ...carData, transmission: e.target.value })
              }
              className="p-1.5 outline-none border border-gray-500/90 rounded text-sm "
            >
              <option value="">Select a Transmission</option>
              <option value="automatic">Automatic</option>
              <option value="semautomatic">Semi-automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="FuelType">Fuel Type</label>
            <select
              required
              id="FuelType"
              value={carData.fuelType}
              onChange={(e) =>
                setCarData({ ...carData, fuelType: e.target.value })
              }
              className="p-1.5 outline-none border border-gray-500/90 rounded text-sm "
            >
              <option value="">Select a Fuel Type</option>
              <option value="cng">Cng</option>
              <option value="diesal">Diesal</option>
              <option value="petrol">Petrol</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="SeatingCapacity">Seating Capacity</label>
            <input
              required
              type="number"
              name=""
              id="SeatingCapacity"
              placeholder="0"
              value={carData.seatingCapacity}
              onChange={(e) =>
                setCarData({ ...carData, seatingCapacity: e.target.value })
              }
              className="p-1.5 outline-none border rounded placeholder:text-sm  border-gray-500/90 "
            />
          </div>
        </div>
        <div>
          <Location setLocation={setLocation} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="Description">Description</label>
          <textarea
            required
            name=""
            id=""
            cols="30"
            rows="5"
            value={carData.description}
            onChange={(e) =>
              setCarData({ ...carData, description: e.target.value })
            }
            placeholder="e.g. A luxurious SUV with a spacious interior and a powerfull engine"
            className="resize-none p-2 outline-none border border-gray-500/90 rounded text-sm "
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="hover:bg-blue-800 flex items-center sm:gap-2 gap-1 sm:px-4 px-2 sm:py-2.5 py-1.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer sm:text-[16px] text-sm"
          >
            <img src={assets.tick_icon} alt="tick_icon" />
            List Your Car
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddCar;
