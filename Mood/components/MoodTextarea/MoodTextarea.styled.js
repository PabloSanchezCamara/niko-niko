import styled from 'styled-components';

import { getColor, setFont, getSpacing } from 'styles/utils';

export const TextareaStyled = styled.textarea`
  margin-bottom: ${getSpacing('03')}px;
  border: 1px solid ${getColor('background', '01')};
  border-radius: 4px;
  width: 100%;
  height: 76px;
  padding: ${getSpacing('02')}px;
  resize: none;

  ${setFont('base', '01')};
  color: ${getColor('background', '01')};
  background-color: ${getColor('background', '02')};

  &::placeholder {
    color: ${getColor('background', '03')};
  }

  &:disabled {
    border-color: ${getColor('background', '04')};

    color: ${getColor('background', '03')};
  }
`;
