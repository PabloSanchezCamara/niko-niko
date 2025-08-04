import PropTypes from 'prop-types';

import { useI18n } from 'lib/i18n/translateProvider';

import {
  CreditsStyled,
  ExternalLinkStyled
} from 'components/pages/Mood/components/GifButton/GifButton.styled';

import IconMood from '../IconMood/IconMood.view';

import {
  CommentContainerStyled,
  CommentStyled,
  GifImageStyled,
  GifBoxStyled,
  IconNameStyled,
  IconWrapperStyled
} from './Comment.styled';

const Comment = ({ mood, moodItems }) => {
  const { t } = useI18n();
  const { comment, imageUrl, mood: moodType } = mood;

  return (
    <>
      <CommentContainerStyled>
        <IconWrapperStyled>
          <IconMood name={moodType} moodItems={moodItems} />
          <IconNameStyled>{t(`mood.${moodType}`)}</IconNameStyled>
        </IconWrapperStyled>
        {Boolean(comment) && (
          <CommentStyled imageUrl={imageUrl}>{comment}</CommentStyled>
        )}
        {imageUrl ? (
          <>
            <GifBoxStyled>
              <GifImageStyled src={imageUrl} alt="gif guardado" />
            </GifBoxStyled>
            <CreditsStyled>
              {t('mood.gif-credit-via')}{' '}
              <a href={imageUrl} target="_blank" rel="noreferrer">
                {t('mood.gif-credit-giphy')}{' '}
                <ExternalLinkStyled>
                  {t('mood.external-link-text')}
                </ExternalLinkStyled>
              </a>
            </CreditsStyled>
          </>
        ) : null}
      </CommentContainerStyled>
    </>
  );
};

Comment.propTypes = {
  mood: PropTypes.shape({
    comment: PropTypes.string,
    imageUrl: PropTypes.string,
    mood: PropTypes.oneOf(['excellent', 'good', 'fair', 'bad', 'awful'])
      .isRequired
  }).isRequired,
  moodItems: PropTypes.objectOf(
    PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Comment;
