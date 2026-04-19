import { useState, useRef, useEffect } from 'react';
  import { MdKeyboardArrowDown } from 'react-icons/md';

  interface SelectDropdownProps {
    options: string[];
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
  }

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
      <div ref={ref} className="relative inline-block min-w-[180px] font-[Inter,sans-serif]">
        <div
          onClick={() => setOpen(o => !o)}
          className={`flex items-center justify-between px-3 py-2 border rounded-md cursor-pointer text-sm select-none ${
            open
              ? 'border-indigo-500 bg-indigo-500 text-white'
              : 'border-gray-300 bg-white text-gray-700'
          }`}
        >
          {value || placeholder}
          <MdKeyboardArrowDown size={18} />
        </div>
        {open && (
          <ul className="absolute top-[calc(100%+4px)] left-0 right-0 m-0 py-1 list-none bg-white border border-gray-200 rounded-md
  shadow-md z-[100]">
            {options.map(opt => (
              <li
                key={opt}
                onClick={() => { onChange?.(opt); setOpen(false); }}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  opt === value ? 'text-indigo-500 font-semibold' : 'text-gray-700 font-normal'
                }`}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  export default SelectDropdown;