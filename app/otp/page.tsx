"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { API_URL } from "@/src/lib/api";

export default function OtpPage() {
  const params = useSearchParams();
  const router = useRouter();

  const phone = params.get("phone");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const verifyOtp = async () => {
    setError("");

    // ✅ Validation
    if (!otp) return setError("OTP is required");

    if (!/^[0-9]{6}$/.test(otp)) {
      return setError("OTP must be 6 digits");
    }

    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country_code: "+91",
          phone_number: phone,
          otp,
        }),
      });

      const data = await res.json();

      localStorage.setItem("token", data.data.access_token);

      router.push("/dashboard");
    } catch {
      setError("Invalid OTP");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="p-6 border rounded w-80 space-y-3">
        <h2 className="text-xl font-bold">Enter OTP</h2>

        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 w-full"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={verifyOtp}
          className="bg-green-600 text-white px-4 py-2 w-full"
        >
          Verify
        </button>
      </div>
    </div>
  );
}