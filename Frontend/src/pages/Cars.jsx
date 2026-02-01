import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CarCard from "../components/CarCard";
import { useEffect } from "react";
import api from "../api/axios";
function Cars() {
  const { cars, fetchCars } = useContext(AuthContext);
  const [filteredCars, setFilteredCars] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCars();
  });

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await api.post("/api/v1/car/searchCar", { search });
        console.log(response);
        if (response.data.success) {
          setFilteredCars(response.data.data);
        }
      } catch (error) {
        console.log(error);
        setFilteredCars([]);
      }
    };
    if (search.trim() === "") {
      setFilteredCars(cars.filter((car) => car.isListed)); // reset to all cars
    } else {
      fetchSearch();
    }
  }, [search, cars]);

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
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search by name , model , features"
              className="outline-none w-full sm:text-sm text-[12px]"
            />
            <img src={assets.filter_icon} alt="filter_icon" />
          </div>
        </div>
        <div className="text-gray-500/90 mt-10 ml-35">
          Showing {filteredCars.length} Cars
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-6 md:px-16 lg:px-24 xl:px-32">
          {filteredCars?.map((item) => (
            <CarCard item={item} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Cars;
