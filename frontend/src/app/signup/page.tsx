
'use client'
import { useState } from "react"
import { NextPage } from "next"
import SignupBackground from "../uiComponents/SignupBackground"
const Register: NextPage = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const registerHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(registerData)
  }
  return (
    <SignupBackground backgroundURI='/01.jpg'>
      <div className=" shadow-2xl p-8  ">

        <h2 className="text-3xl font-bold text-center text-slate-100 mb-6">
          Sign Up
        </h2>
        <form className="space-y-4" onSubmit={registerHandle}>
          <div>
            <label className="block text-slate-300 mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
              placeholder="Enter your name"
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
              placeholder="Enter your email"
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
              placeholder="Enter your password"
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </SignupBackground >
  )
}
export default Register
