/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect } from 'react';
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import axios from 'axios';
import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { blogInterface } from '@/utils/interface/interface';
import Loading from '../loading';
import Swal from 'sweetalert2';
const BlogCard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState<blogInterface[]>([]);
  console.log(blogs)
  const getAllBlog = async () => {
    try {
      setIsLoading(true);
      const response: any = await axios.get(`${API_URL}/post/getAllPosts`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      setIsLoading(false);
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
  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`${API_URL}/post/deletePost/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      setIsLoading(false);
      if (response.status === 200) {
        setBlogs(blogs.filter(blog => blog.id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Blog Deleted Successfully',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      setIsLoading(false);
    }
  }
  return (
    <div className="grid grid-cols-1 border-1 border-border relative  bg-background md:grid-cols-2 lg:grid-cols-4 gap-6 pt-30 p-4">
      {isLoading && (
        <div className="absolute h-screen inset-0 flex items-center justify-center bg-background z-10">
          <Loading />
        </div>
      )}
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
          <CardFooter className="mt-auto w-full flex items-center justify-between">
            <Button className="" onClick={() => router.push(`/readpost/${blog.id}`)}>Read More</Button>
            <Button className="" variant="destructive" onClick={() => handleDelete(blog.id)}>
              <Trash2 /> </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BlogCard;
