import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { PASSWORD, SHOW_ICON, HIDE_ICON, TEXT, EMAIL } from '../../utils/constants';

export default function FormInput({
  type,
  placeholder,
  value,
  setValue,
  icon = false,
}) {
  const [inputType, setInputType] = useState({
    icon: SHOW_ICON,
    type: PASSWORD,
  });

  const onIconClickHandler= (setFn) => {
    setFn((prev) => {
        return {
          icon: prev.type === PASSWORD ? HIDE_ICON : SHOW_ICON,
          type: prev.type === PASSWORD ? TEXT : PASSWORD,
        };
    });
  }
  
  const inputOnChangeHandler = (e, setFn) => {
    setFn(e.target.value);
  }

  return (
    <div className="mb-6">
      <Input
        type={type === PASSWORD ? inputType.type : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => inputOnChangeHandler(e, setValue)}
        icon={icon ? inputType.icon : undefined}
        onIconClick={() => onIconClickHandler(setInputType)}
      />
    </div>
  );
}

FormInput.propTypes = {
  type: PropTypes.oneOf([EMAIL, PASSWORD, TEXT]).isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  icon: PropTypes.bool,
}
