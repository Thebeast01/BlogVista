'use client'
import dynamic from "next/dynamic"
const RichTextEditor = dynamic(() => import('@/components/Tiptap/Tiptap'), { ssr: false });
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const CreatePost = () => {
  const [post, setPost] = useState('')
  const [title, setTitle] = useState('')

  const onChange = (content: string) => {
    setPost(content)
  }
  const handleSubmit = () => {
    console.log(post)
    console.log(title, "title")
  }
  return (
    <section className="flex  relative h-screen  items-center justify-center pt-12">
      <div className=" flex flex-col gap-2 border-slate-700 border rounded-md px-2 py-2 w-1/2">
        <Input className="border-slate-700 border px-4 py-6 text-2xl" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <RichTextEditor content={post} onChange={onChange} />
        <div className="flex justify-end  items-center gap-5 py-2 ">
          <label
            htmlFor="picture"
            className="flex gap-3 items-center justify-center w-full max-w-fit px-3 py-2 text-sm font-medium text-zinc-300 bg-black border border-zinc-700 rounded-lg cursor-pointer hover:border-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <path d="M12 11v6" />
              <path d="M9.5 13.5l2.5 -2.5l2.5 2.5" />
            </svg>
            Upload Image
            <input
              id="picture"
              type="file"
              className="hidden"
            />
          </label>
          <Button variant="outline"
            className="px-8 py-2 font-semibold"
            onClick={handleSubmit}
          >Create</Button>
        </div>

      </div>
    </section>
  )
}
export default CreatePost
