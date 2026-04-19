import type { Meta, StoryObj } from '@storybook/react-vite';                                                                             
  import { MdDashboard, MdBarChart } from 'react-icons/md';
  import NavItem from './NavItem';                                                                                                         
                                                                                                                                         
  const meta: Meta<typeof NavItem> = {                                                                                                     
    title: 'Components/NavItem',                                                                                                         
    component: NavItem,
    tags: ['autodocs'],
  };                                                                                                                                       
   
  export default meta;                                                                                                                     
  type Story = StoryObj<typeof NavItem>;                                                                                                 

  export const Default: Story = {
    render: () => <NavItem label="Dashboard" icon={MdDashboard} />,
  };

  export const Active: Story = {                                                                                                           
    render: () => <NavItem label="Dashboard" icon={MdDashboard} active />,
  };                                                                                                                                       
                                                                                                                                         
  export const Collapsed: Story = {
    render: () => <NavItem label="Análisis de síntomas" icon={MdBarChart} collapsed />,
  };                                                                                                                                       
   
  export const CollapsedActive: Story = {                                                                                                  
    render: () => <NavItem label="Análisis de síntomas" icon={MdBarChart} active collapsed />,                                           
  };                                                                                                                                       
   