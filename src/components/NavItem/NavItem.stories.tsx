import type { Meta, StoryObj } from '@storybook/react-vite';                                                                        
  import DashboardIcon from '@mui/icons-material/Dashboard';
  import BarChartIcon from '@mui/icons-material/BarChart';                                                                            
  import NavItem from './NavItem';                                                                                                    
   
  const meta: Meta<typeof NavItem> = {                                                                                                
    title: 'Components/NavItem',
    component: NavItem,
    tags: ['autodocs'],                                                                                                               
  };
                                                                                                                                      
  export default meta;
  type Story = StoryObj<typeof NavItem>;

  export const Default: Story = {
    render: () => <NavItem label="Dashboard" icon={DashboardIcon} />,
  };                                                                                                                                  
   
  export const Active: Story = {                                                                                                      
    render: () => <NavItem label="Dashboard" icon={DashboardIcon} active />,
  };

  export const Collapsed: Story = {
    render: () => <NavItem label="Análisis de síntomas" icon={BarChartIcon} collapsed />,
  };                                                                                                                                  
   
  export const CollapsedActive: Story = {                                                                                             
    render: () => <NavItem label="Análisis de síntomas" icon={BarChartIcon} active collapsed />,
  };    