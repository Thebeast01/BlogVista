
'use client'
import { useState } from "react"
import { NextPage } from "next"
import SignupBackground from "../uiComponents/SignupBackground"
import Link from "next/link"
import { motion } from 'framer-motion'
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

      <div className=" bg-transparent p-8   ">
        <motion.h2
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-5xl w-full tracking-tighter  text-center font-bold  text-slate-100 mb-2  font-mono">
          Create new account<span className="text-cyan-500 text-4xl font-bold pl-2">.</span>
        </motion.h2>
        <motion.h2
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-slate-100 text-xl mb-6 text-center">
          Already have account?<Link href="/login" className="text-cyan-500 pl-3">Login</Link>
        </motion.h2>
        <motion.form
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="space-y-4" onSubmit={registerHandle}>

          <motion.div

            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <label className="block text-slate-300 mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
              placeholder="Enter your name"
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            />
          </motion.div>
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <label className="block text-slate-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
              placeholder="Enter your email"
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
          </motion.div>
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1, delay: 0.5 }}
          >

            <label className="block text-slate-300 mb-2">Password</label>
            <input

              type="password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
              placeholder="Enter your password"
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
          </motion.div>
          <button

            type="submit"
            className="w-full bg-cyan-800 text-white py-2 rounded-lg hover:bg-cyan-600  transition duration-300"
          >
            Sign Up
          </button>
        </motion.form>
      </div>
    </SignupBackground >
  )
}
export default Register
