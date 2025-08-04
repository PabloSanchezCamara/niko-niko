import styled, { css } from 'styled-components';

import { getColor, getSpacing, setFont } from 'styles/utils';

export const CommentContainerStyled = styled.div`
  background: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
`;

export const IconWrapperStyled = styled.div`
  justify-content: space-between;

  display: flex;

  margin-bottom: ${getSpacing('02')}px;
`;

export const GifImageStyled = styled.img`
  object-fit: contain;

  margin: auto;
  border-radius: 4px;
  max-width: 90%;
  max-height: 90%;
`;

export const IconNameStyled = styled.p`
  ${setFont('heading', '08')};
  color: ${getColor('background', '03')};
`;

export const CommentStyled = styled.p`
  ${({ imageUrl }) =>
    imageUrl &&
    css`
      margin-bottom: ${getSpacing('03')}px;
    `};

  ${setFont('base', '01')};
  color: ${getColor('background', '01')};
`;

export const GifBoxStyled = styled.figure`
  display: flex;

  margin-bottom: 20px;
  width: 100%;
  height: 100%;
`;
