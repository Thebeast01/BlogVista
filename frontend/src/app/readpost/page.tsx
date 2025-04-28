import React from 'react';
import { Card,  CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const BlogCard = () => {
  // Hardcoded blog data
  const blogs = [
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
    {
      id: 4,
      title: "Server Components in Next.js",
      description: "Dive deep into server components and learn how they can improve performance in your Next.js applications.",
      image: "/api/placeholder/800/500",
      slug: "server-components-in-nextjs"
    },
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
      {
        id: 4,
        title: "Server Components in Next.js",
        description: "Dive deep into server components and learn how they can improve performance in your Next.js applications.",
        image: "/api/placeholder/800/500",
        slug: "server-components-in-nextjs"
      }
  ];

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6 pt-30 p-4">
      {blogs.map((blog) => (
        <Card key={blog.id} className="overflow-hidden bg-black transform hover:scale-105 transition-transform duration-300  flex flex-col h-full">
          <div className="h-48 overflow-hidden">
            <Image
              src="https://github.com/shadcn.png"
              alt={blog.title} 
              className="w-full h-full object-cover "
              height={200}
              width={200}
            />
          </div>
          <CardHeader>
            <CardTitle className="text-white text-lg font-bold">{blog.title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">{blog.description}</CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">
            <Link href={`/blog/${blog.slug}`} passHref>
              <Button className="w-full">Read More</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BlogCard;