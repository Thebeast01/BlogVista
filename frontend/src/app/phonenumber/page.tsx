"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Reset() {
  const [countryCode, setCountryCode] = useState("+91");
  const [number, setnumber] = useState("")
  const router = useRouter();
  const API_URL = process.env.NEXT_BACKEND || "https://vibetrailsbackend.vercel.app/api/"
  const countries = [
    { code: "+91" },
    { code: "+1" },
    { code: "+44" },
    { code: "+61" },
    { code: "+81" },
  ];


  const phonenumber = async (phone: string) => {
    console.log("Phone", phone)
    try {

      const response = await axios.post(`${API_URL}auth/sendOtp`,
        { phoneNumber: phone },
        { withCredentials: true })
      if (response.status === 200) {
        Swal.fire({
          text: "OTP sent successfully ",
          icon: "success",
          timer: 1500
        })
        return true
      }
      else {
        Swal.fire("Error!", "Failed to send OTP", "error");
        return false
      }
    } catch (error) {
      console.log("error", error)
      Swal.fire("Error!", "Something went wrong", "error");
      return false;
    }
  }
  const handlecontinue = async () => {
    const trimmed = number.trim().replace(/\D/g, "")
    if (trimmed.length == 10) {
      const fullPhone = countryCode + trimmed;
      console.log("PHone number", fullPhone)
      const sent = await phonenumber(fullPhone)
      if (sent) {
        router.push(`/OtpLogin?phone=${encodeURIComponent(fullPhone)}`)
      }
    }
    else {
      Swal.fire({
        title: "Error!",
        text: "Enter valid number",
        icon: "error"
      })
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Enter your mobile number
        </h1>

        <div className=" text-gray-400 flex items-center space-x-2 mb-4">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg bg-white focus:outline-none"
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                ({c.code})
              </option>
            ))}
          </select>

          <input
            value={number}
            onChange={(e) => setnumber(e.target.value)}
            type="tel"
            placeholder="Mobile number"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <p className="text-sm text-gray-600 mb-6">
          You will Otp on your mobile number.
        </p>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition" onClick={handlecontinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
