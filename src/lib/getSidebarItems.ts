// import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { IRole } from "@/constants";
import { adminSiderbarItems } from "@/routes/adminSidebarItems";
import { agentSiderbarItems } from "@/routes/agentSidebarItems";
import { userSiderbarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types/user";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    // case IRole.SUPER_ADMIN:
    //   return [...adminSidebarItems];
    // case role.admin:
    //   return [...adminSidebarItems];
    case IRole.AGENT:
      return [...agentSiderbarItems];
    case IRole.USER:
      return [...userSiderbarItems];
    case IRole.ADMIN:
      return [...adminSiderbarItems];
    default:
      return [];
  }
};