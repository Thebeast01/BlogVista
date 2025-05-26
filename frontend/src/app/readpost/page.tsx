import React from 'react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const BlogCard = () => {

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
    <div className="grid grid-cols-1 border-1 border-border relative  bg-background md:grid-cols-2 lg:grid-cols-4 gap-6 pt-30 p-4">
      {blogs.map((blog) => (
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
            <Link href={`/readpost/${blog.id}`} passHref>
              <Button className="w-full">Read More</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BlogCard;
