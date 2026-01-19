import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { BookContext } from "../context/BookContext";
import CarCard from "../components/CarCard";
function Cars() {
  const { carData } = useContext(BookContext);
  return (
    <>
      <section className="flex flex-col  w-full pt-18.25">
        <div className="flex flex-col items-center py-20 bg-light max-md:px-4 w-full gap-4">
          <div className="font-semibold text-4xl md:text-[40px] text-center">
            Available Cars
          </div>
          <span className="text-sm md:text-base text-gray-500/90  max-w-156 text-center">
            Browse our selection of premium vehicles available for your next
            adventure
          </span>
          <div className="flex items-center justify-center bg-white p-3 gap-2 rounded-full lg:w-[40%] sm:w-[60%] w-[95%]">
            <img src={assets.search_icon} alt="search_icon" />
            <input
              type="text"
              name=""
              id=""
              placeholder="Search by name , model , features"
              className="outline-none w-full sm:text-sm text-[12px]"
            />
            <img src={assets.filter_icon} alt="filter_icon" />
          </div>
        </div>
        <div className="text-gray-500/90 mt-10 ml-35">
          Showing {carData.length} Cars
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-6 md:px-16 lg:px-24 xl:px-32">
          {carData?.map((item) => (
            <CarCard item={item} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Cars;
