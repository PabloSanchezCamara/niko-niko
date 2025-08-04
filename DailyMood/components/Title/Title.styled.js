import styled from 'styled-components';

import { setFont, getColor, getSpacing } from 'styles/utils';

export const TitleStyled = styled.p`
  margin-bottom: ${getSpacing('04')}px;

  ${setFont('heading', '02')};
  color: ${getColor('background', '04')};
`;
