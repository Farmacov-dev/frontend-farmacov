// src/components/primary/SearchInput/SearchInput.tsx
// angel


import styles from "./SearchInput.module.css";
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
    <div className={`${styles.wrapper} ${className}`}>
      <img
        src={searchSvg}
        alt=""
        aria-hidden="true"
        className={styles.icon}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
}