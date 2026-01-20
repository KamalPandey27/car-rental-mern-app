import React from "react";

function OwnerManageBookings() {
  return (
    <>
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
            <tbody></tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default OwnerManageBookings;
