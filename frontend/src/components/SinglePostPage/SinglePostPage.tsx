'use client';
import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import PostViewer from '@/components/TipTapViewer/PostViewer';

function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',   // e.g., "Wednesday"
    year: 'numeric',   // e.g., "2025"
    month: 'long',     // e.g., "May"
    day: 'numeric',    // e.g., "28"
  };

  return date.toLocaleDateString('en-US', options);
}
export const SinglePostPage = ({ post }) => {


  const date = formatDate(post.createAt);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 bg-background text-foreground">

      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-center mb-6 max-w-2xl">
        {post.title}
      </h1>
      {/* Author Info */}
      <div className="flex items-center gap-4 mb-10">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="user image"
          />
        </Avatar>
        <div>
          <h2 className="font-semibold text-lg">Tari Ibaba</h2>
          <h3 className="text-gray-600 text-sm">{date}</h3>
        </div>
      </div>

      {/* Blog Image */}
      {/* <div className="w-full max-w-1/2    mb-8"> */}
      {/*   <Image */}
      {/*     src="https://github.com/shadcn.png" */}
      {/*     alt="Blog Post Image" */}
      {/*     width={300} */}
      {/*     height={100} */}
      {/*     className="rounded-lg object-cover w-full" */}
      {/*   /> */}
      {/* </div> */}

      {/* Blog Content */}
      <div className="text-gray-400 max-w-3xl text-lg leading-relaxed ">
        <PostViewer content={post.content} />
      </div>

    </div>
  )
}
