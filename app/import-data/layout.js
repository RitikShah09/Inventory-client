"use client";
import Nav from "@/components/Nav";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getToken from "@/utils/getToken";
import { asyncCurrentUser } from "@/store/actions/auth";
import { useRouter } from "next/navigation";

function Layout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = getToken();
      if (!token && !user) {
        router.push("/");
      } else if (token) {
        await dispatch(asyncCurrentUser());
      }
    };

    checkAuthentication();
  }, [dispatch, router]);

  return (
    <div className=" h-full w-full flex">
      <Nav />
      {children}
    </div>
  );
}

export default Layout;
