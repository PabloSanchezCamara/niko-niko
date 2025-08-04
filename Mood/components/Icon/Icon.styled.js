import styled from 'styled-components';

import { getColor } from 'styles/utils';

export const IconStyled = styled.div`
  flex-direction: column;

  display: flex;

  align-items: center;

  svg {
    path {
      fill: ${({ selectedIcon, $color }) =>
        selectedIcon ? $color : getColor('background', '04')};
    }
  }
`;
