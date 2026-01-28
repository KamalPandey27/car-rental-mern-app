import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
function ManageCars() {
  const { ownerBookingCar } = useContext(AuthContext);

  return (
    <>
      <section>
        <h1 className="font-medium text-3xl">Manage Cars</h1>
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-156">
          View all listed cars, update their details, or remove them from the
          booking platform.
        </p>
        <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
          <table className="w-full border-collapse text-left text-sm text-gray-600">
            <thead className="text-gray-500">
              <tr>
                <th className="p-3 font-medium">Car</th>
                <th className="p-3 font-medium max-md:hidden">Category</th>
                <th className="p-3 font-medium">Price</th>
                <th className="p-3 font-medium max-md:hidden">Status</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ownerBookingCar.map((car) => {
                return (
                  <tr
                    className="border-t border-borderColor/50 hover:bg-gray-50/50"
                    key={car._id}
                  >
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={car.car.image.url}
                        alt="Car"
                        className="w-16 h-10 rounded-md object-cover"
                      />
                      <div>
                        <div className="font-medium">
                          {car.car.brand.toString().toUpperCase()}
                        </div>
                        <div className="text-gray-500/90 text-sm">
                          {car.car.year}
                        </div>
                      </div>
                    </td>
                    <td className="p-3 max-md:hidden">
                      {car.car.category.toString().toUpperCase()}
                    </td>
                    <td className="p-3">${car.car.perDayPrice}/day</td>
                    <td className="p-3 max-md:hidden">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {car.car.isAvailable ? "Available" : "Not Available"}
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        Edit
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        Delete
                      </button>
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

export default ManageCars;
