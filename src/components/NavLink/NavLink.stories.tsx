import type { Meta, StoryObj } from '@storybook/react-vite';                                                                        
  import NavLink from './NavLink';                                                                                                    
                                                                                                                                      
  const meta: Meta<typeof NavLink> = {
    title: 'Components/NavLink',
    component: NavLink,                                                                                                               
    tags: ['autodocs'],
  };                                                                                                                                  
                  
  export default meta;
  type Story = StoryObj<typeof NavLink>;

  export const Default: Story = {
    render: () => <NavLink label="Sobre nosotros" />,
  };                                                                                                                                  
   
  export const Active: Story = {                                                                                                      
    render: () => <NavLink label="Planes" active />,
  };

  export const Group: Story = {
    render: () => (
      <div style={{ display: 'flex', gap: '24px' }}>                                                                                  
        <NavLink label="Sobre nosotros" />
        <NavLink label="Planes" active />                                                                                             
        <NavLink label="Features" />                                                                                                  
      </div>
    ),                                                                                                                                
  };         