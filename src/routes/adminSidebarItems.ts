import AllTransactions from "@/components/modules/AllRoles/AllTransactions";
import { UpdateProfile } from "@/components/modules/AllRoles/UpdateProfile";
import AdminOverview from "@/pages/Admin/AdminOverview";
import AllUsers from "@/pages/Admin/AllUsers";
import type { ISidebarItem } from "@/types";
import { IRole } from "@/constants";
import VerifyUsers from "@/pages/Admin/VerifyUsers";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/Admin/Analytics"))

export const adminSiderbarItems: ISidebarItem[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Verify Users",
        url: "/admin/verify-users",
        component: VerifyUsers,
      },
      {
        title: "Manage Users",
        url: "/admin/manage-users",
        component: (() => AllUsers({role:IRole.USER}) ),
      },
      {
        title: "Manage Agents",
        url: "/admin/manage-agents",
        component: (() => AllUsers({role:IRole.AGENT})),
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "All Transactions",
        url: "/admin/all-transactions",
        component: AllTransactions,
      },
      {
        title: "Overview",
        url: "/admin/overview",
        component: AdminOverview,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Update Profile",
        url: "/admin/update-profile",
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
