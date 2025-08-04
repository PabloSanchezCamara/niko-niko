import { useEffect } from 'react';

import { useI18n } from 'lib/i18n/translateProvider';

import { Button, Spinner } from 'components/common';

import View from 'components/View';

import { useMood } from './Mood.hooks';
import MoodView from './Mood.view';
import { FaceMoods, Feedback, GifButton, MoodTextarea } from './components';

const Mood = () => {
  const { t } = useI18n();
  const {
    getMood,
    handleIconChange,
    handleTextareaChange,
    handleSubmit,
    handleGifSelected,
    setModalIsOpen,
    selectedIcon,
    isLoading,
    textareaStatus,
    feedbackStatus,
    selectedGif,
    modalIsOpen,
    buttonDisabled
  } = useMood();

  useEffect(() => {
    getMood();
  }, []);

  return (
    <View
      content={
        <MoodView>
          <Feedback
            title={feedbackStatus.titleMessage}
            subtitle={feedbackStatus.subtitleMessage}
            isLoading={isLoading}
            hasError={feedbackStatus.hasError}
            selectedIcon={selectedIcon}
          />
          <FaceMoods
            selectedIcon={selectedIcon}
            onChange={handleIconChange}
            isDisabled={isLoading || textareaStatus.isTextareaUpdating}
          />
          <MoodTextarea
            isDisabled={isLoading || textareaStatus.isTextareaUpdating}
            textareaValue={textareaStatus.textareaValue}
            onTextareaChange={handleTextareaChange}
            hasError={feedbackStatus.hasError}
          />
          <GifButton
            isDisabled={!selectedIcon}
            selectedGif={selectedGif}
            modalIsOpen={modalIsOpen}
            handleGifSelected={handleGifSelected}
            setModalIsOpen={setModalIsOpen}
            isLoading={isLoading}
          />
          <Button isFullWidth disabled={buttonDisabled} onClick={handleSubmit}>
            {textareaStatus.isTextareaUpdating && (
              <Spinner
                aria-label={t('global.loading')}
                variant={Spinner.Variants.GREY}
                size={20}
              />
            )}
            {t('mood.send-comment')}
          </Button>
        </MoodView>
      }
    />
  );
};

export default Mood;
