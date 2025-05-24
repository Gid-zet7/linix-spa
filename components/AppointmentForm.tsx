"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import localFont from "next/font/local";
import { bookNew } from "@/lib/actions";
import { sendEmail } from "@/lib/actions";
import Snackbar from "./Snackbar";
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
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState<string>("");
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      setShowErrorSnackbar(true);
      const timer = setTimeout(() => {
        setShowErrorSnackbar(false);
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessSnackbar(true);
      const timer = setTimeout(() => {
        setShowSuccessSnackbar(false);
        setIsSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  // const [errors, setErrors] = useState<{
  //   phone_number?: string;
  //   address_line1?: string;
  //   city?: string;
  // }>({});

  // const validateForm = () => {
  //   const newErrors: typeof errors = {};
  //   let isValid = true;

  //   if (!last_name?.trim()) {
  //     newErrors.address_line1 = "Address is required";
  //     isValid = false;
  //   }
  //   if (!first_name?.trim()) {
  //     newErrors.city = "City is required";
  //     isValid = false;
  //   }
  //   if (!phone_number?.trim()) {
  //     newErrors.phone_number = "Phone number is required";
  //     isValid = false;
  //   }
  //   if (!time?.trim()) {
  //     newErrors.phone_number = "Time is required";
  //     isValid = false;
  //   }
  //   if (!service_type?.trim()) {
  //     newErrors.phone_number = "Service type is required";
  //     isValid = false;
  //   }

  //   setErrors(newErrors);
  //   return isValid;
  // };

  const sendMessage = async () => {
    // e.preventDefault();
    // console.log(emailFrom, subject, message);
    try {
      const res = await sendEmail(
        email,
        `<div>
        <h2>New Appointment Booking</h2>
    </div>
    
    <p>${first_name} ${last_name} has scheduled an appointment with your company.</p>
    
    <div>
        <p><span>Service Type:</span> ${service_type}</p>
        <p><span>Date:</span> ${date}</p>
        <p><span>Time:</span> ${time}</p>
        <p><span>Contact Number:</span> ${phone_number}</p>
    </div>
    
    <p>Please confirm availability and prepare accordingly.</p>
    
    <div>
        <p>This is an automated notification. Please do not reply to this message.</p>
    </div>`
      );

      if (res === undefined) setError("Failed to send");
      if (res.message === "success") setIsSuccess("success");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAppointment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("last_name", last_name);
      formData.append("first_name", first_name);
      formData.append("phone_number", phone_number);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("service_type", service_type);

      const response = await bookNew(formData);
      console.log("Server Response:", response);

      sendMessage();
      setEmail("");
      setLastName("");
      setFirstName("");
      setPhoneNumber("");
      setTime("");
      setServiceType("");
    } catch (error) {
      console.error("Error while booking an appointment:", error);
      setError("Failed to book appointment");
    }
  };

  const categories = [
    { name: "Braids" },
    { name: "Nails" },
    { name: "Makeup" },
    { name: "Pedicure/manicure" },
    { name: "Lash extensions" },
    { name: "Ombre brows" },
    { name: "Facial treatment" },
    { name: "Wig installation" },
    // { name: "Weaving" },
    // { name: "Barbing" },
    // { name: "Dreadlocks" },
    // { name: "Coloring" },
    // { name: "Treatment" },
    // { name: "Others" },
  ];

  const categoryOption = categories.map((category, i) => {
    return (
      <SelectItem value={category.name} key={i}>
        {category.name}
      </SelectItem>
    );
  });

  return (
    <>
      {showErrorSnackbar && <Snackbar message={error} />}
      {showSuccessSnackbar && <Snackbar message={isSuccess} />}
      <section className="w-screen h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-[url('/lynxxx.jpeg')] bg-cover bg-top h-[30vh] md:h-[100vh]"></div>

        <div className="flex flex-col justify-center items-center w-full px-4 md:px-0">
          <div className="flex-1 flex flex-col justify-center items-center w-full px-4 md:px-0">
            <h1
              className={`clamp-text font-bold my-4 grid place-content-center mt-6 ${swipe.className}`}
            >
              Book an appointment
            </h1>
            <form
              onSubmit={handleAppointment}
              className="w-full px-0 md:px-4 lg:px-0 lg:max-w-2xl"
            >
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
              <div className="flex flex-col md:flex-row gap-4 md:gap-10 mb-4">
                <div className="flex-1">
                  <label
                    htmlFor="service_type"
                    className="block font-semibold mb-2 text-xs "
                  >
                    Service required <span className="text-red-500">*</span>
                  </label>
                  <Select
                    name="service_type"
                    value={service_type}
                    onValueChange={(value) => setServiceType(value)}
                    required
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Select service required" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select service required</SelectLabel>
                        {categoryOption}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

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
          <div className="flex flex-col items-center my-8 text-center">
            <div className="flex flex-col justify-center items-center">
              <h3 className="font-bold mb-2">Hours</h3>
              <p>Monday–Friday: 9AM–7PM</p>
              <p>Saturday: 10AM–5PM</p>
            </div>
            <p className="mt-2">Closed Sundays</p>
          </div>
        </div>
      </section>
    </>
  );
}
