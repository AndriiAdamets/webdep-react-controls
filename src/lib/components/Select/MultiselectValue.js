import React from 'react';

import Button from '../Button';

const multiselectValue = ({option, nameAccessor, valueAccessor, onUnselect, optionNameFn}) => {
  return (
    <div className="wrc-select__multiselect-value">
      {optionNameFn ? optionNameFn(option) : option[nameAccessor] || option}
      &nbsp;
      <Button state="link" onClick={(e) => {
        e.stopPropagation();
        onUnselect(option[valueAccessor]);
        return false;
      }}>&times;</Button>
    </div>
  );
}

export default multiselectValue;