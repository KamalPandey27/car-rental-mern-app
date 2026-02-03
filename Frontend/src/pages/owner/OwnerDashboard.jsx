import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AuthContext } from "../../context/AuthContext";

function OwnerDashboard() {
  const { cars, user, ownerBookingCar } = useContext(AuthContext);

  // ✅ Safe defaults
  const safeCars = Array.isArray(cars) ? cars : [];
  const safeBookings = Array.isArray(ownerBookingCar) ? ownerBookingCar : [];

  const userId = user?._id?.toString();

  // ✅ My cars
  const myCar = safeCars.filter((car) => car?.owner?.toString() === userId);

  // ✅ Booking status counts
  const carStatusPending = safeBookings.filter(
    (booking) => booking?.status === "pending",
  );

  const carStatusConfirmed = safeBookings.filter(
    (booking) => booking?.status === "confirmed",
  );

  // ✅ Monthly earnings
  const currentDate = new Date();

  const earningBookings = safeBookings.filter((booking) => {
    if (booking?.status !== "completed" || !booking?.returnDate) {
      return false;
    }

    const returnDate = new Date(booking.returnDate);

    return (
      currentDate.getMonth() === returnDate.getMonth() &&
      currentDate.getFullYear() === returnDate.getFullYear()
    );
  });

  const totalEaringCurrentMonth = earningBookings.reduce(
    (acc, booking) => acc + Number(booking?.price || 0),
    0,
  );

  return (
    <section className="flex flex-col gap-5 w-full">
      {/* HEADER */}
      <div>
        <h1 className="sm:text-3xl text-2xl font-medium mb-2">
          Owner Dashboard
        </h1>
        <div className="text-gray-500/90 max-w-150">
          Monitor your cars, bookings, and revenue
        </div>
      </div>

      {/* STATS */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mt-4">
        <StatCard
          label="Total Cars"
          value={myCar.length}
          icon={assets.carIconColored}
        />
        <StatCard
          label="Total Bookings"
          value={safeBookings.length}
          icon={assets.listIconColored}
        />
        <StatCard
          label="Pending"
          value={carStatusPending.length}
          icon={assets.cautionIconColored}
        />
        <StatCard
          label="Confirmed"
          value={carStatusConfirmed.length}
          icon={assets.listIconColored}
        />
      </div>

      {/* RECENT BOOKINGS + REVENUE */}
      <div className="flex justify-between lg:flex-row flex-col mt-4 gap-5">
        {/* RECENT BOOKINGS */}
        <div className="border border-gray-400/90 rounded-lg p-3 flex flex-col lg:w-[70%]">
          <div className="text-xl font-medium">Recent Bookings</div>
          <div className="text-gray-500/90">Latest customer bookings</div>

          <div className="mt-3 flex flex-col gap-2">
            {safeBookings
              .slice(-3)
              .reverse()
              .map((booking, index) => {
                const car = booking?.car;
                const customer = booking?.customer;

                if (!car) return null;

                return (
                  <div
                    key={booking?._id || index}
                    className="flex sm:items-center justify-between sm:flex-row flex-col p-2 border border-gray-400/90 rounded-lg gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={car?.image?.url || ""}
                        alt="car"
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">
                          {(car?.brand || "").toUpperCase()}
                        </div>
                        <div className="text-gray-500/90 text-sm">
                          {(customer?.username || "").toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="font-medium">₹ {booking?.price || 0}</div>

                    <div className="text-gray-500/90 text-sm">
                      {booking?.pickupDate
                        ? booking.pickupDate.split("T")[0]
                        : ""}{" "}
                      -{" "}
                      {booking?.returnDate
                        ? booking.returnDate.split("T")[0]
                        : ""}
                    </div>
                  </div>
                );
              })}

            {safeBookings.length === 0 && (
              <p className="text-gray-500 text-center">No bookings found.</p>
            )}
          </div>
        </div>

        {/* MONTHLY REVENUE */}
        <div className="border border-gray-400/90 rounded-lg p-5 flex flex-col gap-4 w-80 h-40">
          <div>
            <div className="text-xl font-medium">Monthly Revenue</div>
            <div className="text-gray-500/90">Revenue for current month</div>
          </div>
          <div className="text-3xl font-semibold text-primary">
            ₹ {totalEaringCurrentMonth}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 🔹 Small helper */
const StatCard = ({ label, value, icon }) => (
  <div className="flex items-center justify-between p-5 h-20 border border-gray-400/90 rounded-lg">
    <div className="flex flex-col gap-1">
      <p className="text-gray-500/90 text-sm">{label}</p>
      <span className="font-semibold">{value}</span>
    </div>
    <div className="bg-primary/10 rounded-full p-3 flex justify-center items-center">
      <img src={icon} alt="icon" />
    </div>
  </div>
);

export default OwnerDashboard;
