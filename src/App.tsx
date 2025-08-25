import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import { DotPattern } from "./components/ui/shadcn-io/dot-pattern";

function App() {
  return (
    <CommonLayout>
      <DotPattern
        className="absolute inset-0 text-neutral-400/40"
        width={20}
        height={20}
        glow={true}
      />
      <Outlet />
    </CommonLayout>
  );
}

export default App;
