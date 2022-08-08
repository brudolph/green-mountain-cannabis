import React from 'react';
import { Input, Label } from '../styles/Form';

export default function Checkbox({ isChecked, label, checkHandler, index }) {
  return (
    <Label htmlFor={`checkbox-${index}`}>
      {label}
      <Input
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
        tw="w-2 h-2"
      />
    </Label>
  );
}
