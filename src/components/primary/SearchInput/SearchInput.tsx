// src/components/primary/SearchInput/SearchInput.tsx
// angel

import searchSvg from "../../../assets/icons/search.svg";

// este componente no tiene variantes
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Busqueda",
  className = "",
}: SearchInputProps) {
  return (
    <div className={`
      flex w-full max-w-[1090px]
      px-[24px] py-[12px] gap-[10px]
      items-center rounded-card bg-white
      shadow-search
      ${className}
    `}>
      <img
        src={searchSvg}
        alt=""
        aria-hidden="true"
        className="w-[20px] h-[20px] flex-shrink-0"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          flex-1 border-none outline-none bg-transparent
          text-negro font-inter text-[16px] font-medium leading-[24px]
          placeholder:text-negro placeholder:font-medium
        "
      />
    </div>
  );
}