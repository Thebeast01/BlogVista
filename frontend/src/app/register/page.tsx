'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/customPassword";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
const register = () => {
  const dispatch = useDispatch();
  const [registerInput, setRegisterInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const API_URL = process.env.NEXT_BACKEND_URL || "http://localhost:8000/api/";
  const [profilePicture, setProfilePicture] = useState<File | null>(null); // State for the profile picture file
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // State for the preview URL

  // Handle profile picture upload
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (optional)
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          title: "Error!",
          text: "Please upload an image file (e.g., PNG, JPEG).",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }

      // Validate file size (optional, e.g., max 5MB)
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSizeInBytes) {
        Swal.fire({
          title: "Error!",
          text: "File size exceeds 5MB. Please upload a smaller image.",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }

      setProfilePicture(file);

      // Create a preview URL for the image
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Clean up preview URL to avoid memory leaks
  const revokePreviewUrl = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      if (registerInput.password !== registerInput.confirmPassword) {
        Swal.fire({
          title: "Error!",
          text: "Password does not match",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }

      // Create FormData to send the registration data and profile picture
      const formData = new FormData();
      formData.append("username", registerInput.username);
      formData.append("email", registerInput.email);
      formData.append("password", registerInput.password);
      if (profilePicture) {
        formData.append("profile", profilePicture); // Ensure the backend expects this field name
      }

      console.log("FormData:", formData);
      const response = await axios.post(`${API_URL}auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });
      console.log("repsonse", response)
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register Success",
          showConfirmButton: false,
          timer: 1500,
        });
        revokePreviewUrl(); // Clean up preview URL
        setProfilePicture(null); // Reset profile picture state
      }
    } catch (e: any) {
      Swal.fire({
        title: "Error!",
        text: e.response?.data?.error || "Registration failed",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  return (
    <div className="h-screen  flex bg-background items-center justify-center ">
      <div className="bg-muted  p-8 rounded-lg shadow-md shadow-card w-[400px] relative">
        <h1 className="text-2xl font-bold text-foreground text-center">
          Register
        </h1>
        <h1 className="text-xl text-accent-foreground text-center">Welcome!</h1>
        <form className="flex flex-col gap-4 mt-4">
          <Input
            value={registerInput.username}
            type="text"
            placeholder="Username"
            className="w-full rounded-md text-accent-foreground px-2 py-5"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRegisterInput({ ...registerInput, username: e.target.value })
            }
          />
          <Input
            type="email"
            placeholder="Email"
            className="w-full rounded-md px-2 py-5 text-accent-foreground"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRegisterInput({ ...registerInput, email: e.target.value })
            }
          />
          <PasswordInput
            id="current_password"
            value={registerInput.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRegisterInput({ ...registerInput, password: e.target.value })
            }
            className="text-accent-foreground px-2 py-5"
            placeholder="Password"
            autoComplete="current-password"
          />
          <PasswordInput
            id="confirm_password"
            value={registerInput.confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRegisterInput({
                ...registerInput,
                confirmPassword: e.target.value,
              })
            }
            className="text-accent-foreground px-2 py-5"
            placeholder="Confirm Password"
            autoComplete="current-password"
          />
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center gap-2">
            <label
              htmlFor="picture"
              className="flex gap-3 items-center justify-center w-full max-w-fit px-3 py-2 text-sm font-medium text-foreground bg-accent border border-border rounded-lg cursor-pointer hover:border-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <path d="M12 11v6" />
                <path d="M9.5 13.5l2.5 -2.5l2.5 2.5" />
              </svg>
              Upload Image
              <input
                id="picture"
                type="file"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
            </label>

            {previewUrl && (
              <Image
                src={previewUrl}
                alt="Profile Picture Preview"
                width={100}
                height={50}
                className="rounded-full"
              />
            )}
          </div>
          <div className="flex items-center justify-between gap-4 py-4">
            <Button
              variant={"outline"}
              className="text-foreground py-2 px-6 rounded-md"
              onClick={() =>
                router.push("/login")
              }
            >
              Login
            </Button>
            <Button
              variant={"outline"}
              className="bg-accent text-primary py-2 px-6 rounded-md"
              onClick={handleRegister}
            >
              Register
            </Button>
          </div>
        </form>
      </div >
    </div >
  )
}
export default register
