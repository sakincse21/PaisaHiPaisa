import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import { DotPattern } from "./components/ui/shadcn-io/dot-pattern";

function App() {
  return (
    <div className="min-h-screen w-screen container mx-auto">
      <CommonLayout>
        <DotPattern
          className="fixed inset-0 w-full h-full text-accent-foreground opacity-35 z-0"
          width={20}
          height={20}
          glow={true}
        />
        <Outlet />
      </CommonLayout>
    </div>
  );
}

export default App;
