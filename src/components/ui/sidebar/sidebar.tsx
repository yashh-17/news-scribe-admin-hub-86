
import * as React from "react"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-context"
import { SidebarDesktop } from "./sidebar-desktop"
import { SidebarMobile } from "./sidebar-mobile"

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <SidebarMobile 
          openMobile={openMobile} 
          setOpenMobile={setOpenMobile}
          side={side}
          {...props}
        >
          {children}
        </SidebarMobile>
      )
    }

    return (
      <SidebarDesktop
        ref={ref}
        state={state}
        variant={variant}
        collapsible={collapsible}
        side={side}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {children}
      </SidebarDesktop>
    )
  }
)
Sidebar.displayName = "Sidebar"
