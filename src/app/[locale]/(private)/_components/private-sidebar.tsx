"use client";

import {
  Bell,
  CreditCard,
  HomeIcon,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/app/_components/ui/sidebar";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { useSession } from "@/app/_hooks/use-session";
import { useScopedI18n } from "@/packages/locales/client";

export const PrivateSidebar = ({ children }: { children: React.ReactNode }) => {
  const t = useScopedI18n("common");

  const tMenu = useScopedI18n("menu");

  const menuItems = [
    {
      name: tMenu("dashboard"),
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: tMenu("features"),
      href: "/features",
      icon: HomeIcon,
    },
  ];

  const userMenuItems = [
    {
      name: tMenu("settings"),
      href: "/settings",
      icon: Settings,
    },
    {
      name: tMenu("billing"),
      href: "/billing",
      icon: CreditCard,
    },
    {
      name: tMenu("notifications"),
      href: "/notifications",
      icon: Bell,
    },
  ];

  const router = useRouter();

  const { data, isLoading, logout } = useSession();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  onClick={() => handleNavigation(item.href)}
                  className="w-full justify-start"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {isLoading ? (
                    <Skeleton className="h-8 w-8" />
                  ) : (
                    <Button variant="ghost" className="w-full justify-start">
                      <Avatar className="mr-2 h-6 w-6">
                        <AvatarImage
                          src={data?.user?.avatar ?? undefined}
                          alt="@username"
                        />
                        <AvatarFallback>
                          {data?.user?.username.charAt(0).toLocaleUpperCase()}
                          {data?.user?.username.charAt(2).toLocaleUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{isLoading ? ".." : data?.user?.username}</span>
                    </Button>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  {userMenuItems.map((item) => (
                    <DropdownMenuItem
                      key={item.name}
                      onClick={() => handleNavigation(item.href)}
                      className="cursor-pointer"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <main className="flex-1 overflow-y-auto container px-2 py-4 w-full max-w-screen-lg">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
