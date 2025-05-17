
"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/config";
import Swal from "sweetalert2";

export default function OTPLogin() {
  const [totp, setTotp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  // set phone number from search params on first render
  useEffect(() => {
    const phone = searchParams.get("phone");
    if (phone) {
      setPhoneNumber(phone);
    }
  }, [searchParams]);

  const verifyOtp = async () => {
    if (!totp || !phoneNumber) {
      Swal.fire("Error!", "OTP or phone number missing", "error");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}auth/verifyOtp`,
        { totp, phoneNumber },
        { withCredentials: true }
      );

      if (response.status === 200) {
        Swal.fire({
          text: "OTP verified successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        // You can redirect to dashboard or password reset, etc.
        router.push(`/resetpassword?phone=${encodeURIComponent(phoneNumber)}`);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-semibold mb-4">Enter OTP</h1>
      <p className="text-gray-600 mb-6 text-center">
        Please enter the 6-digit code sent to your phone number.
      </p>
      <InputOTP
        maxLength={6}
        className="flex items-center justify-center gap-2"
        pattern="\d*"
        value={totp}
        onChange={(value) => setTotp(value)}
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
      <button
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={verifyOtp}
      >
        Verify
      </button>
    </div>
  );
}

