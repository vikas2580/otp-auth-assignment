"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/src/lib/api";

const fetchCompanies = async () => {
  const res = await api.get("/companies");
  return res.data.data;
};

export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });
};
