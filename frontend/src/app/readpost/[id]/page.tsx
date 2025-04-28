"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function UserPost() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 bg-black">
      
      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-center mb-6 max-w-2xl">
        This new IDE from Google is an absolute game changer
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
          <h3 className="text-gray-600 text-sm">5 min read · Mar 12, 2025</h3>
        </div>
      </div>

      {/* Blog Image */}
      <div className="w-full max-w-1/2    mb-8">
        <Image
          src="https://github.com/shadcn.png"
          alt="Blog Post Image"
          width={300}
          height={200}
          className="rounded-lg object-cover w-full"
        />
      </div>

      {/* Blog Content */}
      <div className="text-gray-400 max-w-3xl text-lg leading-relaxed text-center">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          voluptas eius fugit alias quaerat. Aliquid consectetur suscipit facere
          libero quas amet eligendi earum aliquam eum voluptates nulla, totam
          mollitia nisi quam incidunt, ullam sequi id. Cumque nulla autem ut
          sapiente ipsa, consectetur, suscipit explicabo eum, iusto optio beatae
          et! Enim vero doloremque officia? Nostrum sed sunt eligendi obcaecati
          eaque, sapiente quia rem ea et quis debitis explicabo itaque mollitia
          accusantium ipsa incidunt dicta ipsum rerum! Quas quia voluptas,
          facilis earum vero quidem sequi optio voluptatibus maiores quos
          assumenda officia asperiores possimus architecto ducimus error minus
          hic. Omnis vero saepe voluptatibus?
        </p>
      </div>

    </div>
  );
}
