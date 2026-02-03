import React, { useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { AuthContext } from "../context/AuthContext";

function MyBookings() {
  const { bookingCar, fetchUserBookings } = useContext(AuthContext);

  // ✅ Fetch ONCE
  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  // ✅ Ensure array safety
  const safeBookings = Array.isArray(bookingCar) ? bookingCar : [];

  return (
    <section className="w-full sm:p-20 p-8 my-15 pt-18.25 bg-light">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-semibold text-center">My Bookings</h1>
        <p className="text-gray-500/90 text-center">
          View and manage your car bookings
        </p>
      </div>

      <div className="flex flex-col gap-5 mt-10">
        {safeBookings
          .slice()
          .reverse()
          .map((booking, index) => {
            const car = booking?.car;

            if (!car) return null;

            return (
              <div
                key={booking?._id || index}
                className="md:p-5 sm:p-4 p-3 border flex justify-between md:flex-row flex-col gap-3 border-gray-400/90 rounded-lg xl:w-[70%] lg:w-[80%] w-full"
              >
                {/* LEFT */}
                <div className="flex sm:flex-row flex-col md:gap-7 sm:gap-4 gap-5">
                  <div className="flex flex-col gap-1">
                    <img
                      src={car?.image?.url || ""}
                      alt="car"
                      className="sm:w-50 rounded"
                    />

                    <div>
                      <span className="text-lg font-medium mt-2 block">
                        {car?.brand} - {car?.model}
                      </span>
                      <span className="text-gray-500">
                        {car?.year} - {car?.category} - {car?.location}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-3 py-1.5 bg-light rounded">
                        Booking #{index + 1}
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-red-400/15 text-red-600">
                        {booking?.status}
                      </span>
                    </div>

                    {/* Rental period */}
                    <div className="flex items-start gap-2 mt-3">
                      <img
                        src={assets.calendar_icon_colored}
                        alt="calendar"
                        className="w-4 h-4 mt-1"
                      />
                      <div>
                        <span className="text-gray-500 block">
                          Rental Period
                        </span>
                        <span className="flex gap-2 flex-wrap">
                          <p>
                            {booking?.pickupDate
                              ? booking.pickupDate.split("T")[0]
                              : ""}
                          </p>
                          to
                          <p>
                            {booking?.returnDate
                              ? booking.returnDate.split("T")[0]
                              : ""}
                          </p>
                        </span>
                      </div>
                    </div>

                    {/* Locations */}
                    <div className="mt-3 flex flex-col gap-2">
                      <LocationRow
                        label="Pick-up Location"
                        value={car?.location}
                      />
                      <LocationRow
                        label="Drop Location"
                        value={booking?.location}
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col gap-1 text-sm text-gray-500 text-right">
                  <span>Total Price</span>
                  <span className="text-2xl font-semibold text-primary">
                    ₹-
                    {(car?.perDayPrice || 0) * (booking?.totalDays || 1)}
                  </span>
                  <span>
                    Booked on{" "}
                    {booking?.createdAt ? booking.createdAt.split("T")[0] : ""}
                  </span>
                </div>
              </div>
            );
          })}

        {/* Empty state */}
        {safeBookings.length === 0 && (
          <p className="text-center text-gray-500">No bookings found.</p>
        )}
      </div>
    </section>
  );
}

/* 🔹 Helper */
const LocationRow = ({ label, value }) => (
  <div className="flex items-start gap-2">
    <img
      src={assets.location_icon_colored}
      alt="location"
      className="w-4 h-4 mt-1"
    />
    <div>
      <span className="text-gray-500 block">{label}</span>
      <span>{value || "-"}</span>
    </div>
  </div>
);

export default MyBookings;
