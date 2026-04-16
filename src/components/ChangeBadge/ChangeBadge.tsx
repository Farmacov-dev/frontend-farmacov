import { styled } from '@mui/material/styles';                                                            
   
  interface ChangeBadgeProps {                                                                              
    value: number;
    showArrow?: boolean;                                                                                    
  }
                                                                                                            
  const Badge = styled('span')<{ positive: boolean }>(({ positive }) => ({                                  
    display: 'inline-flex',
    alignItems: 'center',                                                                                   
    gap: '2px',   
    fontSize: '12px',
    fontWeight: 500,                                                                                        
    fontFamily: 'Inter, sans-serif',
    color: positive ? '#16A34A' : '#DC2626',                                                                
  }));            

  const ChangeBadge = ({ value, showArrow = true }: ChangeBadgeProps) => {                                  
    const positive = value >= 0;
    const arrow = positive ? '↑' : '↓';                                                                     
                                                                                                            
    return (
      <Badge positive={positive}>                                                                           
        {positive ? '+' : ''}{value}%{showArrow && ` ${arrow}`}
      </Badge>                                                                                              
    );
  };                                                                                                        
                  
  export default ChangeBadge;