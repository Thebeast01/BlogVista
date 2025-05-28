'use client';
import { useEffect } from 'react';
import React from 'react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import axios from 'axios';
import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { blogInterface } from '@/utils/interface/interface';
const BlogCard = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<blogInterface[]>([]);
  console.log(blogs)
  const getAllBlog = async () => {
    try {

      const response: any = await axios.get(`${API_URL}post/getAllPosts`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.data || response.data?.length === 0) {
        console.log("No blogs found")
        return
      }
      setBlogs(response?.data.post)
      console.log(response)

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getAllBlog()
  }, [])
  return (
    <div className="grid grid-cols-1 border-1 border-border relative  bg-background md:grid-cols-2 lg:grid-cols-4 gap-6 pt-30 p-4">
      {blogs.map((blog: any) => (
        <Card key={blog.id} className="overflow-hidden bg-card transform hover:scale-105 transition-transform duration-300  flex flex-col h-full">
          <div className="h-48 overflow-hidden rounded-md">
            <Image
              src="https://github.com/shadcn.png"
              alt={blog.title}
              className="w-full h-full px-2 rounded-sm  object-cover  "
              height={200}
              width={200}
            />
          </div>
          <CardHeader>
            <CardTitle className="text-foreground text-xl font-bold">{blog.title}</CardTitle>
            <CardDescription className="text-sm text-secondary-foreground">{blog.description}</CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">
            <Button className="w-full" onClick={() => router.push(`/readpost/${blog.id}`)}>Read More</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BlogCard;
