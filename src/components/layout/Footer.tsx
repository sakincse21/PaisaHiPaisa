import Logo from "@/assets/icons/logo";
import { Mail } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="pt-8 pb-4">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <span className="flex items-center gap-2">
            <Logo />
            <span className="text-[21px] leading-none font-bold tracking-tight">
              PaisaHiPaisa
            </span>
          </span>
          <div className="flex items-center gap-6">
            <Link to={"/"}>
              <span className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                Home
              </span>
            </Link>
            <Link to={"/features"}>
              <span className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                Features
              </span>
            </Link>
            <Link to={"/about"}>
              <span className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                About Us
              </span>
            </Link>
            <Link to={"/contact-us"}>
              <span className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                Contact Us
              </span>
            </Link>
          </div>
        </div>
        <hr className="my-6" />
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row-reverse">
          <a href="mailto:saleheen.sakin@gmail.com">
            <span className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors">
              <Mail className="size-4" />
              saleheen.sakin@gmail.com
            </span>
          </a>
          <p className="text-muted-foreground text-sm">
            © 2025 PaisaHiPaisa, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
