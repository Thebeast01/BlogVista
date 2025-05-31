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
import { API_URL } from '@/config';
export const Posts = () => {

  const [blogs, setBlogs] = useState<blogInterface[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(blogs)
  const getAllBlog = async () => {
    try {
      setLoading(true);
      const response: any = await axios.get(`${API_URL}/post/getFourPosts`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response.data || response.data?.length === 0) {
        console.log("No blogs found")
        return
      }
      setBlogs(response?.data.posts)

      setLoading(false);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllBlog()
  }, [])
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {loading ? (
        <p className="text-center col-span-3">Loading...</p>
      ) : null}
      {
        blogs.length === 0 ? (<p className="text-center col-span-3">No posts available</p>) :
          blogs.map((post) => (
            <Card key={post.id} className="overflow-hidden bg-card transform hover:scale-105 transition-transform duration-300  flex flex-col h-full">
              <div className="h-48 overflow-hidden rounded-md">
                <Image
                  src={post?.coverImg}
                  alt={post.title}
                  className="w-full h-full px-2  object-cover "
                  height={200}
                  width={200}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-card-foreground text-xl font-bold">{post.title}</CardTitle>
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
