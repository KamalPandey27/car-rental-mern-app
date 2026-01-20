import React from "react";
import { assets } from "../../assets/assets";

function AddCar() {
  return (
    <section className="pb-10">
      <div className="mb-10">
        <h1 className="sm:text-3xl text-2xl font-medium mb-2">Add New Car</h1>
        <div className="text-gray-500/90 max-w-150">
          Fill in details to list a new car for booking, including pricing,
          availability, and car specifications.
        </div>
      </div>
      <form action="" className="text-gray-500/90 flex flex-col gap-5">
        <div className="flex gap-5 items-center">
          <label htmlFor="car-image">
            <img
              src={assets.upload_icon}
              alt="upload_icon"
              className="w-25 h-15 cursor-pointer"
            />
            <input type="file" id="car-image" accept="image/*" hidden />
          </label>
          <p class="text-sm text-gray-500">Upload a picture of your car</p>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="Brand">Brand</label>
            <input
              type="text"
              id="Brand"
              placeholder="e.g. BMW , Mercedes , Audi..."
              className="p-1.5 outline-none border border-gray-400/90 rounded placeholder:text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Model">Model</label>
            <input
              type="text"
              id="Model"
              placeholder="e.g. X5 , E-Class ,M14..."
              className="p-1.5 outline-none border border-gray-400/90 rounded placeholder:text-sm "
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 grid-cols-2 gap-3 ">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              name=""
              id="year"
              placeholder="0"
              className="p-1.5 outline-none border  border-gray-500/90 rounded placeholder:text-sm "
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="year">Daily Price ($)</label>
            <input
              type="number"
              name=""
              id="year"
              placeholder="0"
              className="p-1.5 outline-none border rounded placeholder:text-sm  border-gray-500/90 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="p-1.5 outline-none border border-gray-500/90 rounded text-sm "
            >
              <option value="Select category"> Select Category</option>
              <option value="Sedan">Sedan</option>
              <option value="Suv">Suv</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 grid-cols-2 gap-3 ">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="Transmission">Transmission</label>
            <select
              id="Transmission"
              className="p-1.5 outline-none border border-gray-500/90 rounded text-sm "
            >
              <option value="Select Transmission">Select a Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Semi-automatic">Semi-automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="FuelType">Fuel Type</label>
            <select
              id="FuelType"
              className="p-1.5 outline-none border border-gray-500/90 rounded text-sm "
            >
              <option value="FuelType">Select a Fuel Type</option>
              <option value="Gas">Gas</option>
              <option value="Diesal">Diesal</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="SeatingCapacity">Seating Capacity</label>
            <input
              type="number"
              name=""
              id="SeatingCapacity"
              placeholder="0"
              className="p-1.5 outline-none border rounded placeholder:text-sm  border-gray-500/90 "
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="Location">Location</label>
            <select
              id="Location"
              className="p-1.5 outline-none border border-gray-500/90 rounded text-sm "
            >
              <option value="Select category">Select a Location</option>
              <option value="Delhi">Delhi</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Panipat">Panipat</option>
              <option value="Smalkha">Smalkha</option>
              <option value="Karnal">Karnal</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="Description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            placeholder="e.g. A luxurious SUV with a spacious interior and a powerfull engine"
            className="resize-none p-2 outline-none border border-gray-500/90 rounded text-sm "
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="flex items-center sm:gap-2 gap-1 sm:px-4 px-2 sm:py-2.5 py-1.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer sm:text-[16px] text-sm"
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
