import React, { FC, useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { PASSWORD, SHOW_ICON, HIDE_ICON, TEXT } from '../../utils/constants';
import {
  IFormInputProps,
  TFormInputOnChangeHandler,
  TFormInputOnIconClickHandler,
  TFormInputState,
} from './form-input.types';

const FormInput: FC<IFormInputProps> = ({
  name,
  type,
  placeholder,
  value,
  setValue,
  icon = false,
}) => {
  const [inputType, setInputType] = useState<TFormInputState>({
    icon: SHOW_ICON,
    type: PASSWORD,
  });

  const onIconClickHandler: TFormInputOnIconClickHandler = (setFn) => {
    setFn((prev) => {
      return {
        icon: prev.type === PASSWORD ? HIDE_ICON : SHOW_ICON,
        type: prev.type === PASSWORD ? TEXT : PASSWORD,
      };
    });
  };

  const inputOnChangeHandler: TFormInputOnChangeHandler = (e, setFn) => {
    setFn(e.target.value);
  };

  return (
    <div className="mb-6">
      <Input
        name={name}
        type={type === PASSWORD ? inputType.type : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => inputOnChangeHandler(e, setValue)}
        icon={icon ? inputType.icon : undefined}
        onIconClick={() => onIconClickHandler(setInputType)}
      />
    </div>
  );
};

export default FormInput;
