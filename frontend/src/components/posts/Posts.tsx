/* eslint-disable  */
'use client'
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import axios from "axios"
import { useEffect, useState } from "react"
import { blogInterface } from "@/utils/interface/interface"
import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle } from "@/components/ui/card"
import Image from 'next/image';
export const Posts = () => {

  const [blogs, setBlogs] = useState<blogInterface[]>([]);
  console.log(blogs)
  const getAllBlog = async () => {
    try {

      const response: any = await axios.get(`http://localhost:8000/api/post/getAllPosts`, {
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
  const posts = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      description: "Learn the basics of Next.js and how to create your first application with this powerful React framework.",
      image: "",
      slug: "getting-started-with-nextjs"
    },
    {
      id: 2,
      title: "Understanding Tailwind CSS",
      description: "Explore how Tailwind CSS can transform your workflow and make styling your applications easier and more consistent.",
      image: "",
      slug: "understanding-tailwind-css"
    },
    {
      id: 3,
      title: "Building UI Components with shadcn/ui",
      description: "Discover how to use shadcn/ui to create beautiful, accessible components for your Next.js applications.",
      image: "",
      slug: "building-ui-components-with-shadcn"
    },


  ];
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden bg-card transform hover:scale-105 transition-transform duration-300  flex flex-col h-full">
          <div className="h-48 overflow-hidden rounded-md">
            <Image
              src="https://github.com/shadcn.png"
              alt={post.title}
              className="w-full h-full px-2  object-cover "
              height={200}
              width={200}
            />
          </div>
          <CardHeader>
            <CardTitle className="text-card-foreground text-xl font-bold">{post.title}</CardTitle>
            <CardDescription className="text-sm text-secondary-foreground">{post.description}</CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">
            <Link href={`/readpost/${post.id}`} passHref>
              <Button className="w-full">Read More</Button>
            </Link>
          </CardFooter>
        </Card>

      ))}
    </div>
  )
}
