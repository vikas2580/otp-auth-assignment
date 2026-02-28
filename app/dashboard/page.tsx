"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/src/lib/api";
import { useRouter } from "next/navigation";

interface Company {
  id: string;
  name: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [name, setName] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // ================= FETCH COMPANIES =================
  const fetchCompanies = async () => {
    try {
      const res = await fetch(`${API_URL}/companies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCompanies(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }

    fetchCompanies();
  }, []);

  // ================= CREATE COMPANY =================
  const createCompany = async () => {
    if (!name) return alert("Company name required");

    try {
      await fetch(`${API_URL}/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
        }),
      });

      setName("");
      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= LOGOUT =================
  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* CREATE COMPANY */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1"
          placeholder="Company name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={createCompany}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {companies.map((c) => (
          <div
            key={c.id}
            className="border p-2 rounded flex justify-between"
          >
            {c.name}
          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <button
        onClick={logout}
        className="mt-8 bg-red-500 text-white px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
}