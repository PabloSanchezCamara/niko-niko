import { useI18n } from 'lib/i18n/translateProvider';

import { getItems } from '../FaceMoods/FaceMoods.constants';

import {
  TitleStyled,
  SubtitleStyled,
  SpinnerStyled,
  DateStyled,
  WrapperStyled
} from './Feedback.styled';

const formatDate = (date) => {
  const formatted = new Intl.DateTimeFormat('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const Feedback = ({ title, subtitle, hasError, isLoading, selectedIcon }) => {
  const { t } = useI18n();
  const date = formatDate(new Date());
  const item = getItems()[selectedIcon?.toUpperCase()];

  return (
    <WrapperStyled>
      <TitleStyled isLoading={isLoading} hasError={hasError}>
        {isLoading ? <SpinnerStyled aria-label={t('global.loading')} /> : title}
      </TitleStyled>
      {!isLoading && (
        <SubtitleStyled hasError={hasError}>{subtitle}</SubtitleStyled>
      )}
      <DateStyled
        isLoading={isLoading}
        selectedIcon={selectedIcon}
        $color={item?.color}
      >
        {date}
      </DateStyled>
    </WrapperStyled>
  );
};

export default Feedback;
