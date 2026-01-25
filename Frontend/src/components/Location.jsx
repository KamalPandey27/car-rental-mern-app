import React from "react";
import { useEffect, useState } from "react";
import locationApi from "../api/locationApi";
function Location({ setLocation }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await locationApi.get("/countries/IN/states");
        setStates(res.data);
      } catch (err) {
        console.log("State error:", err);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    if (!selectedState) return;

    const fetchCities = async () => {
      try {
        const res = await locationApi.get(
          `/countries/IN/states/${selectedState}/cities`,
        );
        setCities(res.data);
      } catch (err) {
        console.log("City error:", err);
      }
    };

    fetchCities();
  }, [selectedState]);

  return (
    <>
      <label htmlFor="Location">Location</label>
      <div className="mt-3 flex flex-col gap-7">
        <select
          required
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
            setCities([]);
            setLocation("");
          }}
          className="p-1.5 outline-none border border-gray-500/90 rounded-lg text-sm "
        >
          <option value="">Select a State</option>
          {states.map((state) => (
            <option key={state.iso2} value={state.iso2}>
              {state.name}
            </option>
          ))}
        </select>

        {/* CITY SELECT */}
        <select
          required
          value={selectedCity}
          onChange={(e) => {
            const City = e.target.value;
            setSelectedCity(City);
            setLocation(City);
          }}
          disabled={!selectedState}
          className="p-1.5 outline-none border border-gray-500/90 rounded-lg text-sm"
        >
          <option value="">Select a City</option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Location;
