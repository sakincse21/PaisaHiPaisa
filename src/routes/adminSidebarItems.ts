import AllTransactions from "@/components/modules/AllRoles/AllTransactions";
import { UpdateProfile } from "@/components/modules/AllRoles/UpdateProfile";
import AdminOverview from "@/pages/Admin/AdminOverview";
import AllUsers from "@/pages/Admin/AllUsers";
import ApproveUsers from "@/pages/Admin/ApproveUsers";
import type { ISidebarItem } from "@/types";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/Admin/Analytics"))

export const adminSiderbarItems: ISidebarItem[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Approve Users",
        url: "/admin/approve-users",
        component: ApproveUsers,
      },
      {
        title: "All Users",
        url: "/admin/all-users",
        component: AllUsers,
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
