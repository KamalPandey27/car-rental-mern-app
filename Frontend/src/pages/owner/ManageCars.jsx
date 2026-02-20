import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { assets } from "../../assets/assets";
import api from "../../api/axios";
import Loader from "../../components/Loader";
function ManageCars() {
  const { user, cars, fetchCars } = useContext(AuthContext);
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({
    perDayPrice: "",
    status: false,
    carId: "",
  });

  const ownerListedCar = cars.filter(
    (car) => car.owner.toString() === user._id.toString(),
  );

  const ownerCarListingEdit = async () => {
    const payload = { ...editData };
    setLoading(true);
    try {
      const response = await api.patch("/v1/car/updateCarDetails", payload);

      if (response.status === 200) {
        setEdit(null);
        setEditData({
          perDayPrice: "",
          status: false,
          carId: "",
        });

        await fetchCars();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCarListing = async (carId, isListed) => {
    setLoading(true);
    try {
      const response = await api.patch("/v1/car/unlist", {
        carId,
        isListed,
      });
      console.log(response);
      if (response.status === 200) {
        fetchCars();
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
      <section>
        <h1 className="font-medium text-3xl">Manage Cars</h1>
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-156">
          View all listed cars, update their details, or remove them from the
          booking platform.
        </p>
        <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor sm:mt-6 mt-3">
          <table className="w-full border-collapse text-left text-sm text-gray-600">
            <thead className="text-gray-500">
              <tr>
                <th className="p-3 font-medium">Car</th>
                <th className="p-3 font-medium max-md:hidden">Category</th>
                <th className="p-3 font-medium">Price</th>
                <th className="p-3 font-medium ">Status</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {ownerListedCar.map((car) => {
                return (
                  <tr
                    className="border-t border-borderColor/50 hover:bg-gray-50/50 sm:text-[16px] text-[13px]"
                    key={car._id}
                  >
                    <td className="sm:p-2   flex items-center gap-3">
                      <img
                        src={car.image.url}
                        alt="Car"
                        className="w-16 h-10 rounded-md object-cover max-sm:hidden"
                      />
                      <div>
                        <div className="font-medium">
                          {car.brand.toString().toUpperCase()}
                        </div>
                        <div className="text-gray-500/90 text-sm">
                          {car.year}
                        </div>
                      </div>
                    </td>
                    <td className="sm:p-2  max-md:hidden">
                      {car.category.toString().toUpperCase()}
                    </td>
                    <td className="sm:p-2">
                      {edit === car._id ? (
                        <input
                          type="number"
                          value={editData.perDayPrice}
                          className="w-13 border border-gray-700/90 rounded"
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              perDayPrice: e.target.value || car.perDayPrice,
                            })
                          }
                        />
                      ) : (
                        `₹ ${car.perDayPrice}`
                      )}
                      /day
                    </td>
                    <td className="sm:p-2 ">
                      {edit === car._id ? (
                        <select
                          name=""
                          id=""
                          value={String(editData.status)}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              status: e.target.value === "true",
                            })
                          }
                        >
                          <option value="false">Not Available</option>
                          <option value="true">Available</option>
                        </select>
                      ) : (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          {car.isAvailable ? "Available" : "Not Available"}
                        </span>
                      )}
                    </td>
                    <td className="sm:p-2  flex sm:flex-row flex-col items-center">
                      {edit === car._id ? (
                        <button
                          className="text-blue-500 hover:text-blue-700 sm:mr-2 cursor-pointer"
                          onClick={() => ownerCarListingEdit()}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="text-red-500 hover:text-red-700 sm:mr-2 cursor-pointer"
                          onClick={() => {
                            setEdit(car._id);
                            setEditData({
                              perDayPrice: car.perDayPrice,
                              status: car.isAvailable,
                              carId: car._id,
                            });
                          }}
                        >
                          Edit
                        </button>
                      )}

                      <img
                        src={
                          car.isListed ? assets.eye_icon : assets.eye_close_icon
                        }
                        alt="eye_icon"
                        className="cursor-pointer sm:w-auto w-10"
                        onClick={() => toggleCarListing(car._id, !car.isListed)}
                      />
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
