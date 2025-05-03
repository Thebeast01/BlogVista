"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { logout } from "@/lib/store/features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ManageAccountModal from "../Accountmodel/ManageAccountModal";
import { RootState } from "@/lib/store/store";
import { ThemeSwitcher } from "../Theme/ThemeSwitcher";

export const AppBar = () => {
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/readpost", label: "Read" },
    { path: "/createpost", label: "Write" },
    { path: "/about", label: "About" },
  ];



  const handleLogout = () => {
    dispatch(logout());
  };
  console.log("user", user);

  return (
    <div className="fixed w-full backdrop-blur-2xl text-primary flex items-center z-[50]  justify-between text-lg font-mono px-8 py-4">
      <div>
        <h1 className="text-2xl text-inherit">{user?.username}</h1>
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
            <ThemeSwitcher />
            <Button onClick={() => router.push('/login')} variant="outline" className="hover:bg-foreground hover:text-background text-foreground border-foreground">
              Login
            </Button>
            <Button onClick={() => router.push('/register')}>Register</Button>
          </>
        ) : (
          <>
            <ThemeSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.avatar} alt={user?.username} />
                  <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-zinc-900 border border-zinc-800 text-[var(--primary)] rounded-md shadow-xl p-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} alt={user?.username} />
                    <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="font-semibold text-primary">{user?.username || "Anonymous"}</div>
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
                avatar: user?.avatar,
              }}
            />
          </>
        )}
      </div>

    </div>
  );
};
