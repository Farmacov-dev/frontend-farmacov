import { styled } from '@mui/material/styles';                                           
  import SecurityIcon from '@mui/icons-material/Security';                                 
                                                                                           
  interface LogoMarkProps {
    variant?: 'full' | 'icon';
  }                                                                                        
  
  const Wrapper = styled('div')({                                                          
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
  });                                                                                      
  
  const IconWrapper = styled('div')({                                                      
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: '#6366F1',
    display: 'flex',                                                                       
    alignItems: 'center',
    justifyContent: 'center',                                                              
    color: '#fff',
    flexShrink: 0,
  });

  const TextWrapper = styled('div')({                                                      
    display: 'flex',
    flexDirection: 'column',                                                               
  });             

  const Name = styled('span')({
    fontSize: '16px',
    fontWeight: 700,                                                                       
    fontFamily: 'Inter, sans-serif',
    color: '#111827',                                                                      
    lineHeight: 1.2,
  });

  const Subtitle = styled('span')({                                                        
    fontSize: '11px',
    fontWeight: 400,                                                                       
    fontFamily: 'Inter, sans-serif',
    color: '#6B7280',
    lineHeight: 1.2,
  });                                                                                      
  
  const LogoMark = ({ variant = 'full' }: LogoMarkProps) => (                              
    <Wrapper>     
      <IconWrapper>
        <SecurityIcon fontSize="small" />
      </IconWrapper>                                                                       
      {variant === 'full' && (
        <TextWrapper>                                                                      
          <Name>Farmacov</Name>
          <Subtitle>Portal Ejecutivo</Subtitle>
        </TextWrapper>                                                                     
      )}
    </Wrapper>                                                                             
  );              

  export default LogoMark;