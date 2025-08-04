import styled from 'styled-components';

import { getColor, getSpacing, setFont } from 'styles/utils';

export const DateStyled = styled.p`
  ${setFont('heading', '03')};
  color: ${getColor('text', '04')};
`;

export const MoodsWrapperStyled = styled.div`
  justify-content: space-between;

  display: flex;

  margin-bottom: ${getSpacing('05')}px;

  align-items: flex-start;
`;

export const IconsListStyled = styled.div`
  flex-direction: column;

  display: flex;

  gap: ${getSpacing('03')}px;
`;

export const MoodRowStyled = styled.div`
  flex-direction: row;

  display: flex;

  gap: ${getSpacing('02')}px;
`;

export const MoodsListContainerStyled = styled.div`
  flex-direction: column;

  display: flex;
`;

export const GridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-auto-rows: 1px;

  gap: ${getSpacing('03')}px;
`;

export const CommentMasonryStyled = styled.div`
  width: 100%;
`;

export const SeparatorStyled = styled.hr`
  margin: ${getSpacing('05')}px 0;
`;
