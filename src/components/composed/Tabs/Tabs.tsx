// src/components/composed/Tabs/Tabs.tsx
// angel

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
    <div 
      role="tablist" 
      aria-label="Navegación de secciones"
      className="flex border-b border-stroke w-full"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-6 py-3 font-inter text-sm font-medium transition-colors border-b-2
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
              ${isActive 
                ? "border-primary text-primary" 
                : "border-transparent text-muted hover:text-dark hover:border-stroke-dark"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}