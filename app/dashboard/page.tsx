"use client";

import { useCompanies } from "@/hooks/useCompanies";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import api from "@/src/lib/api";

export default function Dashboard() {

  const router = useRouter();

  const { data, isLoading, error } = useCompanies();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
    }

  }, []);

  const logout = async () => {

    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("token");

    router.push("/");
  };

  if (isLoading) {
    return <p className="p-10">Loading companies...</p>;
  }

  if (error) {
    return <p className="p-10 text-red-500">Error loading companies</p>;
  }

  return (
    <div className="p-10 space-y-5">

      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Companies
        </h1>

        <div className="space-x-3">

          <Button
            onClick={()=>router.push("/create-company")}
          >
            Create Company
          </Button>

          <Button
            variant="destructive"
            onClick={logout}
          >
            Logout
          </Button>

        </div>

      </div>

      {data?.map((company:any)=>(
        <Card
          key={company.id}
          className="p-4"
        >
          {company.name}
        </Card>
      ))}

    </div>
  );
}