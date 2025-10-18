import Logo from "@/assets/icons/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useNavigate } from "react-router";
import { ModeToggle } from "../ui/mode-toggle";
import { authApi, useLogoutMutation} from "@/redux/features/Auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { useUserInfoQuery } from "@/redux/features/User/user.api";

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  
  const navigationLinks = [
    { href: "/", label: "Home", },
    { href: "/features", label: "Features", },
    { href: "/faq", label: "FAQ", },
    { href: "/about", label: "About", },
    { href: "/contact-us", label: "Contact Us", },
    { href: `/${(data?.data?.role as string)?.toLowerCase() || ''}`, label: `${(data?.data?.role as string)?'Dashboard':''}` },
  ];

  const handleLogout = () => {
    logout(undefined);
    dispatch(authApi.util.resetApiState());
    navigate('/login',{replace:true})
  };

  console.log(data?.data?.email);
  
  return (
    <header className="px-4 md:px-6 sticky top-0 bg-background py-2">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <Link to={link.href} className="py-1.5">
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to={"/"}>
            <div className="flex items-center justify-around gap-2">
              <Logo /> <span className="font-semibold text-xxl">PaisaHiPaisa</span>
            </div>
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-4">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          {data?.data?.email ? (
            <Button
              variant={"destructive"}
              size={"sm"}
              className="text-sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Link to={"/login"}>
              <Button variant="ghost" size="sm" className="text-sm">
                Login
              </Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
