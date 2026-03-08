"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/src/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OTPPage() {

  const router = useRouter();
  const params = useSearchParams();

  const phone = params.get("phone");

  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {

      const res = await api.post("/auth/verify-otp", {
        country_code: "+91",
        phone_number: phone,
        otp: otp,
      });

      localStorage.setItem("token", res.data.data.access_token);

      router.push("/dashboard");

    } catch (error) {
      alert("Invalid OTP");
    }
  };

  return (

    <div className="flex h-screen justify-center items-center">

      <div className="p-6 border rounded w-80 space-y-4">

        <h2 className="text-xl font-bold">Verify OTP</h2>

        <Input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e)=>setOtp(e.target.value)}
        />

        <Button
          onClick={verifyOtp}
          className="w-full"
        >
          Verify OTP
        </Button>

      </div>

    </div>
  );
}