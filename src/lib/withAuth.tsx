import { useUserInfoQuery } from "@/redux/features/User/user.api";
import type { TRole } from "@/types/user";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";

export const WithAuth = (Component: ComponentType, requiredRoles?: TRole[]) => {
  return function AuthWrapper() {
    // console.log(requiredRoles);

    const { data, isLoading } = useUserInfoQuery(undefined);
    const location = useLocation();

    if (!isLoading && !data?.data?.email) {
      // return <Navigate to={"/login"} />;
      return (
        <Navigate to="/login" state={{ from: location.pathname }} replace />
      );
    }
    if (!isLoading && !requiredRoles?.includes(data?.data?.role)) {
      return <Navigate to={"/unauthorized"} />;
    }
    return <Component />;
  };
};
