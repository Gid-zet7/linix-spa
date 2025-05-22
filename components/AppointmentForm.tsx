"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import localFont from "next/font/local";
import { bookNew } from "@/lib/actions";
import { useRouter } from "next/navigation";

const swipe = localFont({
  src: "../app/fonts/Swipe.otf",
  variable: "--font-poppins",
  weight: "100 900",
});

export default function AppointmentForm() {
  const [email, setEmail] = useState("");
  const [last_name, setLastName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service_type, setServiceType] = useState("");

  const router = useRouter();

  const [errors, setErrors] = useState<{
    phone_number?: string;
    address_line1?: string;
    city?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    let isValid = true;

    if (!last_name?.trim()) {
      newErrors.address_line1 = "Address is required";
      isValid = false;
    }
    if (!first_name?.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }
    if (!phone_number?.trim()) {
      newErrors.phone_number = "Phone number is required";
      isValid = false;
    }
    if (!time?.trim()) {
      newErrors.phone_number = "Time is required";
      isValid = false;
    }
    if (!service_type?.trim()) {
      newErrors.phone_number = "Service type is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAppointment = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();

      formData.append("email", email);
      formData.append("last_name", last_name);
      formData.append("first_name", first_name);
      formData.append("phone_number", phone_number);
      formData.append("time", time);
      formData.append("service_type", service_type);

      const result = await bookNew(formData);
      console.log(result);
      // Reset form state
      setEmail("");
      setLastName("");
      setFirstName("");
      setPhoneNumber("");
      setTime("");
      setServiceType("");
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <>
      <section className="w-screen h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-[url('/lynxxx.JPG')] bg-cover bg-top h-[30vh] md:h-[100vh]"></div>

        <div className="flex flex-col justify-center items-center w-full md:w-[60rem] px-4 md:px-0">
          <div className="flex-1 flex flex-col justify-center items-center">
            <h1
              className={`clamp-text font-bold my-4 grid place-content-center mt-6 ${swipe.className}`}
            >
              Book an appointment
            </h1>
            <form onSubmit={handleAppointment} className="w-full max-w-2xl">
              <div className="mb-4 flex flex-col md:flex-row md:gap-10 gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="email"
                    className="block font-semibold mb-2  text-xs"
                  >
                    email (Optional)
                  </label>
                  <Input
                    type="text"
                    id="email"
                    className="w-full p-2 border rounded "
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="last_name"
                    className="block font-semibold text-xs mb-2 "
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    id="last_name"
                    className="w-full p-2 border rounded "
                    onChange={(e) => setLastName(e.target.value)}
                    value={last_name}
                    required
                  />
                </div>
              </div>

              <div className="mb-4 flex flex-col md:flex-row md:gap-10 gap-4">
                <div className="mb-4 flex-1">
                  <label
                    htmlFor="first_name"
                    className="block font-semibold text-xs mb-2 "
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    id="first_name"
                    className="w-full p-2 border rounded"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={first_name}
                    required
                  />
                </div>
                <div className="mb-4 flex-1">
                  <label
                    htmlFor="phone_number"
                    className="block font-semibold text-xs mb-2 "
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    id="phone_number"
                    className="w-full p-2 border rounded"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phone_number}
                    required
                  />
                </div>
              </div>

              {/* Rating and Category */}
              {/* <div className="flex flex-col md:flex-row gap-4 md:gap-10 mb-4">
              <div className="flex-1">
                <label
                  htmlFor="ratings"
                  className="block font-semibold mb-2 text-xs"
                >
                  Rating <span className="text-red-500">*</span>
                </label>
                <Select
                  value={ratings?.toString()}
                  onValueChange={(value) => setRatings(parseFloat(value))}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select rating</SelectLabel>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="4.5">4.5</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="category"
                  className="block font-semibold mb-2  text-xs"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select category</SelectLabel>
                      {categoryOption}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div> */}

              <div className="mb-4 flex flex-col md:flex-row md:gap-10 gap-4">
                <div className="mb-4 flex-1">
                  <label
                    htmlFor="date"
                    className="block font-semibold text-xs mb-2 "
                  >
                    Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    id="date"
                    className="rounded"
                    value={
                      date ? new Date(date).toISOString().split("T")[0] : ""
                    }
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="mb-4 flex-1">
                  <label
                    htmlFor="time"
                    className="block font-semibold text-xs mb-2 "
                  >
                    Time <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="time"
                    id="time"
                    className="rounded"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  // onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-fuchsia-300 to-fuchsia-500 hover:bg-gradient-to-r hover:from-fuchsia-400 hover:to-fuchsia-600 transition duration-300 ease-in-out py-4 md:py-6 rounded-md text-sm md:text-base"
                >
                  Book Now
                </Button>
                <Button
                  type="button"
                  variant={"outline"}
                  className="w-full py-4 md:py-6 rounded-md text-sm md:text-base"
                  onClick={() => router.back()}
                >
                  Back
                </Button>
              </div>
            </form>
          </div>
          <div className="flex flex-col items-center my-8">
            <div className="flex flex-col justify-center items-center">
              <h3 className="font-bold">Hours</h3>
              <p> Monday–Friday: 9AM–7PM Saturday: 10AM–5PM</p>
            </div>
            <p>Closed Sundays</p>
          </div>
        </div>
      </section>
    </>
  );
}
