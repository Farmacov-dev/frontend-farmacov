import { styled } from '@mui/material/styles';                                                                                      
                                                                                                                                      
  interface NavLinkProps {                                                                                                            
    label: string;                                                                                                                    
    active?: boolean;
    onClick?: () => void;
  }

  const Link = styled('span')<{ active: boolean }>(({ active }) => ({                                                                 
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',                                                                                                                 
    fontWeight: active ? 600 : 400,
    color: active ? '#6366F1' : '#374151',
    cursor: 'pointer',                                                                                                                
    textDecoration: 'none',
    '&:hover': {                                                                                                                      
      color: '#6366F1',
    },
  }));

  const NavLink = ({ label, active = false, onClick }: NavLinkProps) => (                                                             
    <Link active={active} onClick={onClick}>
      {label}                                                                                                                         
    </Link>       
  );

  export default NavLink;