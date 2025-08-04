import PropTypes from 'prop-types';

import { useI18n } from 'lib/i18n/translateProvider';

import { TextareaStyled } from './MoodTextarea.styled';

const MoodTextarea = ({
  isDisabled,
  onTextareaChange,
  textareaValue,
  hasError
}) => {
  const { t } = useI18n();

  const handleChange = (e) => {
    onTextareaChange(e.target.value);
  };
  return (
    <TextareaStyled
      placeholder={t('mood.placeholder')}
      onChange={handleChange}
      disabled={isDisabled || hasError}
      value={textareaValue}
    />
  );
};

MoodTextarea.propTypes = {
  isDisabled: PropTypes.bool,
  onTextareaChange: PropTypes.func.isRequired,
  textareaValue: PropTypes.string
};

export default MoodTextarea;
