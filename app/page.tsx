"use client";

import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState } from "react";

import api from "@/src/lib/api";
import { Button } from "@/components/ui/button";

export default function LoginPage() {

  const router = useRouter();
  const [phone, setPhone] = useState("");

  const sendOtp = async () => {

    if (!phone) {
      alert("Enter phone number");
      return;
    }

    try {

      const phoneNumber = phone.replace("+91", "");

      await api.post("/auth/send-otp", {
        country_code: "+91",
        phone_number: phoneNumber,
      });

      router.push(`/otp?phone=${phoneNumber}`);

    } catch (error) {
      console.log(error);
      alert("Error sending OTP");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">

      <div className="p-6 border rounded w-80 space-y-4">

        <h2 className="text-xl font-bold">Login</h2>

        <PhoneInput
          defaultCountry="IN"
          value={phone}
          onChange={(value) => setPhone(value || "")}
        />

        <Button
          onClick={sendOtp}
          className="w-full"
        >
          Send OTP
        </Button>

      </div>

    </div>
  );
}
