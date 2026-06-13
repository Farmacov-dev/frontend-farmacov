import type { Meta, StoryObj } from '@storybook/react-vite';                                                                        
  import PageHeader from './PageHeader';                                                                                              
                                                                                                                                      
  const meta: Meta<typeof PageHeader> = {                                                                                             
    title: 'Components/PageHeader',
    component: PageHeader,
    tags: ['autodocs'],
  };
                                                                                                                                      
  export default meta;
  type Story = StoryObj<typeof PageHeader>;                                                                                           
                  
  export const Default: Story = {
    render: () => (
      <PageHeader
        title="Titulo del Dashboard y breve descripción" 
        description="Descripción o espacio adicional"                                                                                 
        lastUpdated="05 de marzo 2026"                                                                                                
      />                                                                                                                              
    ),                                                                                                                                
  };              

  export const WithoutDescription: Story = {
    render: () => (
      <PageHeader
        title="Catálogo de vacunas"                                                                                                   
        lastUpdated="05 de marzo 2026"
      />                                                                                                                              
    ),            
  };

  export const TitleOnly: Story = {
    render: () => (
      <PageHeader title="Anotaciones Personales" />
    ),                                                                                                                                
  };