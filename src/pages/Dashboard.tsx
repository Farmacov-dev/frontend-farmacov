import { useState } from "react";
  import { FaChartBar, FaSyringe, FaClipboardList } from "react-icons/fa";
  import Sidebar from "../components/Sidebar/Sidebar";                                          
  import PageHeader from "../components/PageHeader/PageHeader";                                 
  import KpiCard from "../components/KpiCard/KpiCard";                                          
  import ChartCard from "../components/charts/ChartCard";                                       
  import Button from "../components/primary/Button/Button";
  import ComparisonModal from "../components/composed/ComparisonModal/ComparisonModal";         
                                                                                                
  const sidebarItems = [
    { key: "dashboard", label: "Dashboard", icon: FaChartBar, onClick: () => {} },              
    { key: "analisis", label: "Análisis de síntomas", icon: FaChartBar, onClick: () => {} },    
    { key: "catalogo", label: "Catálogo de vacunas", icon: FaSyringe, onClick: () => {} },      
    { key: "anotaciones", label: "Anotaciones", icon: FaClipboardList, onClick: () => {} },     
  ];                                                                                            
                  
  const kpis = [                                                                                
    { title: "Total de síntomas graves", value: "1,247", change: 12, color: "#F97316" },
    { title: "Vacunas analizadas", value: "12", change: 0.43, color: "#3B82F6" },               
    { title: "Pacientes monitoreados", value: "45,895", change: 8, color: "#22C55E" },          
    { title: "Tasa de incidencia", value: "2.7%", change: -0.3, color: "#A855F7" },             
  ];                                                                                            
                                                                                                
  const chartData = [                                                                           
    { label: "Miocarditis", value: 65 },
    { label: "Anafilaxia", value: 64 },                                                        
    { label: "Trombosis", value: 57 },                                                         
    { label: "Parálisis", value: 50 },
    { label: "Gastritis", value: 21 },                                                          
  ];              
                                                                                                
  const vaccines = ["Cominarty", "Spikevax", "Vaxzebria", "Janssen", "CoronaVac"];              
  
  const Dashboard = () => {                                                                     
    const [collapsed, setCollapsed] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);                                          
  
    return (                                                                                    
      <div className="flex h-screen bg-[#F5F7FA]">
        <Sidebar                                                                                
          items={sidebarItems}
          activeItem="dashboard"                                                                
          collapsed={collapsed}                                                                 
          onToggleCollapse={() => setCollapsed(!collapsed)}
          onLogoutClick={() => console.log("logout")}                                           
          userName="Caro Ramirez"                                                               
          userRole="Director de finanzas"
        />                                                                                      
                  
        <main className="flex flex-1 flex-col p-6 overflow-y-auto gap-6 min-h-0">                           
          <div className="flex items-start justify-between">
            <PageHeader                                                                         
              title="Titulo del Dashboard y breve descripción"
              description="Descripción o espacio adicional"                                     
              lastUpdated="05 de marzo 2026"                                                    
            />                                                                                  
            <Button variant="primary" onClick={() => setModalOpen(true)}>                       
              + Nueva Comparacion                                                               
            </Button>
          </div>                                                                                
                  
          <div className="grid grid-cols-4 gap-4">                                              
            {kpis.map((kpi) => (
              <KpiCard                                                                          
                key={kpi.title}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}                                                             
                color={kpi.color}
              />                                                                                
            ))}   
          </div>

            <div className="grid grid-cols-2 gap-4 overflow-hidden">                                            
            <ChartCard data={chartData} />
            <ChartCard data={chartData} />                                                      
          </div>  
        </main>

        <ComparisonModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}                                                   
          onCompare={(a, b) => {
            console.log("Comparar:", a, b);                                                     
            setModalOpen(false);                                                                
          }}
          vaccines={vaccines}                                                                   
        />        
      </div>
    );
  };

  export default Dashboard;                         