import { MdSecurity } from 'react-icons/md';                                                                                           
                                                                                                                                           
  interface LogoMarkProps {
    variant?: 'full' | 'icon';                                                                                                             
  }                                                                                                                                      

  const LogoMark = ({ variant = 'full' }: LogoMarkProps) => (                                                                              
    <div className="inline-flex items-center gap-2.5">
      <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center text-white shrink-0">                            
        <MdSecurity size={20} />                                                                                                         
      </div>                                                                                                                               
      {variant === 'full' && (                                                                                                           
        <div className="flex flex-col">                                                                                                    
          <span className="text-base font-bold font-[Inter,sans-serif] text-gray-900 leading-tight">                                     
            Farmacov                                                                                                                       
          </span>
          <span className="text-[11px] font-normal font-[Inter,sans-serif] text-gray-500 leading-tight">                                   
            Portal Ejecutivo                                                                                                               
          </span>
        </div>                                                                                                                             
      )}                                                                                                                                 
    </div>
  );                                                                                                                                       
   
  export default LogoMark;        