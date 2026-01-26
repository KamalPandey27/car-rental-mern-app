import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
function Hero() {
  const location = ["Panipat", "Samalkha", "Delhi"];

  const [selectLocation, setSelectLocation] = useState(
    "Please select location",
  );
  return (
    <>
      {" "}
      <section className="bg-light min-h-screen w-full flex justify-center py-3 gap-5 items-center flex-col ">
        <div className="text-4xl md:text-5xl font-semibold text-center my-5">
          Luxury cars on Rent
        </div>
        <form
          action=""
          className=" xl:w-[60vw] lg:w-[75vw] w-[90vw] md:h-auto sm:h-auto  py-8 sm:rounded-full rounded flex justify-center items-center flex-col md:flex-row lg:gap-20 sm:gap-10 gap-5 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
        >
          <div className="flex lg:gap-10 gap-5  items-center sm:flex-row flex-col justify-center ">
            <div className="flex flex-col justify-center items-center gap-3 lg:ml-10">
              <select
                name=""
                id=""
                onClick={(e) => setSelectLocation(e.target.value)}
              >
                <option value="">Pickup Location</option>
                {location.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <span className="text-gray-400 text-sm">
                {selectLocation ? selectLocation : "Please select location"}
              </span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <label htmlFor="pickupdate">Pick-up Date</label>
              <input
                type="date"
                id="pickupdate"
                className="text-gray-400"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <label htmlFor="returndate">Return Date</label>
              <input
                type="date"
                id="returndate"
                min={new Date().toISOString().split("T")[0]}
                className="text-gray-400"
                required
              />
            </div>
          </div>
          <button
            className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer"
            type="submit"
          >
            <img
              src={assets.search_icon}
              alt="search"
              className="brightness-300"
            />
            Search
          </button>
        </form>
        <img src={assets.main_car} alt="main_car" className="max-h-75 w-auto" />
      </section>
    </>
  );
}

export default Hero;
