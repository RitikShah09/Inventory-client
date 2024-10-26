"use client";
import { asyncLoadItems } from "@/store/actions/inventory";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteDialog from "./DeleteDialog";
import ImportSkeletonLoader from "./ImportDataSkelton";
function ImportData() {
  const dispatch = useDispatch();
  const { items, totalPages } = useSelector((state) => state.inventory);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("entry_date");
  const [totalBillOrder, setTotalBillOrder] = useState("asc");
  const [entryDateOrder, setEntryDateOrder] = useState("asc");
  const [selectedId, setSelectedId] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCheckboxChange = (id) => {
    setSelectedId((prevSelectedId) => (prevSelectedId === id ? null : id));
  };

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      await dispatch(
        asyncLoadItems(
          page,
          limit,
          sortBy,
          sortBy === "total_bill" ? totalBillOrder : entryDateOrder
        )
      );
      setLoading(false);
    };
    loadItems();
  }, [dispatch, page, limit, sortBy, totalBillOrder, entryDateOrder]);

  const formatDate = (date) => {
    if (date) {
      return date.split("T")[0];
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const toggleTotalBillOrder = () => {
    setSortBy("total_bill");
    setTotalBillOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setEntryDateOrder("asc");
  };

  const toggleEntryDateOrder = () => {
    setSortBy("entry_date");
    setEntryDateOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setTotalBillOrder("asc");
  };

  return (
    <>
      {selectedId && (
        <DeleteDialog open={open} id={selectedId} setOpen={setOpen} />
      )}

      <div className="w-5/6 sm:px-0 md:px-2 lg:px-10">
        {loading ? (
          <ImportSkeletonLoader />
        ) : (
          <>
            <div className="border-t-2 h-[13%] sm:px-4 px-4 md:px-0 lg:px-0">
              <p className="mt-4 text-gray-500">
                Dashboard
                <i className="ri-arrow-right-s-line"></i>
                Import Data
              </p>
              <div className="flex justify-between mt-1 items-center">
                <h1 className="font-bold">Import Data</h1>
                <Link href={"/import-data/create"}>
                  <button className="px-3 py-2 rounded-lg bg-green-950 text-white">
                    Add Import Entry
                  </button>
                </Link>
              </div>
            </div>
            <div className="max-h-[87%] w-full">
              <div className="w-full border rounded-lg">
                <div className="flex justify-end py-1 items-center gap-3 pr-10 text-xl">
                  <Link href={selectedId ? `import-data/${selectedId}` : ""}>
                    <i className="ri-eye-line"></i>
                  </Link>
                  <Link
                    href={selectedId ? `import-data/edit/${selectedId}` : ""}
                  >
                    <i className="ri-pencil-line"></i>
                  </Link>
                  <div>
                    <i
                      className="ri-delete-bin-6-line cursor-pointer"
                      onClick={() => (selectedId ? setOpen(true) : "")}
                    ></i>
                  </div>
                </div>
                <table className="w-full text-sm text-left md:text-xs rtl:text-right border-t">
                  <thead className="text-xs uppercase">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor="checkbox-all-search"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th className="text-[10px] py-4">Import Invoice No.</th>
                      <th className="text-[10px] py-4">Import Partner</th>
                      <th className="text-[10px] py-4">BOE No.</th>
                      <th
                        className="text-[10px] py-4 flex items-center"
                        onClick={toggleTotalBillOrder}
                      >
                        Total Bill
                        <span className=" cursor-pointer">
                          {totalBillOrder === "asc" ? (
                            <i className="ri-arrow-up-s-line text-lg"></i>
                          ) : (
                            <i className="ri-arrow-down-s-line text-lg"></i>
                          )}
                        </span>
                      </th>
                      <th className="text-[10px] py-4">Date</th>
                      <th
                        className="text-[10px] py-4 flex items-center"
                        onClick={toggleEntryDateOrder}
                      >
                        Entered Date
                        <span className=" cursor-pointer">
                          {entryDateOrder === "asc" ? (
                            <i className="ri-arrow-up-s-line text-lg"></i>
                          ) : (
                            <i className="ri-arrow-down-s-line text-lg"></i>
                          )}
                        </span>
                      </th>
                      <th className="text-[10px] py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.map((item) => (
                      <tr key={item._id} className="border-t font-medium">
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                              checked={selectedId === item._id}
                              onChange={() => handleCheckboxChange(item._id)}
                            />
                            <label className="sr-only">checkbox</label>
                          </div>
                        </td>
                        <td className="py-4">
                          <Link href={`/import-data/${item._id}`}>
                            <p>
                              {item.import_invoice_number
                                ? item.import_invoice_number
                                : "Not provided"}
                            </p>
                          </Link>
                        </td>
                        <td className="py-4">
                          {item.import_partner ? item.import_partner : "N/A"}
                        </td>
                        <td className="py-4">{item.boe_number}</td>
                        <td className="py-4">{item.total_bill}</td>
                        <td className="py-4">
                          {formatDate(item.import_invoice_date)}
                        </td>
                        <td className="py-4">{formatDate(item.entry_date)}</td>
                        <td className="py-4">
                          <span
                            className={`  ${
                              item.isDraft ? "bg-red-500" : "bg-green-500"
                            } py-1 rounded-xl px-3`}
                          >
                            {item.isDraft ? "Intransit" : "Received"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end items-center gap-3 border-t text-sm py-2 pr-10">
                  <div className=" text-xs text-gray-500 flex items-center gap-1">
                    Items per page:{" "}
                    <span className="font-bold text-sm text-gray-700">
                      {limit}
                    </span>
                  </div>
                  <div className=" flex items-center gap-1">
                    <span className=" text-gray-700 font-bold text-sm">
                      {page}
                    </span>
                    <span className=" text-sm text-gray-500">
                      {" "}
                      of {totalPages}
                    </span>
                  </div>
                  <div className=" flex items-center">
                    <button
                      onClick={handlePrevPage}
                      disabled={page === 1}
                      className="cursor-pointer"
                    >
                      <i className="ri-arrow-left-s-line text-lg text-gray-500"></i>
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={page === totalPages}
                      className="cursor-pointer"
                    >
                      <i className="ri-arrow-right-s-line text-lg text-gray-500"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ImportData;
