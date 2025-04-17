'use client'
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Model } from "../model/model"

export const AppBar = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<Boolean>(false)
  const [currentModel, setCurrentModel] = useState<String>("")

  const menuItems = [
    {
      path: "/",
      label: "Home"
    },
    {
      path: "/read",
      label: "Read"
    }, {
      path: "/write",
      label: "Write"
    }, {
      path: "/about",
      label: "About"
    },
  ]

  const handleOpenModal = (type: string) => {
    setCurrentModel(type);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentModel("");
  }

  return (
    <div className="relative backdrop-blur-2xl text-white flex items-center justify-between text-lg font-mono px-8 py-4">
      <div>
        <h1 className="text-2xl text-inherit">Memoir</h1>
      </div>
      <div className="flex items-center gap-4 text-2xl">
        {
          menuItems &&
          menuItems.map((item, index) => (
            <Button onClick={() => router.push(item?.path)} variant={'ghost'} key={index}>{item?.label}</Button>
          ))
        }
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={() => handleOpenModal("login")} variant={"outline"}>Login</Button>
        <Button onClick={() => handleOpenModal("register")}>Register</Button>
      </div>
      {showModal && <Model x={currentModel} onClose={handleCloseModal} />}
    </div>
  )
}
