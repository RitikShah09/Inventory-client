"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EditInvoiceSkeleton = () => {
  return (
    <div className="w-5/6 px-10 h-full overflow-y-auto pb-6 scroll-smooth scrollbar-thin">
      <p className="mt-4 flex gap-3">
        <Skeleton width={120} height={20} inline />
        <Skeleton width={80} height={20} inline />
        <Skeleton width={100} height={20} inline />
      </p>
      <h1 className="mt-3 font-bold">
        <Skeleton width={200} height={30} />
      </h1>

      <div className="grid grid-cols-3 mt-3 gap-x-20 gap-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} height={50} />
        ))}
      </div>

      <hr className="mt-7" />
      <h1 className="mt-5 font-bold">
        <Skeleton width={150} height={30} />
      </h1>

      <div className="grid grid-cols-3 mt-3 gap-x-20 gap-y-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} height={50} />
        ))}
      </div>

      <hr className="mt-7" />
      <h1 className="mt-5 font-bold">
        <Skeleton width={150} height={30} />
      </h1>

      <div className="mt-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="grid grid-cols-3 mt-3 gap-x-20 gap-y-4">
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6 justify-end">
        <Skeleton width={100} height={40} />
        <Skeleton width={120} height={40} />
        <Skeleton width={120} height={40} />
      </div>
    </div>
  );
};

export default EditInvoiceSkeleton;
