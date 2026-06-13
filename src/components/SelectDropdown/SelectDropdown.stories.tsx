import { useState } from 'react';                                                                                                   
  import type { Meta, StoryObj } from '@storybook/react-vite';
  import SelectDropdown from './SelectDropdown';                                                                                      
                                                                                                                                      
  const meta: Meta<typeof SelectDropdown> = {
    title: 'Components/SelectDropdown',                                                                                               
    component: SelectDropdown,
    tags: ['autodocs'],
  };

  export default meta;
  type Story = StoryObj<typeof SelectDropdown>;
                                                                                                                                      
  const vacunas = ['Cominarty', 'Spikevax', 'Vaxzebria', 'Janssen', 'CoronaVac'];                                                     
                                                                                                                                      
  export const Default: Story = {                                                                                                     
    render: () => {
      const [value, setValue] = useState('');
      return <SelectDropdown options={vacunas} placeholder="Vacuna a comparar" value={value} onChange={setValue} />;
    },                                                                                                                                
  };
                                                                                                                                      
  export const WithValue: Story = {
    render: () => {
      const [value, setValue] = useState('Cominarty');
      return <SelectDropdown options={vacunas} value={value} onChange={setValue} />;
    },                                                                                                                                
  };
                                                                                                                                      
  export const Filters: Story = {
    render: () => {
      const [vacuna, setVacuna] = useState('');
      const [sexo, setSexo] = useState('');                                                                                           
      return (
        <div style={{ display: 'flex', gap: '12px' }}>                                                                                
          <SelectDropdown options={vacunas} placeholder="Vacuna" value={vacuna} onChange={setVacuna} />                               
          <SelectDropdown options={['Masculino', 'Femenino']} placeholder="Sexo" value={sexo} onChange={setSexo} />
        </div>                                                                                                                        
      );          
    },                                                                                                                                
  };              
