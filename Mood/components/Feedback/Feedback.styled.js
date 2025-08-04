import styled, { keyframes } from 'styled-components';

import { setFont, getSpacing, getColor } from 'styles/utils';

const dotFlashing = keyframes`
  0% {
    background-color: #FFFFFF;
  }
  50%, 100% {
    background-color: #000000;
  }
`;

export const TitleStyled = styled.p`
  justify-content: center;

  display: flex;

  margin-top: 20px;
  width: 360px;

  ${setFont('heading', '05')};
  font-weight: ${({ hasError }) => (!hasError ? '500' : '400')};
`;

export const SubtitleStyled = styled(TitleStyled)`
  margin-top: 0px;

  text-align: center;

  font-weight: ${({ hasError }) => (!hasError ? '400' : '500')};
`;

export const SpinnerStyled = styled.span`
  position: relative;

  margin-bottom: ${getSpacing('01')}px;
  width: 4px;
  height: 4px;

  background-color: #000000;

  animation: ${dotFlashing} 1s infinite alternate;
  animation-delay: 0.5s;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 4px;
    height: 4px;
  }

  &::before {
    left: -6px;
    animation: ${dotFlashing} 1s infinite alternate;
    animation-delay: 0s;
  }

  &::after {
    left: 6px;
    animation: ${dotFlashing} 1s infinite alternate;
    animation-delay: 1s;
  }
`;

export const DateStyled = styled.p`
  ${setFont('heading', '05')};
  color: ${({ selectedIcon, $color, isLoading }) =>
    selectedIcon && !isLoading ? $color : getColor('background', '04')};
  text-align: center;
`;

export const WrapperStyled = styled.div`
  margin-bottom: ${getSpacing('02')}px;
  height: 61px;
`;
