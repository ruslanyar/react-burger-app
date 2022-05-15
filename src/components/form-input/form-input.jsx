import React, { useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { PASSWORD, SHOW_ICON } from '../../utils/constants';
import { inputOnChangeHandler, onIconClickHandler } from '../../utils/utils';

export default function FormInput({ type, placeholder, icon = false }) {
  const [value, setValue] = useState('');
  const [inputType, setInputType] = useState({
    icon: SHOW_ICON,
    type: PASSWORD,
  });

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
