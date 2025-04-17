import { ArrowRight } from "lucide-react";

const Page = () => {


  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6">Thoughts & Ideas</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Exploring life's complexities through words. A collection of stories, insights, and reflections.
          </p>
          <button className="border-2 border-black px-8 py-3 flex items-center mx-auto hover:bg-black hover:text-white transition-colors">
            Start Reading <ArrowRight className="ml-2" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((post) => (
            <div key={post} className="border border-black p-6 hover:bg-black hover:text-white transition-colors">
              <p className="text-sm mb-4">December 1, 2023</p>
              <h3 className="text-xl font-bold mb-2">The Art of Minimalism</h3>
              <p className="mb-4">Exploring how less can be more in our daily lives and creative pursuits.</p>
              <a href="#" className="flex items-center">
                Read More <ArrowRight className="ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to the Newsletter</h2>
            <p className="mb-8">Get notified about new posts and updates.</p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border border-black px-4 py-2 focus:outline-none"
              />
              <button className="bg-black text-white px-6 py-2 hover:bg-gray-800">
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
    </ >
  )
}
export default Page;
