"use client";

import { useState } from "react";
import { API_URL } from "@/src/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const sendOtp = async () => {
    setError("");

    // ✅ Validation
    if (!phone) {
      return setError("Phone number is required");
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return setError("Phone number must be 10 digits");
    }

    try {
      await fetch(`${API_URL}/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country_code: "+91",
          phone_number: phone,
        }),
      });

      router.push(`/otp?phone=${phone}`);
    } catch (err) {
      setError("Error sending OTP");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="p-6 border rounded w-80 space-y-3">
        <h2 className="text-xl font-bold">Login</h2>

        <input
          type="text"
          placeholder="Enter phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={sendOtp}
          className="bg-blue-600 text-white px-4 py-2 w-full"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}