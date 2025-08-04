import PropTypes from 'prop-types';

import { useI18n } from 'lib/i18n/translateProvider';

import { Icon } from '..';

import {
  ContainerStyled,
  RadioInputStyled,
  LabelStyled,
  IconWrapperStyled,
  TextStyled
} from './FaceMoods.styled';
import { getItems } from './FaceMoods.constants';

const FaceMoods = ({ selectedIcon, onChange, isDisabled, hasError }) => {
  const { t } = useI18n();
  const items = Object.values(getItems());

  return (
    <ContainerStyled>
      {items.map((item) => {
        const isSelected = selectedIcon === item.name;

        return (
          <IconWrapperStyled key={item.name}>
            <RadioInputStyled
              type="radio"
              id={item.name}
              name="mood"
              value={item.name}
              checked={isSelected}
              onChange={onChange}
              disabled={isDisabled || isSelected}
            />
            <LabelStyled
              htmlFor={item.name}
              iconColor={item.color}
              selectedIcon={isSelected}
              disabled={isDisabled}
            >
              <Icon
                name={item.name}
                width={item.width}
                height={item.height}
                selectedIcon={isSelected}
                color={item.color}
                ariaLabel={`Icon ${item.name}`}
              />
              <TextStyled selectedIcon={isSelected}>
                {t(`mood.${item.name}`)}
              </TextStyled>
            </LabelStyled>
          </IconWrapperStyled>
        );
      })}
    </ContainerStyled>
  );
};

FaceMoods.propTypes = {
  selectedIcon: PropTypes.string,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool
};

export default FaceMoods;
