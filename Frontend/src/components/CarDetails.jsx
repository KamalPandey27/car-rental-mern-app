import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Location from "../components/Location";
import { useNavigate } from "react-router-dom";
function CarDetails() {
  const { id } = useParams();
  const { cars, fetchCars } = useContext(AuthContext);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();
  const car = cars.find((item) => String(item._id) === id);

  useEffect(() => {
    fetchCars();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!car.isAvailable) {
      alert("Car is already booked");
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
    const totalAmount = car.perDayPrice * totalDays;

    navigate("/payment", {
      state: {
        pickupDate,
        returnDate,
        location,
        totalDays,
        totalAmount,
        carId: car._id,
        owner: car.owner,
      },
    });
  };

  return (
    <>
      {/* {loading && <Loader />} */}
      <div className="mt-35 w-[80%] m-auto flex justify-between gap-5 lg:flex-row flex-col relative">
        <Link
          to="/cars"
          className="absolute -top-10 text-gray-500/90 flex gap-2"
        >
          <img
            src={assets.arrow_icon}
            alt="arrow_icon"
            className="rotate-180"
          />
          Back to all Cars
        </Link>
        <div className="lg:w-[70%] w-full flex flex-col gap-5">
          {" "}
          <div className="border-b border-gray-400/90 flex flex-col gap-5 ">
            <img
              src={car.image.url}
              alt="carImage"
              className="rounded-2xl md:max-h-100 h-auto w-full object-cover"
            />
            <div className="flex flex-col gap-1">
              <span className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-semibold">
                {String(car.brand).toUpperCase()}
              </span>
              <span className="text-gray-500/90 mb-5 sm:text-[16px] text-[14px]">
                {String(car.category).charAt(0).toUpperCase()}
                {String(car.category).slice(1) || ""} - {car.year}
              </span>
            </div>
          </div>
          <div className="grid sm:grid-cols-4 grid-cols-2 gap-5">
            <div className="bg-light flex justify-center items-center flex-col gap-2 py-5 rounded">
              <img src={assets.users_icon} alt="users_icon" className="w-5" />
              <span>{car.seatingCapacity} Seats</span>
            </div>
            <div className="bg-light flex justify-center items-center flex-col gap-2 py-5 rounded">
              <img src={assets.fuel_icon} alt="fuel_icon" className="w-5" />
              <span>
                {" "}
                {String(car.fuelType).charAt(0).toUpperCase()}
                {String(car.fuelType).slice(1) || ""}
              </span>
            </div>
            <div className="bg-light flex justify-center items-center flex-col gap-2 py-5 rounded">
              <img src={assets.carIcon} alt="carIcon" className="w-5" />
              <span className="text-center">
                {" "}
                {String(car.transmission).charAt(0).toUpperCase()}
                {String(car.transmission).slice(1) || ""}
              </span>
            </div>
            <div className="bg-light flex justify-center items-center flex-col gap-2 py-5 rounded">
              <img
                src={assets.location_icon}
                alt="transmission"
                className="w-5"
              />
              <span>{car.location}</span>
            </div>
          </div>
          <div className="">
            <div className="sm:text-2xl text-xl font-medium mb-3">
              Description
            </div>
            <span className="text-gray-500/90 sm:text-[15px] text-[14px]">
              {car.description}
            </span>
          </div>
          <div>
            <div className="sm:text-2xl font-medium mb-3 text-xl">Features</div>
            <div className="grid grid-cols-2 gap-3 text-gray-500/90 sm:text-[16px] text-[14px]">
              <div className="flex items-center gap-2">
                <img src={assets.check_icon} alt="check_icon" className="w-4" />{" "}
                360 Camera
              </div>
              <div className="flex items-center gap-2">
                <img src={assets.check_icon} alt="check_icon" className="w-4" />{" "}
                Bluetooth
              </div>
              <div className="flex items-center gap-2">
                <img src={assets.check_icon} alt="check_icon" className="w-4" />{" "}
                GPS
              </div>
              <div className="flex items-center gap-2">
                <img src={assets.check_icon} alt="check_icon" className="w-4" />{" "}
                Heated Seats
              </div>
              <div className="flex items-center gap-2">
                <img src={assets.check_icon} alt="check_icon" className="w-4" />{" "}
                Rear View Mirror
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-lg h-max  rounded-xl p-6 space-y-6 text-gray-500 lg:w-[35%] w-full">
          <div className=" border-b border-gray-400/90 flex justify-between pb-5 ">
            <span className=" text-black text-2xl  font-semibold">
              ${car.perDayPrice}
            </span>
            <span className="">per day</span>
          </div>
          <form
            action=""
            className="flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="pickupDate">Pickup Date</label>
              <input
                type="date"
                name="pickupDate"
                id="pickupDate"
                className="p-2 border border-gray-400/90 outline-none rounded-lg"
                required
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="returnDate">Return Date</label>
              <input
                type="date"
                name="returnDate"
                id="returnDate"
                className="p-2 border border-gray-400/90 outline-none rounded-lg"
                required
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
            <div>
              <Location setLocation={setLocation} />
            </div>
            <button
              className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer"
              type="submit"
              disabled={!car.isAvailable}
            >
              {car.isAvailable ? "Book Now" : "Car Not Available"}
            </button>
          </form>
          <div className="text-center">No credit card required to reserve</div>
        </div>
      </div>
    </>
  );
}

export default CarDetails;
