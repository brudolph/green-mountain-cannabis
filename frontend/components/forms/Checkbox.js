import PropTypes from 'prop-types';
import React from 'react';
import 'twin.macro';
import { Input, Label } from '../../styles/Form';

function Checkbox({ name, label, checkHandler, index, value, isChecked }) {
  return (
    <Label htmlFor={`checkbox-${index}`}>
      <Input
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
        name={name}
        value={value}
        tw="w-2 h-2 mr-2"
      />
      {label}
    </Label>
  );
}

Checkbox.propTypes = {
  checkHandler: PropTypes.func,
  index: PropTypes.number,
  isChecked: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
};

export default Checkbox;
