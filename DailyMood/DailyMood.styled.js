import styled from 'styled-components';

import { getColor, getSpacing } from 'styles/utils';

export const ContainerStyled = styled.section`
  padding: ${getSpacing('05')}px;

  background-color: ${getColor('background', '02')};

  align-items: center;
`;

export const SkeletonsContainerStyled = styled.div`
  > :not(:last-child) {
    margin-bottom: ${getSpacing('06')}px;
  }
`;
