import React, { useEffect } from "react";
import { useContext } from "react";
import { assets } from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
function MyBookings() {
  const { bookingCar, fetchUserBookings } = useContext(AuthContext);
  useEffect(() => {
    fetchUserBookings();
  });
  return (
    <>
      <section className=" w-full sm:p-20 p-8 my-15 pt-18.25 bg-light">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-semibold text-center">My Bookings</h1>
          <p className="text-gray-500/90 text-center">
            View and manage your all car bookings
          </p>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          {bookingCar
            .slice()
            .reverse()
            ?.map((cars, index) => {
              return (
                <div
                  key={cars._id}
                  className="md:p-5  sm:p-4 p-3 border flex justify-between  md:flex-row flex-col gap-3 border-gray-400/90 rounded-lg xl:w-[70%] lg:w-[80%] w-full"
                >
                  <div className="flex sm:flex-row flex-col md:gap-7 sm:gap-4 gap-5">
                    <div className="flex flex-col gap-1">
                      <img
                        src={cars.car.image.url}
                        alt="carImage"
                        className="sm:w-50 rounded"
                      />
                      <div className="flex flex-col">
                        <span className="text-lg font-medium mt-2">
                          {cars.car.brand} - {cars.car.model}
                        </span>
                        <span className="text-gray-500">
                          {cars.car.year} - {cars.car.category} -{" "}
                          {cars.car.location}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div>
                        <span className="px-3 py-1.5 bg-light rounded">
                          Booking #{index + 1}
                        </span>
                        <span className="px-3 py-1 text-xs rounded-full bg-red-400/15 text-red-600">
                          {cars.status}
                        </span>
                      </div>

                      <div className="flex items-start gap-2 mt-3">
                        <img
                          src={assets.calendar_icon_colored}
                          alt="calendar_icon_colored"
                          className="w-4 h-4 mt-1"
                        />
                        <div className="flex flex-col">
                          <span className="text-gray-500">Rental Period</span>
                          <span className="flex lg:gap-2 lg:flex-row md:gap-1 md:flex-col sm:flex-row flex-col gap-2 ">
                            <p> {String(cars.pickupDate).split("T")[0]}</p> To
                            <p>{String(cars.returnDate).split("T")[0]}</p>
                          </span>
                        </div>
                      </div>

                      <div className=" mt-3 flex flex-col gap-2">
                        <div className="flex items-start gap-2">
                          <img
                            src={assets.location_icon_colored}
                            alt="location_icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex flex-col">
                            <span className="text-gray-500">
                              Pick-up Location
                            </span>
                            <span>{cars.car.location}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <img
                            src={assets.location_icon_colored}
                            alt="location_icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex flex-col">
                            <span className="text-gray-500">Drop Location</span>
                            <span>{cars.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-gray-500 text-right">
                    <span>Total Price</span>
                    <span className="text-2xl font-semibold text-primary">
                      $-{cars.car.perDayPrice * cars.totalDays}
                    </span>
                    <span>
                      Booked on {new Date().toISOString().split("T")[0]}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}

export default MyBookings;
