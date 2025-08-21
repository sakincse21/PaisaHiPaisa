import { useUserInfoQuery } from "@/redux/features/Auth/auth.api";
import type { TRole } from "@/types/user";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const WithAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    console.log(requiredRole);

    const { data, isLoading } = useUserInfoQuery(undefined);

    if (!isLoading && !data?.data?.email) {
      return <Navigate to={"/login"} />;
    }
    if (!isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to={"/unauthorized"} />;
    }
    return <Component />;
  };
};
