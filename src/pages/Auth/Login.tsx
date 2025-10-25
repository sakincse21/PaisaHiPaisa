import Logo from "@/assets/icons/logo";
import { LoginForm } from "@/components/modules/Auth/LoginForm";
import { DotPattern } from "@/components/ui/shadcn-io/dot-pattern";

const Login = () => {
  return (
    <div className="bg-transparent flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <DotPattern
        className="fixed inset-0 w-full h-full text-accent-foreground opacity-55 dark:opacity-15 z-0"
        width={20}
        height={20}
        // glow={true}
      />
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href={"/"}
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Logo />
          </div>
          PaisaHiPaisa
        </a>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
