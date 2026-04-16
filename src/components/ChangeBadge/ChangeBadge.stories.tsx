import type { Meta, StoryObj } from '@storybook/react-vite';                                              
  import ChangeBadge from './ChangeBadge';                                                                  
                                                                                                            
  const meta: Meta<typeof ChangeBadge> = {
    title: 'Components/ChangeBadge',                                                                        
    component: ChangeBadge,
    tags: ['autodocs'],
  };
                                                                                                            
  export default meta;
  type Story = StoryObj<typeof ChangeBadge>;                                                                
                  
  export const Positive: Story = {
    args: { value: 12 },
  };

  export const Negative: Story = {
    args: { value: -0.3 },
  };                                                                                                        
   
  export const WithoutArrow: Story = {                                                                      
    args: { value: 8, showArrow: false },
  };