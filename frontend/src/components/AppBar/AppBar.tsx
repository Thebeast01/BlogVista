"use client";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Model } from "../model/model";
import { useAppSelector } from "@/lib/hooks";
import { logout } from "@/lib/store/features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ManageAccountModal from "../Accountmodel/ManageAccountModal";

export const AppBar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentModel, setCurrentModel] = useState<string>("");
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.auth.user);
  console.log("User from store", user)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  console.log("is Authenticated", isAuthenticated);
  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/read", label: "Read" },
    { path: "/createpost", label: "Write" },
    { path: "/about", label: "About" },
  ];

  const handleOpenModal = (type: string) => {
    setCurrentModel(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentModel("");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="fixed w-full backdrop-blur-2xl text-white flex items-center  justify-between text-lg font-mono px-8 py-4">
      <div>
        <h1 className="text-2xl text-inherit">Memoir</h1>
      </div>

      <div className="flex items-center gap-4 text-2xl">
        {menuItems.map((item, index) => (
          <Button
            onClick={() => router.push(item.path)}
            variant="ghost"
            key={index}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <Button onClick={() => handleOpenModal("login")} variant="outline">
              Login
            </Button>
            <Button onClick={() => handleOpenModal("register")}>Register</Button>
          </>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} alt={user?.username} />
                  <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-zinc-900 border border-zinc-800 text-white rounded-md shadow-xl p-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} alt={user?.username} />
                    <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="font-semibold text-white">{user?.username || "Anonymous"}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <DropdownMenuItem onClick={() => setShowProfileModal(true)} className="cursor-pointer px-3 py-2 rounded-md hover:bg-zinc-800 transition">
                    <span className="text-sm">Manage account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer px-3 py-2 rounded-md hover:bg-zinc-800 text-red-500 transition">    <span className="text-sm">Sign out</span></DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <ManageAccountModal
              open={showProfileModal}
              onClose={() => setShowProfileModal(false)}
              user={{
                username: user?.username || "",
                email: user?.email || "",
                avatar: user?.avatar || "",
              }}
            />
          </>
        )}
      </div>

      {showModal &&
        <Model x={currentModel} onClose={handleCloseModal} />
      }
    </div>
  );
};
