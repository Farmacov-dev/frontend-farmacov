import { styled } from '@mui/material/styles';                                           
  import type { SvgIconComponent } from '@mui/icons-material';                             
                                                                                           
  interface NavItemProps {                                                                 
    label: string;                                                                         
    icon?: SvgIconComponent;                                                               
    active?: boolean;                                                                      
    collapsed?: boolean;
    onClick?: () => void;                                                                  
  }               

  const Wrapper = styled('div')<{ active: boolean }>(({ active }) => ({                    
    display: 'flex',
    alignItems: 'center',                                                                  
    gap: '10px',  
    padding: '8px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: active ? '#6366F1' : 'transparent',                                   
    color: active ? '#fff' : '#374151',
    fontFamily: 'Inter, sans-serif',                                                       
    fontSize: '14px',                                                                      
    fontWeight: active ? 600 : 400,
    transition: 'background-color 0.15s',                                                  
    '&:hover': {  
      backgroundColor: active ? '#6366F1' : '#F3F4F6',                                     
    },
  }));                                                                                     
                  
  const NavItem = ({ label, icon: Icon, active = false, collapsed = false, onClick }:      
  NavItemProps) => (
    <Wrapper active={active} onClick={onClick}>                                            
      {Icon && <Icon fontSize="small" />}
      {!collapsed && label}
    </Wrapper>
  );                                                                                       
  
  export default NavItem;  