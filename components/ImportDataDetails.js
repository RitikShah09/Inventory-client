"use client";
import { useParams, useRouter } from "next/navigation";
import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import DeleteDialog from "./DeleteDialog";
import { toast } from "react-toastify";
import SkeletonLoader from "./Loader";

function ImportDataDetails() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [data, setData] = useState({});
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const getData = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`/inventory/${id}`);
      setData(data);
      setLoader(false);
      setItems(data.items || []);
      console.log(data);
    } catch (error) {
      setLoader(false);
      toast.error("Inventory Not Found!");
      router.push("/import-data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const currentItems = items.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(items.length / limit);

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <>
      {open && <DeleteDialog open={open} id={data._id} setOpen={setOpen} />}

      <div className="w-5/6 px-10">
        {loader ? (
          <SkeletonLoader />
        ) : (
          <>
            <div className="border-t-2 h-[10%]">
              <p className="mt-4 text-gray-500">
                Dashboard
                <i className="ri-arrow-right-s-line"></i>
                Import Data
                <i className="ri-arrow-right-s-line"></i>
                Details
              </p>
              <div className="flex justify-between mt-2 items-center">
                <h1 className="font-bold">Import Entry Details</h1>
              </div>
            </div>

            <div className="max-h-[25%] mb-5 border rounded-lg">
              <div className="px-5 grid grid-cols-2 py-3 gap-2">
                <h1>
                  <span className="text-sm">Import Invoice Number:</span>
                  {data.importInvoiceNumber}
                </h1>
                <h1>
                  <span className="text-sm">Import Invoice Date:</span>
                  {data.importInvoiceDate}
                </h1>
                <h1>
                  <span className="text-sm">Importer Name:</span>{" "}
                  {data.importPartner}
                </h1>
                <h1>
                  <span className="text-sm">Entered Date:</span>{" "}
                  {data.entryDate}
                </h1>
                <h1>
                  <span className="text-sm">BOE Number:</span> {data.boeNumber}
                </h1>
                <h1>
                  Status:
                  <span
                    className={`${
                      data.isDraft ? "bg-red-500" : "bg-green-400"
                    } py-1 rounded-xl px-3 text-sm ml-1`}
                  >
                    {data.isDraft ? "Intransit" : "Received"}
                  </span>
                </h1>
              </div>
            </div>

            <div className="max-h-[65%] w-full">
              <div className="w-full border rounded-lg">
                <div className="flex justify-end gap-3 pr-10 text-xl py-1">
                  <Link href={`/import-data/edit/${data._id}`}>
                    <i className="ri-pencil-line"></i>
                  </Link>
                  <div>
                    <i
                      className="ri-delete-bin-6-line cursor-pointer"
                      onClick={() => {
                        setOpen(true);
                      }}
                    ></i>
                  </div>
                </div>

                <table className="w-full text-sm text-left border-t">
                  <thead className="text-xs uppercase">
                    <tr>
                      {/* <th className="p-4">
        <input type="checkbox" className="w-4 h-4" />
      </th> */}
                      <th className="text-[10px] py-4 p-4">Item Code</th>
                      <th className="text-[10px] py-4">Rate $</th>
                      <th className="text-[10px] py-4">Exchange Rate</th>
                      <th className="text-[10px] py-4">Quantity</th>
                      <th className="text-[10px] py-4">Rate</th>
                      <th className="text-[10px] py-4">Total Item Rate</th>
                      <th className="text-[10px] py-4">Custom Duty</th>
                      <th className="text-[10px] py-4">Ocean Charges</th>
                      <th className="text-[10px] py-4">C&H Charges</th>
                      <th className="text-[10px] py-4">Total</th>
                      <th className="text-[10px] py-4">Rate per Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, i) => (
                      <tr key={i} className="border-t">
                        {/* <td className="p-4">
          <input type="checkbox" className="w-4 h-4" />
        </td> */}
                        <td className="p-4">{item.itemCode}</td>
                        <td>{item.rateInUSD}</td>
                        <td>{item.exchangeRate}</td>
                        <td>{item.quantity}</td>
                        <td>{item.rateAfterExchange}</td>
                        <td>{item.totalItemRate}</td>
                        <td>{item.customDuty}</td>
                        <td>{item.oceanCharge}</td>
                        <td>{item.cnhCharge}</td>
                        <td>{item.total}</td>
                        <td>{item.ratePerQuantity}</td>
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
                  <div className="flex items-center gap-1">
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
                      onClick={handlePreviousPage}
                      disabled={page === 1}
                      className="px-2"
                    >
                      <i className="ri-arrow-left-s-line cursor-pointer text-lg text-gray-500"></i>
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={page === totalPages}
                      className="px-2"
                    >
                      <i className="ri-arrow-right-s-line cursor-pointer text-lg text-gray-500"></i>
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

export default ImportDataDetails;
