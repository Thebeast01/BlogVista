'use client'
import Link from "next/link"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { sidebarLinks } from "@/constants"
import { Ham, Menu } from "lucide-react"
const MobileNav = () => {
  const pathname = usePathname()
  return (
    <section className="w-full max-w-[264px] ">

      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-background py-4 px-6">
          <Link
            href={"/"}
            className="flex items-center gap-2"
          >
            <p className="text-[26px] text-primary font-bold">VibeTrails</p>
          </Link>
          <div className="flex flex-col w-[calc(100vh-72px)] justify-between overflow-y-auto">
            <SheetClose asChild className="text-primary">
              <section className="flex h-full flex-col gap-6 text-primary pt-16 px-3">
                {
                  sidebarLinks.map((items) => {
                    const isActive = pathname === items.route
                    return (
                      <SheetClose asChild key={items.route}>
                        <Link
                          href={items.route}
                          key={items.label}
                          className={cn("flex  gap-4 items-center p-4 rounded-lg  max-w-54  w-full ", {
                            "text-accent": isActive,
                          })}
                        >
                          <p className=" text-foreground font-semibold">{items.label}</p>
                        </Link>
                      </SheetClose>
                    )
                  }
                  )

                }
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}
export default MobileNav
