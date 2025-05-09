'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/customPassword";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/store/features/auth/authSlice";

type LoginResponse = {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    profilePicture: string;
  };
};
const Login = () => {
  const [loginInput, setLoginInput] = useState({
    userData: "",
    password: "",
  })
  const dispatch = useDispatch();
  const API_URL = process.env.NEXT_BACKEND_URL || "https://vibetrailsbackend.vercel.app/api/";
  const router = useRouter()
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("login input", loginInput)
      const response = await axios.post<LoginResponse>(`${API_URL}auth/login`, loginInput, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
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
      if (!response) {
        return;
      }
      const user = response?.data.user;
      dispatch(setUser({ id: user.id, username: user.username, email: user.email, avatar: user.profilePicture }));
      router.push("/");
    } catch (e) {
      console.log("error", e)
      Swal.fire({
        title: "Error!",
        text: "Invalid Credentials",
        icon: "error",
      });

    }
  };


  return (
    <div className="h-screen  flex bg-background items-center justify-center ">
      <div className=" border-border border-1 bg-background    shadow-md shadow-muted p-4 rounded-lg w-[400px] relative " >

        <h1 className="text-2xl font-bold text-primary text-center">Login</h1>
        <h5 className="text-xl text-foreground text-center">Welcome Back!</h5>
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          <Input
            type="text"
            placeholder="Username"
            className="w-full text-foreground  border-muted-foreground rounded-md px-2 py-5 my-4"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLoginInput({ ...loginInput, userData: e.target.value })
            }
          />
          <PasswordInput
            id="current_password"
            value={loginInput.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLoginInput({ ...loginInput, password: e.target.value })
            }
            className="text-foreground  border-muted-foreground  px-2 py-5"
            autoComplete="current-password"
            placeholder="Password"
          />
          <a href="/phonenumber" className="text-center text-blue-600">Forgot Password?</a>
          <div className="flex items-center justify-between gap-4 py-4">
            <Button
              variant={"outline"}
              className="bg-background border-muted font-bold text-accent py-2 px-5 text-md rounded-md"
              onClick={() => router.push('/register')}
            >
              Register
            </Button>
            <Button
              variant={"outline"}
              className="bg-accent font-bold text-primary py-2 px-5 text-md rounded-md"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </div >
    </div>
  )
}
export default Login
