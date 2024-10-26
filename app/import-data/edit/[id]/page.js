'use client'
import EditInvoice from "@/components/EditInvoice";
import axios from "@/utils/axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState(null); // Use null as initial state
  const [loading, setLoading] = useState(true); // Add loading state

  const getData = async () => {
    try {
      const response = await axios.get(`/inventory/data/${id}`);
      setData(response.data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>Loading...</div>; // Loading state UI

  return <EditInvoice existingData={data} />;
};

export default Page;
