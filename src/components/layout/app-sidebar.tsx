import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "@/assets/icons/logo"
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/Auth/auth.api";
import { getSidebarItems } from "@/lib/getSidebarItems";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hook";
import { useNavigate } from "react-router";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);

  console.log(userData?.data?.role,"from sidebar");
  
  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };

  
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    logout(undefined);
    dispatch(authApi.util.resetApiState());
    navigate('/',{replace:true})
  };
  console.log(data);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <h2 className="m-2 mt-4 text-lg font-semibold">{userData?.data?.role} Dashboard</h2>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <Button
              variant={"outline"}
              size={'lg'}
              className="text-sm m-4"
              onClick={handleLogout}
            >
              Logout
            </Button>
    </Sidebar>
  )
}
