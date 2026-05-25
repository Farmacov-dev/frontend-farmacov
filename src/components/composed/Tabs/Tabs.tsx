export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex border-b border-stroke-light w-full">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 font-inter text-sm font-medium transition-colors border-b-2 
            ${activeTab === tab.id 
              ? "border-[#5B84E9] text-[#5B84E9]" 
              : "border-transparent text-slate-500 hover:text-dark hover:border-slate-300"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}