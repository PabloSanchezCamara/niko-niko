import { useI18n } from 'lib/i18n/translateProvider';

import View from 'components/View';

import Skeleton from '../../common/Skeleton/Skeleton.view';

import Logo from './components/Logo/Logo.view';
import DailyMoodView from './DailyMood.view';
import { SkeletonsContainerStyled } from './DailyMood.styled';
import { useDailyMood } from './DailyMood.hooks';
import Title from './components/Title/Title.view';
import MoodsList from './components/MoodsList/MoodsList.view';

const DailyMood = () => {
  const { t } = useI18n();
  const { isLoading, moodsPerDay } = useDailyMood();

  return (
    <View
      content={
        <DailyMoodView>
          <Logo />
          {isLoading ? (
            <SkeletonsContainerStyled aria-label={t('global.loading-content')}>
              <Skeleton height="205px" />
              <Skeleton height="205px" />
              <Skeleton height="205px" />
            </SkeletonsContainerStyled>
          ) : (
            <>
              <Title />
              <MoodsList moodsPerDay={moodsPerDay} />
            </>
          )}
        </DailyMoodView>
      }
    />
  );
};

export default DailyMood;
