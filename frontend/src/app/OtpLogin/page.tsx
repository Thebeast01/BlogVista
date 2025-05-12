"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/config";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function OTPLogin() {
  const [totp,settotp]=useState("")
  const router=useRouter()
  const searchparams=useSearchParams()
  const phone=searchparams.get("phone")
  const verifyotp=async()=>{
    if (!totp || !phone) {
      Swal.fire("Error!", "OTP or phone number missing", "error");
      return;
    }

  try {
  const response=await axios.post(`${API_URL}auth/verifyOtp`,
  {totp,phoneNumber:phone},
{withCredentials:true}
  )
  

  if(response.status ===200){
     Swal.fire({
              text: "OTP verified successfully ",
              icon: "success",
              timer: 1500
            })
            router.push(`/resetpassword?phone=${phone}`)
  
  }
  else {
          Swal.fire("Error!", "Invalid otp", "error");
        }
  } catch (error) {
    console.log(error)
    Swal.fire("Error!" ,"Soemthing went wrong ","error")
  }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-4">
      <h1 className="text-2xl font-semibold mb-4">Enter OTP</h1>
      <p className="text-gray-600 mb-6 text-center">
        Please enter the 6-digit code sent to your Phone number.
      </p>
      <InputOTP
        maxLength={6}
        className="flex items-center justify-center gap-2"
        pattern="\d*"
        value={totp}
        onChange={(value)=>settotp(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={verifyotp}>
        Verify
      </button>
    </div>
  );
}
