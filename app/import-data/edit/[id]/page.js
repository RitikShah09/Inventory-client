"use client";
import EditInvoice from "@/components/EditInvoice";
import EditInvoiceSkeleton from "@/components/EditInvoiceLoader";
import axios from "@/utils/axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await axios.get(`/inventory/data/${id}`);
      setData(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <EditInvoiceSkeleton />;

  return <EditInvoice existingData={data} />;
};

export default Page;
