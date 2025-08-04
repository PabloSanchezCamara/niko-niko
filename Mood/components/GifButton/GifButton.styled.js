import styled from 'styled-components';

import { getColor, setFont, getSpacing } from 'styles/utils';

export const GifButtonStyled = styled.button`
  margin-bottom: ${getSpacing('03')}px;
  border: none;
  border-radius: 4px;
  width: 100%;
  height: 269px;

  background-color: ${getColor('background', '05')};

  ${setFont('link', '01')};
  color: ${getColor('text', '01')};

  &:disabled {
    color: ${getColor('background', '04')};
  }
`;

export const IconStyled = styled.div`
  justify-content: center;

  display: flex;

  margin-bottom: ${getSpacing('02')}px;
`;

export const GifStyled = styled.img`
  object-fit: contain;

  margin: auto;
  border-radius: 4px;
  max-width: 90%;
  max-height: 90%;

  ${({ isLoading }) => isLoading && 'filter: grayscale(100%);'}
`;

export const TextStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${getSpacing('03')}px;
`;

export const ChangeStyled = styled.button`
  border: none;
  padding: 0;

  background: none;
  cursor: pointer;

  text-decoration: underline;
  ${setFont('link', '01')};
  font-size: 12px;

  &:disabled {
    color: ${getColor('background', '04')};
    cursor: default;
  }
`;

export const GifBoxStyled = styled.figure`
  display: flex;

  width: 100%;
  height: 100%;
`;

export const CreditsStyled = styled.p`
  ${setFont('placeholder', '01')};
  font-weight: 400;
  line-height: 16px;
  color: ${({ disabled }) =>
    disabled ? getColor('background', '04') : getColor('text', '01')};

  a {
    color: ${({ disabled }) =>
      disabled ? getColor('background', '04') : getColor('text', '01')};
    text-decoration: underline;
    pointer-events: none;
  }
`;

export const ExternalLinkStyled = styled.span`
  position: absolute;
  clip: rect(0 0 0 0);
`;

export const WrapperStyled = styled.div`
  margin-bottom: 8px;
  border: none;
  border-radius: 4px;
  width: 100%;
  height: 269px;

  background-color: ${getColor('background', '05')};
`;
