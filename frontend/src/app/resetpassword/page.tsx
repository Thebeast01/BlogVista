"use client";

import { API_URL } from "@/config";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function ResetPassword() {
  const router = useRouter()
  const [newpass, setnewpass] = useState("")
  const [confirmpass, setconfirmpass] = useState("")
  const searchparams = useSearchParams()
  const phone = searchparams.get("phone")
  console.log(phone)
  const resetpasssword = async () => {
    if (newpass != confirmpass) {
      Swal.fire("Password does not match")
      return
    }
    try {
      console.log("This is phone number", phone)
      const response = await axios.post(`${API_URL}/auth/resetPassword`,
        { phoneNumber: phone, newPassword: newpass },
        { withCredentials: true })
      if (response.status === 200) {
        Swal.fire({
          text: "Password updated successfully ",
          icon: "success",
          timer: 1500
        })
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      }
      else {
        Swal.fire("Error updating pass")
      }


    } catch (error) {
      console.log(error)
      Swal.fire("Error!", "Something went wrong", "error")
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center" >
          Reset Password
        </h1>

        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className=" text-black p-3 border border-gray-3 00 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newpass}
            onChange={(e) => setnewpass(e.target.value)}
          />

          <label className="text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmpass}
            onChange={(e) => setconfirmpass(e.target.value)}
          />

          <button className="mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition" onClick={resetpasssword}>
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
