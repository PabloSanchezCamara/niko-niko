import styled from 'styled-components';

import { getColor, getSpacing } from 'styles/utils';

export const WrapperStyled = styled.div`
  overflow-y: auto;

  margin-top: ${getSpacing('03')}px;
  margin-bottom: ${getSpacing('03')}px;
  max-height: 395px;
  padding: ${getSpacing('01')}px;
`;

export const ModalStyled = styled.div`
  position: fixed;
  z-index: 1;

  margin-top: 80px;
  border-radius: 8px;
  width: 317px;
  height: 491px;
  padding: 24px 4px 0 4px;

  background-color: ${getColor('background', '05')};
`;

export const SearchBarStyled = styled.div`
  width: 100%;
  padding: 0 4px;
`;
