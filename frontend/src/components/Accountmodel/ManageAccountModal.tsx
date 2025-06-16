'use client';
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Camera } from "lucide-react";
import { useRef } from "react";

interface ManageAccountModalProps {
  open: boolean;
  onClose: () => void;
  user: {
    username: string;
    email: string;
    avatar?: string;
  };
}

const ManageAccountModal: React.FC<ManageAccountModalProps> = ({ open, onClose, user }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Uploading avatar:", file);
      // You can upload to server or update local state
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        {/* Custom Blur Overlay */}
        <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-md z-40" />

        {/* Dialog Content */}
        <DialogContent className="max-w-3xl bg-black/90 text-white border border-white/10 backdrop-blur-xl rounded-xl p-6 space-y-6 z-50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Profile Details</DialogTitle>
          </DialogHeader>

          {/* Avatar */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative w-28 h-28">
              <Image
                src={user.avatar || "https://github.com/shadcn.png"}
                alt="Avatar"
                className="rounded-full object-cover border-2 border-white shadow-md text-center items-center "
                fill
              />
              <label htmlFor="avatarUpload" className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer">
                <Camera className="w-4 h-4 text-orange-500" />
                <input
                  id="avatarUpload"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Username Section */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">

            <p className="text-sm text-slate-500 font-bold"> Username : &nbsp; <span className="text-sm text-slate-300 font-semi-bold">{user.username}</span></p>
            <Button size="sm" variant="ghost" className="text-blue-400 text-xs">
              Update Username
            </Button>
          </div>

          {/* Email Section */}
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="text-sm text-zinc-400">Email Address</span>
            <div className="flex items-center gap-2">
              <span className="text-sm truncate">{user.email}</span>
              <span className="text-xs bg-zinc-700 px-2 py-0.5 rounded">Primary</span>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ManageAccountModal;
