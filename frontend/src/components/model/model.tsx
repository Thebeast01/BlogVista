import { LucideX } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { PasswordInput } from "../ui/customPassword";
import Swal from "sweetalert2";
import axios from "axios";
import { ModelProps } from "@/utils/interface/interface";
import Image from "next/image";

const API_URL = process.env.NEXT_BACKEND_URL || "http://localhost:8787/api/v1/";

export const Model = ({ x, onClose }: ModelProps) => {
  const [registerInput, setRegisterInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginInput, setLoginInput] = useState({
    userData: "",
    password: "",
  });
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

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}auth/login`, loginInput, {
        withCredentials: true,
      });
      if (response.status !== 200) {
        Swal.fire({
          title: "Error!",
          text: "Invalid Credentials",
          icon: "error",
        });
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 1500,
      });
      onClose();
    } catch (e) {
      onClose();
      Swal.fire({
        title: "Error!",
        text: "Invalid Credentials",
        icon: "error",
      });
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
        formData.append("profilePicture", profilePicture); // Ensure the backend expects this field name
      }

      const response = await axios.post(`${API_URL}auth/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });

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
        onClose();
      }
    } catch (e) {
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
    <div className="h-screen w-screen absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      {x === "login" ? (
        <div className="bg-white p-4 rounded-lg w-[400px] relative">
          <LucideX
            className="text-black absolute top-4 right-4"
            onClick={onClose}
          />
          <h1 className="text-2xl font-bold text-black text-center">Login</h1>
          <h5 className="text-xl text-black text-center">Welcome Back!</h5>
          <form className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Username"
              className="w-full text-black rounded-md px-2 py-5 my-4"
              onChange={(e: unknown) =>
                setLoginInput({ ...loginInput, userData: e.target.value })
              }
            />
            <PasswordInput
              id="current_password"
              value={loginInput.password}
              onChange={(e: any) =>
                setLoginInput({ ...loginInput, password: e.target.value })
              }
              className="text-black px-2 py-5"
              autoComplete="current-password"
              placeholder="Password"
            />
            <div className="flex items-center justify-between gap-4 py-4">
              <Button
                variant={"outline"}
                className="text-black p-2 rounded-md"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary text-white p-2 rounded-md"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      ) : (
        // Register Logic
        <div className="bg-white p-8 rounded-lg w-[400px] relative">
          <LucideX
            className="text-black absolute top-4 right-4"
            onClick={onClose}
          />
          <h1 className="text-2xl font-bold text-black text-center">
            Register
          </h1>
          <h1 className="text-xl text-black text-center">Welcome!</h1>
          <form className="flex flex-col gap-4 mt-4">
            <Input
              value={registerInput.username}
              type="text"
              placeholder="Username"
              className="w-full rounded-md text-black px-2 py-5"
              onChange={(e) =>
                setRegisterInput({ ...registerInput, username: e.target.value })
              }
            />
            <Input
              type="email"
              placeholder="Email"
              className="w-full rounded-md px-2 py-5 text-black"
              onChange={(e) =>
                setRegisterInput({ ...registerInput, email: e.target.value })
              }
            />
            <PasswordInput
              id="current_password"
              value={registerInput.password}
              onChange={(e: unknown) =>
                setRegisterInput({ ...registerInput, password: e.target.value })
              }
              className="text-black px-2 py-5"
              placeholder="Password"
              autoComplete="current-password"
            />
            <PasswordInput
              id="confirm_password"
              value={registerInput.confirmPassword}
              onChange={(e: any) =>
                setRegisterInput({
                  ...registerInput,
                  confirmPassword: e.target.value,
                })
              }
              className="text-black px-2 py-5"
              placeholder="Confirm Password"
              autoComplete="current-password"
            />
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center gap-2">
              <label className="text-black font-medium">Profile Picture</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="text-black"
              />
              {previewUrl && (
                <div className="mt-2">
                  <Image
                    src={previewUrl}
                    alt="Profile Picture Preview"
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-4 py-4">
              <Button
                variant={"outline"}
                className="text-black p-2 rounded-md"
                onClick={() => {
                  revokePreviewUrl(); // Clean up preview URL on cancel
                  setProfilePicture(null); // Reset profile picture state
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary text-white p-2 rounded-md"
                onClick={handleRegister}
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};