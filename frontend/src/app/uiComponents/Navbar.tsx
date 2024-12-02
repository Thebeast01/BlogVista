"use client"
import { useRouter } from 'next/navigation';
import Link from "next/link"
export const Navbar = () => {
  const router = useRouter()
  const Links = [
    {
      name: "Home",
      path: '/'
    },
    {
      name: "About Us",
      path: '/about'
    },
    {
      name: "Contact Us",
      path: "/contact",

    },
  ]

  return (

    <nav className=" flex justify-between items-center py-5 ">
      <h3 className="text-4xl py-2 italic bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500   bg-clip-text tracking-tight text-transparent font-bold px-20">
        Echoes Of Thought

      </h3>

      <ul className="flex justify-between gap-10 items-center">
        {
          Links.map((link, index) =>
          (
            <Link key={index} href={link.path}>
              {link.name}
            </Link>

          ))
        }
        <span className="gap-4 flex">
          <button className="bg-slate-100 px-8 py-1 rounded-xl text-slate-950"

            onClick={() => router.push('/login')}
          >
            Login
          </button>

          <button className="border border-slate-100 px-6 py-1 rounded-xl text-slate-100"
            onClick={() => router.push('/signup')}
          >
            Sign Up
          </button>
        </span>
      </ul>
    </nav>

  )
}
