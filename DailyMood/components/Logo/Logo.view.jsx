import { LogoStyled } from './Logo.styled';
import { ReactComponent as LogoNiko } from './assets/Logo.svg';

const Logo = () => {
  return (
    <LogoStyled>
      <LogoNiko />
    </LogoStyled>
  );
};

export default Logo;
