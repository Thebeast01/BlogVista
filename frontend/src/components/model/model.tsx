import { LucideX } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { PasswordInput } from "../ui/customPassword";
import Swal from "sweetalert2";
import axios from "axios";
import { ModelProps } from "@/utils/interface/interface";

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
  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log(loginInput);
    try {
      console.log("This is api url", API_URL);
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
        console.log("Clicked");
        Swal.fire({
          title: "Error!",
          text: "Password does not match",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }
      const response = await axios.post(`${API_URL}auth/signup`, {
        username: registerInput.username,
        email: registerInput.email,
        password: registerInput.password,
      });
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register Success",
          showConfirmButton: false,
          timer: 1500,
        });
        onClose();
      }
    } catch (e) {
      Swal.fire({
        title: "Error!",
        text: e.response?.data.error,
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  return (
    <div className="h-screen w-screen absolute inset-0  bg-black bg-opacity-50 flex items-center justify-center ">
      {x == "login" ? (
        <div className="bg-white p-4 rounded-lg w-[400px] relative">
          <LucideX
            className="text-black absolute top-4 right-4"
            onClick={onClose}
          />
          <h1 className="text-2xl font-bold text-black  text-center">Login</h1>
          <h5 className="text-xl text-black  text-center">Welcome Back!</h5>
          <form className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Username"
              className="w-full text-black rounded-md px-2 py-5 my-4"
              onChange={(e: any) =>
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
                className="  text-black p-2 rounded-md"
                onClick={onClose}
              >
                Cancle
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
            className=" text-black absolute top-4 right-4"
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
              className="w-full rounded-md text-black  px-2 py-5  "
              onChange={(e) =>
                setRegisterInput({ ...registerInput, username: e.target.value })
              }
            />
            <Input
              type="email"
              placeholder="Email"
              className="w-full rounded-md px-2 py-5 text-black "
              onChange={(e) =>
                setRegisterInput({ ...registerInput, email: e.target.value })
              }
            />
            <PasswordInput
              id="current_password"
              value={registerInput.password}
              onChange={(e: any) =>
                setRegisterInput({ ...registerInput, password: e.target.value })
              }
              className="text-black px-2 py-5"
              placeholder="Password"
              autoComplete="current-password"
            />
            <PasswordInput
              id="current_password"
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
            <div className="flex items-center justify-between gap-4 py-4">
              <Button
                variant={"outline"}
                className="  text-black p-2 rounded-md"
                onClick={onClose}
              >
                Cancle
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
