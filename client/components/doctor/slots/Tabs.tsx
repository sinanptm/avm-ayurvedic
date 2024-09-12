import { Days } from "@/types";
import { Tabs } from "@/components/ui/tabs-v2";
import TabContent from "./TabContent";

export default function TabSection() {
  const tabs = Object.values(Days).map((day) => ({
    title: day,
    value: day,
    content: (
      <div>
        <TabContent day={day} /> 
      </div>
    ),
  }));

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Manage Your Slots</h1>
      <Tabs tabs={tabs} />
    </div>
  );
}

