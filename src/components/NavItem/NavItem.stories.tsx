import type { Meta, StoryObj } from '@storybook/react-vite';
  import { LayoutDashboard, BarChart2 } from 'lucide-react';                                    
  import NavItem from './NavItem';                                                              
   
  const meta: Meta<typeof NavItem> = {                                                          
    title: 'Components/NavItem',                                                              
    component: NavItem,
    tags: ['autodocs'],
  };                                                                                            
   
  export default meta;                                                                          
  type Story = StoryObj<typeof NavItem>;                                                      

  export const Default: Story = {
    render: () => <NavItem label="Dashboard" icon={LayoutDashboard} />,
  };
                                                                                                
  export const Active: Story = {
    render: () => <NavItem label="Dashboard" icon={LayoutDashboard} active />,                  
  };                                                                                          

  export const Collapsed: Story = {
    render: () => <NavItem label="Análisis de síntomas" icon={BarChart2} collapsed />,
  };                                                                                            
   
  export const CollapsedActive: Story = {                                                       
    render: () => <NavItem label="Análisis de síntomas" icon={BarChart2} active collapsed />, 
  };                                   
