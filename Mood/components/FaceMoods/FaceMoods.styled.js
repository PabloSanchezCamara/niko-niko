import styled from 'styled-components';

import { getColor, setFont, getSpacing } from 'styles/utils';

export const ContainerStyled = styled.div`
  justify-content: space-between;

  display: flex;

  margin: ${getSpacing('03')}px 0 30px 0;
  width: 100%;
`;

export const IconWrapperStyled = styled.div`
  flex-direction: column;

  display: flex;

  align-items: center;
`;

export const TextStyled = styled.p`
  margin-top: ${getSpacing('02')}px;

  ${setFont('heading', '07')};
  color: ${({ selectedIcon }) =>
    selectedIcon ? getColor('text', '01') : getColor('background', '04')};
`;

export const RadioInputStyled = styled.input`
  position: absolute;
  left: -9999em;
`;

export const LabelStyled = styled.label`
  flex-direction: column;

  display: flex;

  cursor: pointer;

  align-items: center;

  &:hover {
    svg {
      path {
        fill: ${({ iconColor }) => iconColor};
      }
    }
    ${TextStyled} {
      color: ${getColor('text', '01')};
    }
  }
`;
