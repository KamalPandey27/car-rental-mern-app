import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import Location from "../components/Location";

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, fetchCars } = useContext(AuthContext);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [location, setLocation] = useState("");

  // ✅ Fetch cars ONCE
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  // ✅ Safe find
  const car = cars?.find((item) => String(item?._id) === id);

  // ✅ Guard: prevent crash
  if (!car) {
    return (
      <div className="mt-40 text-center text-gray-500 text-lg">
        Loading car details...
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!car?.isAvailable) {
      alert("Car is already booked");
      return;
    }

    if (!location || !pickupDate || !returnDate) {
      alert("Fill all details");
      return;
    }

    if (new Date(returnDate) < new Date(pickupDate)) {
      alert("Please select correct return date");
      return;
    }

    const days = Math.ceil(
      (new Date(returnDate) - new Date(pickupDate)) / 86400000,
    );

    const totalDays = Math.max(1, days);
    const totalAmount = (car?.perDayPrice || 0) * totalDays;

    navigate("/payment", {
      state: {
        pickupDate,
        returnDate,
        location,
        totalDays,
        totalAmount,
        carId: car?._id,
        owner: car?.owner,
      },
    });
  };

  return (
    <div className="mt-35 w-[80%] m-auto flex justify-between gap-5 lg:flex-row flex-col relative">
      <Link to="/cars" className="absolute -top-10 text-gray-500/90 flex gap-2">
        <img src={assets.arrow_icon} alt="arrow_icon" className="rotate-180" />
        Back to all Cars
      </Link>

      {/* LEFT */}
      <div className="lg:w-[70%] w-full flex flex-col gap-5">
        <div className="border-b border-gray-400/90 flex flex-col gap-5">
          <img
            src={car?.image?.url || ""}
            alt="car"
            className="rounded-2xl md:max-h-100 h-auto w-full object-cover"
          />

          <div>
            <span className="lg:text-4xl font-semibold">
              {(car?.brand || "").toUpperCase()}
            </span>
            <span className="block text-gray-500/90 mb-5">
              {car?.category
                ? car.category.charAt(0).toUpperCase() + car.category.slice(1)
                : ""}{" "}
              - {car?.year}
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-4 grid-cols-2 gap-5">
          <InfoCard
            icon={assets.users_icon}
            text={`${car?.seatingCapacity} Seats`}
          />
          <InfoCard
            icon={assets.fuel_icon}
            text={
              car?.fuelType
                ? car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)
                : ""
            }
          />
          <InfoCard
            icon={assets.carIcon}
            text={
              car?.transmission
                ? car.transmission.charAt(0).toUpperCase() +
                  car.transmission.slice(1)
                : ""
            }
          />
          <InfoCard icon={assets.location_icon} text={car?.location || ""} />
        </div>

        <div>
          <h2 className="text-xl font-medium mb-2">Description</h2>
          <p className="text-gray-500/90">{car?.description}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="shadow-lg rounded-xl p-6 text-gray-500 lg:w-[35%] w-full">
        <div className="border-b flex justify-between pb-5">
          <span className="text-black text-2xl font-semibold">
            ₹{car?.perDayPrice}
          </span>
          <span>per day</span>
        </div>

        <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
          <DateInput label="Pickup Date" onChange={setPickupDate} />
          <DateInput label="Return Date" onChange={setReturnDate} />
          <Location setLocation={setLocation} />

          <button
            className="w-full bg-primary py-3 text-white rounded-xl"
            type="submit"
            disabled={!car?.isAvailable}
          >
            {car?.isAvailable ? "Book Now" : "Car Not Available"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* 🔹 Small reusable components */
const InfoCard = ({ icon, text }) => (
  <div className="bg-light flex justify-center items-center flex-col gap-2 py-5 rounded">
    <img src={icon} alt="icon" className="w-5" />
    <span>{text}</span>
  </div>
);

const DateInput = ({ label, onChange }) => (
  <div className="flex flex-col gap-2">
    <label>{label}</label>
    <input
      type="date"
      className="p-2 border border-gray-400/90 rounded-lg"
      min={new Date().toISOString().split("T")[0]}
      required
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default CarDetails;
