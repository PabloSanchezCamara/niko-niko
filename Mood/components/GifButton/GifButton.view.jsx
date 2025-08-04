import PropTypes from 'prop-types';

import { useI18n } from 'lib/i18n/translateProvider';

import { ReactComponent as IconBlack } from '../GifButton/assets/IconBlack.svg';
import { ReactComponent as IconGrey } from '../GifButton/assets/IconGrey.svg';
import { GiphySearcher } from '..';
import { ModalStyled } from '../GiphySearcher/GiphySearcher.styled';

import {
  WrapperStyled,
  ChangeStyled,
  CreditsStyled,
  ExternalLinkStyled,
  GifBoxStyled,
  GifButtonStyled,
  GifStyled,
  IconStyled,
  TextStyled
} from './GifButton.styled';

const GifButton = ({
  isDisabled,
  selectedGif,
  handleGifSelected,
  modalIsOpen,
  setModalIsOpen,
  isLoading
}) => {
  const { t } = useI18n();

  return (
    <>
      {modalIsOpen && (
        <ModalStyled aria-label="modal de selección de gifs">
          <GiphySearcher selectedGif={handleGifSelected} />
        </ModalStyled>
      )}
      {selectedGif && selectedGif.gif ? (
        <WrapperStyled>
          <GifBoxStyled>
            <GifStyled src={selectedGif.gif.url} alt="" isLoading={isLoading} />
          </GifBoxStyled>
        </WrapperStyled>
      ) : (
        <GifButtonStyled
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          <>
            <IconStyled>
              {isDisabled ? (
                <IconGrey aria-hidden="true" />
              ) : (
                <IconBlack aria-hidden="true" />
              )}
            </IconStyled>
            {t('mood.text-gif-button')}
          </>
        </GifButtonStyled>
      )}

      {selectedGif.gif && (
        <TextStyled>
          {selectedGif.gif.username ? (
            <CreditsStyled disabled={isLoading}>
              {t('mood.gif-credit-via')}{' '}
              <a
                href={selectedGif.gif.profile}
                target="_blank"
                rel="noreferrer"
              >
                {selectedGif.gif.username}{' '}
                <ExternalLinkStyled>
                  {t('mood.external-link-text')}
                </ExternalLinkStyled>
              </a>{' '}
              {t('mood.gif-credit-on')}{' '}
              <a href={selectedGif.gif.url} target="_blank" rel="noreferrer">
                {t('mood.gif-credit-giphy')}{' '}
                <ExternalLinkStyled>
                  {t('mood.external-link-text')}
                </ExternalLinkStyled>
              </a>
            </CreditsStyled>
          ) : (
            <CreditsStyled disabled={isLoading}>
              {t('mood.gif-credit-via')}{' '}
              <a href={selectedGif.gif.url} target="_blank" rel="noreferrer">
                {t('mood.gif-credit-giphy')}{' '}
                <ExternalLinkStyled>
                  {t('mood.external-link-text')}
                </ExternalLinkStyled>
              </a>
            </CreditsStyled>
          )}
          <ChangeStyled
            onClick={() => setModalIsOpen(true)}
            disabled={isLoading}
          >
            {t('mood.change')}
          </ChangeStyled>
        </TextStyled>
      )}
    </>
  );
};

GifButton.propTypes = {
  isDisabled: PropTypes.bool,
  selectedGif: PropTypes.func,
  handleGifSelected: PropTypes.func,
  modalIsOpen: PropTypes.bool.isRequired,
  setModalIsOpen: PropTypes.func,
  isLoading: PropTypes.bool
};

export default GifButton;
