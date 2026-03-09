"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import api from "@/src/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = yup.object({
  otp: yup.string().required("OTP is required"),
});

export default function OTPPage() {

  const router = useRouter();
  const params = useSearchParams();

  const phone = params.get("phone");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data:any) =>
      api.post("/auth/verify-otp", {
        country_code: "+91",
        phone_number: phone,
        otp: data.otp,
      }),

    onSuccess: (res) => {
      localStorage.setItem("token", res.data.data.access_token);
      router.push("/dashboard");
    },

    onError: () => {
      alert("Invalid OTP");
    },
  });

  const onSubmit = (data:any) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex h-screen justify-center items-center">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 border rounded w-80 space-y-4"
      >

        <h2 className="text-xl font-bold">
          Verify OTP
        </h2>

        <Input
          placeholder="Enter OTP"
          {...register("otp")}
        />

        {errors.otp && (
          <p className="text-red-500 text-sm">
            {errors.otp.message}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
        >
          Verify OTP
        </Button>

      </form>

    </div>
  );
}