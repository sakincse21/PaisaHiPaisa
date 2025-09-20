import AgentCharts from "@/components/modules/Agent/AgentCharts"
import Overview from "@/components/modules/AllRoles/Overview"

const AgentOverview = () => {
  return (
    <div className="w-full mx-auto h-full flex flex-col justify-center items-center gap-8">
        <Overview />
        <AgentCharts />
    </div>
  )
}

export default AgentOverview