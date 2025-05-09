"use client";

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Reset Password
        </h1>

        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"    
            className=" text-black p-3 border border-gray-3 00 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
