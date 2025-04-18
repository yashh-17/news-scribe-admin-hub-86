
import * as React from "react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { SIDEBAR_WIDTH_MOBILE } from "./types"

export const SidebarMobile = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    side?: "left" | "right";
  }
>(({ openMobile, setOpenMobile, side = "left", children, ...props }, ref) => {
  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
      <SheetContent
        data-sidebar="sidebar"
        data-mobile="true"
        className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
          } as React.CSSProperties
        }
        side={side}
      >
        <div className="flex h-full w-full flex-col">{children}</div>
      </SheetContent>
    </Sheet>
  )
})
SidebarMobile.displayName = "SidebarMobile"
