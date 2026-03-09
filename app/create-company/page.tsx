"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import api from "@/src/lib/api";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = yup.object({
  name: yup.string().required("Company name is required"),
  phone: yup.string().required("Phone number is required"),
});

type FormData = {
  name: string;
  phone: string;
};

export default function CreateCompany() {

  const router = useRouter();

  const { register, handleSubmit, control, formState: { errors } } =
    useForm<FormData>({
      resolver: yupResolver(schema),
    });

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      api.post("/companies", data),

    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex h-screen justify-center items-center">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 border rounded w-96 space-y-4"
      >

        <h2 className="text-xl font-bold">
          Create Company
        </h2>

        {/* Company Name */}
        <div>
          <Input
            placeholder="Company name"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-red-500 text-sm">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>

          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput
                {...field}
                defaultCountry="IN"
                className="border p-2 rounded w-full"
              />
            )}
          />

          {errors.phone && (
            <p className="text-red-500 text-sm">
              {errors.phone.message}
            </p>
          )}

        </div>

       <Button
          type="submit"
          className="w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create"}
        </Button>
      </form>

    </div>
  );
}