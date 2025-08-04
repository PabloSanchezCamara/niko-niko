import styled from 'styled-components';

export const IconStyled = styled.div`
  flex-direction: column;

  display: flex;

  align-items: center;

  svg {
    width: ${({ name, moodItems }) => moodItems[name.toUpperCase()]?.width}px;
    height: ${({ name, moodItems }) => moodItems[name.toUpperCase()]?.height}px;
    path {
      fill: ${({ name, moodItems }) => moodItems[name.toUpperCase()]?.color};
    }
  }
`;
