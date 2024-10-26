"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { asyncSignOutUser } from "@/store/actions/auth";

function Nav() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSignOut = async () => {
    await dispatch(asyncSignOutUser());
    router.push("/");
  };

  return (
    <nav className="h-full w-1/6 bg-green-950 text-white flex flex-col justify-between items-start text-xs sm:text-sm lg:text-lg px-4 pt-4">
      <div className="flex flex-col gap-3">
        <Link href={""} className="text-gray-500 flex items-center gap-1">
          <i className="ri-dashboard-line"></i>
          <span>Dashboard</span>
        </Link>

        <Link href={"/import-data"} className="flex items-center gap-1">
          <i className="ri-briefcase-line"></i>
          <span>Import Data</span>
        </Link>

        <Link href={""} className="text-gray-500 flex items-center gap-1">
          <i className="ri-file-text-line"></i>
          <span>Orders</span>
        </Link>
        <Link href={""} className="text-gray-500 flex items-center gap-1">
          <i className="ri-group-fill"></i>
          <span>Users</span>
        </Link>
        <Link href={""} className="text-gray-500 flex items-center gap-1">
          <i className="ri-file-list-2-fill"></i>
          <span>Reports</span>
        </Link>
      </div>
      <button
        className="mb-4 cursor-pointer text-white flex items-center gap-1"
        onClick={handleSignOut}
      >
       <i className="ri-logout-box-line text-xs"></i>
        <span>Signout</span>
      </button>
    </nav>
  );
}

export default Nav;
