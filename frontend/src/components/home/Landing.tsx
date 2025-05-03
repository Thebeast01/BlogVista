"use client"
import { ArrowRight } from "lucide-react"
import { Posts } from "../posts/Posts"
import { Input } from "../ui/input"
export const Landing = () => {
  return (
    <div className="bg-[var(--background)] text-[var(--primary)]">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6">Thoughts & Ideas</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Exploring life&apos;s complexities through words. A collection of stories, insights, and reflections.
          </p>
          <button className="border-1 border-[var(--border)] rounded-md px-8 py-3 flex items-center mx-auto hover:bg-white hover:text-black transition-colors cursor-pointer">
            Start Reading <ArrowRight className="ml-2" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
        <Posts />
      </div>

      <div className="border-t border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to the Newsletter</h2>
            <p className="mb-8">Get notified about new posts and updates.</p>
            <div className="flex max-w-md   mx-auto border-white/10 border-1 rounded-md overflow-hidden">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border-0 h-12  px-4 py-3 focus:outline-none text-xl"
              />
              <button className=" text-[var(--primary)] px-6 py-2 hover:bg-white/20 bg-white/10 transition-colors ">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="text-sm">© 2023 Blog. All rights reserved.</div>
            <div className="flex space-x-6">
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
