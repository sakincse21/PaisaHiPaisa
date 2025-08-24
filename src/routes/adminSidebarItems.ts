import AllTransactions from "@/components/modules/AllRoles/AllTransactions";
import CheckWallet from "@/components/modules/AllRoles/CheckWallet";
import SendMoney from "@/components/modules/AllRoles/SendMoney";
import { UpdateProfile } from "@/components/modules/AllRoles/UpdateProfile";
import AddMoneyRequest from "@/pages/Agent/AddMoneyRequest";
import AgentOverview from "@/pages/Agent/AgentOverview";
import CashIn from "@/pages/Agent/CashIn";
import type { ISidebarItem } from "@/types";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/Admin/Analytics"))

export const adminSiderbarItems: ISidebarItem[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Add Money Requests",
        url: "/agent/add-money-requests",
        component: AddMoneyRequest,
      },
      {
        title: "Cash In",
        url: "/agent/cash-in",
        component: CashIn,
      },
      {
        title: "Send Money",
        url: "/agent/send-money",
        component: SendMoney,
      },
    ],
  },
  {
    title: "Wallet",
    items: [
      {
        title: "Check Wallet",
        url: "/agent/check-wallet",
        component: CheckWallet,
      },
      {
        title: "All Transactions",
        url: "/agent/all-transactions",
        component: AllTransactions,
      },
      {
        title: "Overview",
        url: "/agent/overview",
        component: AgentOverview,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Update Profile",
        url: "/agent/update-profile",
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
