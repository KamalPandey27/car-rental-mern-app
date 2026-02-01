import React from "react";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function OwnerDashboard() {
  const { cars, user, ownerBookingCar } = useContext(AuthContext);

  const myCar = cars?.filter((car) => {
    return user._id?.toString() === car.owner?.toString();
  });

  const carStatusPending = ownerBookingCar.filter((car) => {
    return car.status?.toString() === "pending";
  });

  const carStatusConfirmed = ownerBookingCar.filter((car) => {
    return car.status?.toString() === "confirmed";
  });

  const currentDate = new Date();

  const earningBookings = ownerBookingCar.filter((car) => {
    const returnDate = new Date(car.returnDate);
    return (
      car.status?.toString() === "completed" &&
      currentDate.getMonth().toString() === returnDate.getMonth().toString() &&
      currentDate.getFullYear().toString() ===
        returnDate.getFullYear().toString()
    );
  });

  const totalEaringCurrentMonth = earningBookings.reduce(
    (acc, car) => acc + Number(car.price),
    0,
  );

  return (
    <section className=" flex flex-col gap-5 w-full">
      <div>
        <h1 className="sm:text-3xl text-2xl font-medium mb-2">
          Admin Dashboard
        </h1>
        <div className="text-gray-500/90 max-w-150">
          Monitor overall platform performance including total cars, bookings,
          revenue, and recent activities
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mt-4">
        <div className="flex items-center justify-between p-5 h-20  border border-gray-400/90 rounded-lg ">
          <div className="flex flex-col gap-1">
            <p className="text-gray-500/90 text-sm">Total Cars</p>
            <span className="font-semibold">{myCar.length}</span>
          </div>
          <div className="bg-primary/10 rounded-full  p-3  flex justify-center items-center">
            <img src={assets.carIconColored} alt="carIcon" />
          </div>
        </div>

        <div className="flex items-center  justify-between p-5  h-20  border border-gray-400/90 rounded-lg ">
          <div className="flex flex-col gap-1">
            <p className="text-gray-500/90 text-sm">Total Bookings</p>
            <span className="font-semibold">{ownerBookingCar.length}</span>
          </div>
          <div className="bg-primary/10 rounded-full  p-3  flex justify-center items-center">
            <img src={assets.listIconColored} alt="carIcon" />
          </div>
        </div>

        <div className="flex items-center  justify-between p-5  h-20  border border-gray-400/90 rounded-lg ">
          <div className="flex flex-col gap-1">
            <p className="text-gray-500/90 text-sm">Pending</p>
            <span className="font-semibold">{carStatusPending.length}</span>
          </div>
          <div className="bg-primary/10 rounded-full  p-3  flex justify-center items-center">
            <img src={assets.cautionIconColored} alt="carIcon" className="" />
          </div>
        </div>

        <div className="flex items-center  justify-between p-5  h-20  border border-gray-400/90 rounded-lg ">
          <div className="flex flex-col gap-1">
            <p className="text-gray-500/90 text-sm">Confirmed</p>
            <span className="font-semibold">{carStatusConfirmed.length}</span>
          </div>
          <div className="bg-primary/10 rounded-full p-3 flex justify-center items-center">
            <img src={assets.listIconColored} alt="carIcon" />
          </div>
        </div>
      </div>
      <div className="flex justify-between lg:flex-row flex-col mt-4 gap-5">
        <div className="border border-gray-400/90 rounded-lg p-3  flex justify-center flex-col lg:w-[70%]">
          <div className="text-xl font-medium">Recent Bookings</div>
          <div className="text-gray-500/90">Latest customer bookings</div>
          <div className="mt-3 flex flex-col w-full">
            {ownerBookingCar
              .slice(-3)
              .reverse()
              .map((booking) => (
                <div
                  key={booking._id}
                  className=" flex sm:items-center justify-between sm:flex-row flex-col p-2 border border-gray-400/90 rounded-lg mt-2 sm:gap-0 gap-3"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={booking.car.image.url}
                      alt="car"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium">
                        {booking.car.brand.toString().toUpperCase()}
                      </div>
                      <div className="text-gray-500/90 text-sm">
                        {booking.customer.username.toString().toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">₹ {booking.price}</div>
                  </div>
                  <div className="text-gray-500/90 text-sm">
                    {booking.pickupDate.split("T")[0]} -{" "}
                    {booking.returnDate.split("T")[0]}
                  </div>
                </div>
              ))}
          </div>
        </div>
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

export default OwnerDashboard;
