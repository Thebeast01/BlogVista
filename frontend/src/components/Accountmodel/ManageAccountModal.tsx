// // components/ManageAccountModal.tsx
// 'use client'

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { useState } from "react"

// type Props = {
//   open: boolean
//   onClose: () => void
//   user: {
//     name: string
//     email: string
//     avatar?: string
//   }
// }

// export default function ManageAccountModal({ open, onClose, user }: Props) {
//   const [name, setName] = useState(user.name)
//   const [email, setEmail] = useState(user.email)

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="bg-blue-400  dark:bg-zinc-900">
//         <DialogHeader>
//           <DialogTitle>Manage Profile</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4">
//           <div>
//             <Label>Name</Label>
//             <Input value={name} onChange={(e) => setName(e.target.value)} />
//           </div>

//           <div>
//             <Label>Email</Label>
//             <Input value={email} onChange={(e) => setEmail(e.target.value)} />
//           </div>

//           <Button className="mt-4 w-full">Save Changes</Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }















'use client';

import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { useRef } from "react";

interface ManageAccountModalProps {
  open: boolean;
  onClose: () => void;
  user: {
    name: string;
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
            src={user.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="rounded-full object-cover border-2 border-white shadow-md"
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
        <span className="text-sm text-zinc-400">Username</span>
        <span className="text-sm">{user.name}</span>
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
        <Button size="sm" variant="ghost" className="mt-2 text-blue-400 text-xs pl-0">
          <Plus className="w-4 h-4 mr-1" /> Add Email
        </Button>
      </div>

      {/* Connected Accounts */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-zinc-400">Connected Accounts</span>
        <Button size="sm" variant="ghost" className="mt-2 text-blue-400 text-xs pl-0">
          <Plus className="w-4 h-4 mr-1" /> Connect Account
        </Button>
      </div>
    </DialogContent>
  </DialogPortal>
</Dialog>
  );
};

export default ManageAccountModal;
