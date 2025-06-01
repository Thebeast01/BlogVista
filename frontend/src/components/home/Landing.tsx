"use client"
import { ArrowRight } from "lucide-react"
import { Posts } from "../posts/Posts"
import Link from "next/link"
export const Landing = () => {

  return (
    <div className="bg-background text-primary">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 text-foreground">Thoughts & Ideas</h1>
          <p className=" text-primary text-xl mb-8 max-w-2xl mx-auto">
            Exploring life&apos;s complexities through words. A collection of stories, insights, and reflections.
          </p>
<Link href="/readpost">
            <button className="border-1 border-[var(--border)] rounded-md px-8 py-3 flex items-center mx-auto hover:bg-primary text-foreground hover:text-card transition-colors cursor-pointer">
            Start Reading <ArrowRight className="ml-2" />
          </button>
</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Featured Posts</h2>
        <Posts />
      </div>

     
 
 <div className="border-t border-border bg-muted/30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className="text-center">
      <h2 className="text-4xl font-bold text-foreground mb-4">
        ✍️ Have a Story to Tell?
      </h2>
      <p className="text-muted-foreground text-lg mb-8">
        Join the VibeTrails community and share your unique voice with the world.
      </p>
      <Link href="/createpost">
        <button className="inline-flex items-center gap-2 bg-foreground text-muted px-6 py-3 rounded-xl hover:bg-primary hover:text-background transition-colors text-lg font-medium">
          Start Writing <ArrowRight className="w-5 h-5" />
        </button>
      </Link>
    </div>
  </div>
</div>


      <footer className="border-t border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="text-sm">© 2025 Blog. All rights reserved.</div>
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
