import { useState, useRef, useEffect } from 'react';                                                                                
  import { styled } from '@mui/material/styles';                                                                                      
  import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';                                                          
                  
  interface SelectDropdownProps {                                                                                                     
    options: string[];
    placeholder?: string;                                                                                                             
    value?: string;
    onChange?: (value: string) => void;                                                                                               
  }               

  const Wrapper = styled('div')({                                                                                                     
    position: 'relative',
    display: 'inline-block',                                                                                                          
    minWidth: '180px',
    fontFamily: 'Inter, sans-serif',
  });                                                                                                                                 
   
  const Trigger = styled('div')<{ open: boolean }>(({ open }) => ({                                                                   
    display: 'flex',
    alignItems: 'center',                                                                                                             
    justifyContent: 'space-between',
    padding: '8px 12px',
    border: `1px solid ${open ? '#6366F1' : '#D1D5DB'}`,                                                                              
    borderRadius: '6px',
    backgroundColor: open ? '#6366F1' : '#fff',                                                                                       
    color: open ? '#fff' : '#374151',                                                                                                 
    cursor: 'pointer',
    fontSize: '14px',                                                                                                                 
    userSelect: 'none',
  }));                                                                                                                                
   
  const Menu = styled('ul')({                                                                                                         
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,                                                                                                                          
    right: 0,
    margin: 0,                                                                                                                        
    padding: '4px 0',
    listStyle: 'none',
    backgroundColor: '#fff',
    border: '1px solid #E5E7EB',
    borderRadius: '6px',                                                                                                              
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 100,                                                                                                                      
  });                                                                                                                                 
   
  const Option = styled('li')<{ selected: boolean }>(({ selected }) => ({                                                             
    padding: '8px 12px',
    fontSize: '14px',
    color: selected ? '#6366F1' : '#374151',                                                                                          
    fontWeight: selected ? 600 : 400,
    cursor: 'pointer',                                                                                                                
    '&:hover': {  
      backgroundColor: '#F3F4F6',                                                                                                     
    },
  }));                                                                                                                                
                  
  const SelectDropdown = ({ options, placeholder = 'Seleccionar', value, onChange }: SelectDropdownProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);                                                                                         
   
    useEffect(() => {                                                                                                                 
      const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          setOpen(false);                                                                                                             
        }
      };                                                                                                                              
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (                                                                                                                          
      <Wrapper ref={ref}>
        <Trigger open={open} onClick={() => setOpen(o => !o)}>                                                                        
          {value || placeholder}
          <KeyboardArrowDownIcon fontSize="small" />                                                                                  
        </Trigger>
        {open && (                                                                                                                    
          <Menu>  
            {options.map(opt => (
              <Option
                key={opt}                                                                                                             
                selected={opt === value}
                onClick={() => { onChange?.(opt); setOpen(false); }}                                                                  
              >   
                {opt}
              </Option>
            ))}
          </Menu>
        )}                                                                                                                            
      </Wrapper>
    );                                                                                                                                
  };              

  export default SelectDropdown;