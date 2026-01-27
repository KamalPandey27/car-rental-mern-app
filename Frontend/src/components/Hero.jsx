import React, { useEffect } from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import locationApi from "../api/locationApi";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
function Hero() {
  const { setCars } = useContext(AuthContext);
  const [state, setState] = useState([]);
  const [city, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectLocation, setSelectLocation] = useState(
    "Please select location",
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await locationApi.get("/countries/IN/states");
        setState(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchState();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await locationApi.get(
          `/countries/IN/states/${selectedState}/cities`,
        );
        setCities(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCities();
  }, [selectedState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/api/v1/car/search", { selectLocation });
      setCars(response.data.data);
      if (response.data.success) {
        navigate("/cars");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <section className="bg-light min-h-screen w-full flex justify-center py-3 gap-5 items-center flex-col ">
        <div className="text-4xl md:text-5xl font-semibold text-center my-5">
          Luxury cars on Rent
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          className=" xl:w-[60vw] lg:w-[75vw] w-[90vw] md:h-auto sm:h-auto  py-8 sm:rounded-full rounded flex justify-center items-center flex-col md:flex-row lg:gap-20 sm:gap-10 gap-5 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
        >
          <div className="flex lg:gap-10 gap-5  items-center sm:flex-row flex-col justify-center ">
            <div className="flex flex-col justify-center items-center gap-3 lg:ml-10">
              <select
                className="w-48"
                name=""
                id=""
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">Select State</option>
                {state.map((item) => {
                  return (
                    <option key={item.id} value={item.iso2}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <select
                name=""
                id=""
                value={selectLocation}
                onChange={(e) => setSelectLocation(e.target.value)}
              >
                <option value="">Select City</option>
                {city.map((item) => {
                  return (
                    <option key={item.id} value={item.iso2}>
                      {item.name}
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
