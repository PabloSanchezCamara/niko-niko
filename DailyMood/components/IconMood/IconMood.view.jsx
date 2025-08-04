import PropTypes from 'prop-types';

import { iconsStates } from 'components/pages/Mood/components/Icon/Icon.container';

import { IconStyled } from './IconMood.styled';

const IconMood = ({ name, moodItems }) => {
  const IconMap = iconsStates[name];

  return (
    <IconStyled name={name} moodItems={moodItems}>
      <IconMap aria-hidden="true" />
    </IconStyled>
  );
};

IconMood.propTypes = {
  name: PropTypes.oneOf(['excellent', 'good', 'fair', 'bad', 'awful'])
    .isRequired
};

export default IconMood;
