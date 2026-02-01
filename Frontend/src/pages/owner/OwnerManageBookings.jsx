import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axios";
import { useState } from "react";
import Loader from "../../components/Loader";
function OwnerManageBookings() {
  const { ownerBookingCar, setOwnerBookingCar, fetchUserBookings } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const HandleStatusCar = async (carId, status) => {
    setLoading(true);
    try {
      await api.post("/api/v1/carbooking/CarStatus", {
        carId,
        status,
      });

      setOwnerBookingCar((prev) =>
        prev.map((car) => (car._id === carId ? { ...car, status } : car)),
      );

      await fetchUserBookings();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <section>
        <h1 className="font-medium text-3xl">Manage Bookings</h1>
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-156">
          Track all customer bookings, approve or cancel requests, and manage
          booking statuses.
        </p>
        <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
          <table className="w-full border-collapse text-left text-sm text-gray-600">
            <thead className="text-gray-500">
              <tr>
                <th className="p-3 font-medium">Car</th>
                <th className="p-3 font-medium max-md:hidden">Date Range</th>
                <th className="p-3 font-medium">Total</th>
                <th className="p-3 font-medium max-md:hidden">Payment</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {ownerBookingCar.map((car) => {
                return (
                  <tr className="border-t border-borderColor" id={car._id}>
                    <td>
                      <div className=" flex gap-2 items-center p-3">
                        <img
                          src={car.car.image.url}
                          alt=""
                          className="w-16 h-10 rounded object-cover"
                        />
                        <div className="flex  flex-col gap-1">
                          <div className="font-medium">
                            {" "}
                            {car.car.brand.toString().toUpperCase()}
                          </div>
                          <div className=" text-gray-500">{car.car.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>{car.returnDate.split("T")[0].toString()}</div>
                      <div>{car.pickupDate.split("T")[0].toString()}</div>
                    </td>
                    <td className="p-3">${car.price}</td>
                    <td className="p-3">Cash</td>
                    <td>
                      <select
                        name=""
                        id=""
                        disabled={car.status.toString() === "completed"}
                        value={car.status}
                        onChange={(e) =>
                          HandleStatusCar(car._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default OwnerManageBookings;
