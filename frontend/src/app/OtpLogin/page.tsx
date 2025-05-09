"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";

export default function OTPLogin() {
  const [otp,setotp]=useState("")
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
        value={otp}
        onChange={(value)=>setotp(value)}
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
      <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" >
        Verify
      </button>
    </div>
  );
}
