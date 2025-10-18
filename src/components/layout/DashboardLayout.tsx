import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { ModeToggle } from "../ui/mode-toggle";
import { DotPattern } from "../ui/shadcn-io/dot-pattern";

export default function DashboardLayout() {
  return (
    <div className="w-screen min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="relative">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="ml-auto right-0">
              <ModeToggle />
            </div>
          </header>
          <div className="w-full h-full flex flex-1 flex-col items-center justify-center gap-4 p-4">
            <DotPattern
              className="fixed inset-0 w-full h-full text-accent-foreground opacity-35 z-0"
              width={20}
              height={20}
              glow={true}
            />
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
