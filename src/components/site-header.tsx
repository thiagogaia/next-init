import Link from "next/link"

// import { Icons } from "@/components/icons"
// import { ModeSwitcher } from "@/components/mode-switcher"
import { Button } from "./ui/button"
import { ModeSwitcher } from "./mode-switcher"
import { Icons } from "./icons"


export function SiteHeader() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full  backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            
            <nav className="flex items-center">
              
              <ModeSwitcher />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}