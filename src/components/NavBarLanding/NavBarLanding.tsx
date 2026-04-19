import LogoMark from '../LogoMark/LogoMark';
import NavLink from '../NavLink/NavLink';
import Button from '../primary/Button/Button';

interface NavBarLandingProps {
  onNavClick?: (label: string) => void;
  onLoginClick?: () => void;
  activeLink?: string;
}

const navLinks = ['Sobre nosotros', 'Planes', 'Features'];

const NavBarLanding = ({ onNavClick, onLoginClick, activeLink }: NavBarLandingProps) => (
  <div className="w-full">
    <div className="flex items-center justify-between px-6 py-4">
      <LogoMark variant="full" />
      <nav className="flex items-center gap-8">
        {navLinks.map(link => (
          <NavLink
            key={link}
            label={link}
            active={activeLink === link}
            onClick={() => onNavClick?.(link)}
          />
        ))}
      </nav>
      <Button variant="primary" onClick={onLoginClick}>
        Iniciar Sesión
      </Button>
    </div>
    <hr className="border-gray-200" />
  </div>
);

export default NavBarLanding;