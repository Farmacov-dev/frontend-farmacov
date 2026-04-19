interface NavLinkProps {
    label: string;
    active?: boolean;
    onClick?: () => void;
  }

  const NavLink = ({ label, active = false, onClick }: NavLinkProps) => (
    <span
      onClick={onClick}
      className={`font-['Inter',sans-serif] text-sm cursor-pointer no-underline transition-colors duration-150 ${active ? 'font-semibold text-indigo-500' : 'font-normal text-gray-700 hover:text-indigo-500'}`}
    >
      {label}
    </span>
  );

  export default NavLink;