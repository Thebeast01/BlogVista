'use client'
import { ArrowRight } from "lucide-react"

import axios from "axios"
import { useEffect, useState } from "react"
import { blogInterface } from "@/utils/interface/interface"
export const Posts = () => {

  const [blogs, setBlogs] = useState<blogInterface[]>([]);
  console.log(blogs)
  const getAllBlog = async () => {
    try {

      const response: any = await axios.get(`http://localhost:8787/api/v1/blog/getAllBlogs`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.data || response.data?.length === 0) {
        console.log("No blogs found")
        return
      }
      setBlogs(response?.data)
      console.log(response)

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getAllBlog()
  }, [])
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((post) => (
        <div key={post} className="border border-white p-6 hover:bg-white/10  hover:text-white transition-colors rounded-md">
          <p className="text-sm mb-4">December 1, 2023</p>
          <h3 className="text-xl font-bold mb-2">The Art of Minimalism</h3>
          <p className="mb-4">Exploring how less can be more in our daily lives and creative pursuits.</p>
          <a href="#" className="flex w-fit px-3 py-2 items-center hover:bg-white/10 border-1 border-white/10 rounded-md"
            onClick={getAllBlog}
          >

            Read More <ArrowRight className="ml-2" />
          </a>
        </div>
      ))}
    </div>
  )
}
