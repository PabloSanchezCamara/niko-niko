import PropTypes from 'prop-types';

import { ReactComponent as IconGenial } from './assests/genial.svg';
import { ReactComponent as IconBien } from './assests//bien.svg';
import { ReactComponent as IconRegular } from './assests/regular.svg';
import { ReactComponent as IconMal } from './assests/mal.svg';
import { ReactComponent as IconFatal } from './assests/fatal.svg';
import { IconStyled } from './Icon.styled';

export const iconsStates = {
  excellent: IconGenial,
  good: IconBien,
  fair: IconRegular,
  bad: IconMal,
  awful: IconFatal
};

const Icon = ({ name, width, height, selectedIcon, color, onChange }) => {
  const IconMap = iconsStates[name];

  return (
    <IconStyled selectedIcon={selectedIcon} $color={color} onChange={onChange}>
      <IconMap width={width} height={height} aria-hidden="true" />
    </IconStyled>
  );
};

Icon.propTypes = {
  name: PropTypes.oneOf(['excellent', 'good', 'fair', 'bad', 'awful'])
    .isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  selectedIcon: PropTypes.bool,
  color: PropTypes.func,
  onChange: PropTypes.func
};

export default Icon;
