import { styled } from '@mui/material/styles';

  interface EffectivenessBadgeProps {
    value: number;
  }

  const getTierColor = (value: number) => {                                                
    if (value >= 90) return '#16A34A';
    if (value >= 75) return '#6366F1';                                                     
    if (value >= 65) return '#D97706';
    return '#DC2626';                                                                      
  };
                                                                                           
  const Wrapper = styled('span')<{ color: string }>(({ color }) => ({                      
    display: 'inline-flex',
    alignItems: 'center',                                                                  
    gap: '5px',   
    fontSize: '13px',
    fontWeight: 700,
    fontFamily: 'Inter, sans-serif',
    color,                                                                                 
  }));
                                                                                           
  const Dot = styled('span')<{ color: string }>(({ color }) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: color,                                                                
    flexShrink: 0,
  }));                                                                                     
                  
  const EffectivenessBadge = ({ value }: EffectivenessBadgeProps) => {
    const color = getTierColor(value);
                                                                                           
    return (
      <Wrapper color={color}>                                                              
        <Dot color={color} />
        {value}%
      </Wrapper>
    );
  };

  export default EffectivenessBadge;