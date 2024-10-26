"use client";
import AuthForm from "@/components/AuthForm";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getToken from "@/utils/getToken";
import { asyncCurrentUser } from "@/store/actions/auth";
import { useRouter } from "next/navigation";
function page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    const token = getToken();
    if (!user && !token) {
      return;
    }
    if (token) {
      dispatch(asyncCurrentUser());
    }
  }, []);

  useEffect(() => {
    if (user) router.push("/import-data");
  }, [user]);
  return <AuthForm type="signup" />;
}

export default page;
