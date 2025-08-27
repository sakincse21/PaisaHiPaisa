import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { IRole } from "@/interfaces";
import { generateRoutes } from "@/lib/generateRoutes";
import { WithAuth } from "@/lib/withAuth";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Unauthorized from "@/pages/Auth/Unauthorized";
import About from "@/pages/Public/About";
import Features from "@/pages/Public/Features";
import type { TRole } from "@/types/user";
import { createBrowserRouter } from "react-router";
import { userSiderbarItems } from "./userSidebarItems";
import { agentSiderbarItems } from "./agentSidebarItems";
import Overview from "@/components/modules/AllRoles/Overview";
import { adminSiderbarItems } from "./adminSidebarItems";
import AgentOverview from "@/pages/Agent/AgentOverview";
import AdminOverview from "@/pages/Admin/AdminOverview";
import { superAdminSiderbarItems } from "./superAdminSiderbarItems";
import Home from "@/pages/Public/Home";
import { Faq } from "@/pages/Public/Faq";
import { Contact } from "@/pages/Public/Contact";
import NotFound from "@/pages/Public/NotFound";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "unauthorized",
        Component: Unauthorized,
      },
      {
        path: "contact-us",
        Component: Contact,
      },
      {
        path: "faq",
        Component: Faq,
      },
      {
        path: "features",
        Component: Features,
      },
      {
        path: "/*",
        Component: NotFound,
      },
    ],
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/admin",
    Component: WithAuth(DashboardLayout, [
      IRole.ADMIN as TRole,
      IRole.SUPER_ADMIN as TRole,
    ]),
    children: [
      {
        index: true,
        Component: AdminOverview,
      },
      ...generateRoutes(adminSiderbarItems),
    ],
  },
  {
    path: "/super_admin",
    Component: WithAuth(DashboardLayout, [
      IRole.ADMIN as TRole,
      IRole.SUPER_ADMIN as TRole,
    ]),
    children: [
      {
        index: true,
        Component: AdminOverview,
      },
      ...generateRoutes(superAdminSiderbarItems),
    ],
  },
  {
    path: "/user",
    Component: WithAuth(DashboardLayout, [IRole.USER as TRole]),
    children: [
      {
        index: true,
        Component: Overview,
      },
      ...generateRoutes(userSiderbarItems),
    ],
  },
  {
    path: "/agent",
    Component: WithAuth(DashboardLayout, [IRole.AGENT as TRole]),
    children: [
      {
        index: true,
        Component: AgentOverview,
      },
      ...generateRoutes(agentSiderbarItems),
    ],
  },
]);
