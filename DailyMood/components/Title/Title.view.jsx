import { useI18n } from 'lib/i18n/translateProvider';

import { TitleStyled } from './Title.styled';

const Title = () => {
  const { t } = useI18n();
  return <TitleStyled>{t('daily-mood.title')}</TitleStyled>;
};

export default Title;
