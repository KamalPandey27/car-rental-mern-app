import React from "react";

function ManageCars() {
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
            <tbody></tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default ManageCars;
