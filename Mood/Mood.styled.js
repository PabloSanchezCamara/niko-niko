import styled from 'styled-components';

import { getColor } from 'styles/utils';

export const ContainerStyled = styled.section`
  position: relative;
  z-index: 1;

  display: flex;
  flex-direction: column;

  margin: 0 auto;
  width: 360px;
  padding: 25px;

  background-color: ${getColor('background', '02')};

  align-items: center;
`;
