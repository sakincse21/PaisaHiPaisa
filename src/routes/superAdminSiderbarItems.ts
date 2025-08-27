import AllTransactions from "@/components/modules/AllRoles/AllTransactions";
import { UpdateProfile } from "@/components/modules/AllRoles/UpdateProfile";
import AdminOverview from "@/pages/Admin/AdminOverview";
import AllUsers from "@/pages/Admin/AllUsers";
import type { ISidebarItem } from "@/types";
import { IRole } from "@/interfaces";
import VerifyUsers from "@/pages/Admin/VerifyUsers";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/Admin/Analytics"))

export const superAdminSiderbarItems: ISidebarItem[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Verify Users",
        url: "/super_admin/verify-users",
        component: VerifyUsers,
      },
      {
        title: "Manage Users",
        url: "/super_admin/manage-users",
        component: (() => AllUsers({role:IRole.USER}) ),
      },
      {
        title: "Manage Agents",
        url: "/super_admin/manage-agents",
        component: (() => AllUsers({role:IRole.AGENT})),
      },
      {
        title: "Manage Admins",
        url: "/super_admin/manage-admin",
        component: (() => AllUsers({role:IRole.ADMIN})),
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "All Transactions",
        url: "/super_admin/all-transactions",
        component: AllTransactions,
      },
      {
        title: "Overview",
        url: "/super_admin/overview",
        component: AdminOverview,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Update Profile",
        url: "/super_admin/update-profile",
        component: UpdateProfile,
      }
    ],
  },
  //   {
  //     title: "Profile",
  //     items: [
  //       {
  //         title: "Update Profile",
  //         url: "/agent/update",
  //         component: AddTour,
  //       },
  //     ],
  //   },
];
