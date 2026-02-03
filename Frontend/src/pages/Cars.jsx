import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import CarCard from "../components/CarCard";
import api from "../api/axios";

function Cars() {
  const { cars, fetchCars } = useContext(AuthContext);

  const [filteredCars, setFilteredCars] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch cars ONCE
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  // ✅ Always keep cars safe

  // ✅ Search + filter logic
  const safeCars = Array.isArray(cars) ? cars : [];
  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      try {
        const response = await api.post("/api/v1/car/searchCar", { search });
        if (response?.data?.success) {
          setFilteredCars(response.data.data || []);
        } else {
          setFilteredCars([]);
        }
      } catch (error) {
        console.error(error);
        setFilteredCars([]);
      } finally {
        setLoading(false);
      }
    };

    if (search.trim() === "") {
      // Reset to all listed cars
      setFilteredCars(safeCars.filter((car) => car?.isListed));
    } else {
      fetchSearch();
    }
  }, [search, safeCars]);

  return (
    <section className="flex flex-col w-full pt-18.25">
      {/* HEADER */}
      <div className="flex flex-col items-center py-20 bg-light px-4 w-full gap-4">
        <h1 className="font-semibold text-4xl md:text-[40px] text-center">
          Available Cars
        </h1>
        <span className="text-sm md:text-base text-gray-500/90 max-w-156 text-center">
          Browse our selection of premium vehicles available for your next
          adventure
        </span>

        {/* SEARCH */}
        <div className="flex items-center bg-white p-3 gap-2 rounded-full lg:w-[40%] sm:w-[60%] w-full">
          <img src={assets.search_icon} alt="search" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by brand, model, features"
            className="outline-none w-full sm:text-sm text-[12px]"
          />
          <img src={assets.filter_icon} alt="filter" />
        </div>
      </div>

      {/* RESULT COUNT */}
      <div className="text-gray-500/90 mt-10 ml-6 md:ml-35">
        Showing {filteredCars.length} Cars
      </div>

      {/* CARS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-6 md:px-16 lg:px-24 xl:px-32">
        {loading && (
          <p className="col-span-full text-center text-gray-500">
            Searching cars...
          </p>
        )}

        {!loading &&
          filteredCars.map((item) => <CarCard key={item?._id} item={item} />)}

        {!loading && filteredCars.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No cars found.
          </p>
        )}
      </div>
    </section>
  );
}

export default Cars;
