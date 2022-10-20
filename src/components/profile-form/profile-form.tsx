import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppDispatch, useAppSelector } from '../../services/hooks';

import { PASSWORD, TEXT } from '../../utils/constants';

import styles from './profile-form.module.css';
import { selectUser } from '../../services/slices/userSlice';
import { getUserInfo, updateUserInfo } from '../../services/thunks/user';

const ProfileForm: FC = () => {
  const { user } = useAppSelector(selectUser);
  let name = '';
  let email = '';
  if (user) {
    name = user.name;
    email = user.email;
  }
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const [isChange, setIsChange] = useState<boolean>(false);
  const [nameValue, setNameValue] = useState<string>(name);
  const [loginValue, setLoginValue] = useState<string>(email);
  const [passwordValue, setPasswordValue] = useState<string>('');

  const body = useMemo(
    () => ({
      name: nameValue,
      email: loginValue,
      password: passwordValue,
    }),
    [nameValue, loginValue, passwordValue]
  );

  const [passInputType, setPassInputType] = useState<
    typeof PASSWORD | typeof TEXT
  >(PASSWORD);

  const nameInputRef = useRef(null);
  const loginInputRef = useRef(null);
  const passInputRef = useRef(null);

  const onChangeHandler = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      setFn: React.Dispatch<React.SetStateAction<string>>
    ) => {
      setFn(e.target.value);
      setIsChange(true);
    },
    []
  );

  const onBlurHandler = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.disabled = true;
  }, []);

  const onIconClickHandler = useCallback(
    (ref: React.MutableRefObject<HTMLInputElement> | React.MutableRefObject<null>) => {
      if (!ref.current) return;
      ref.current.disabled = false;
      ref.current.focus();
    },
    []
  );

  const passOnIconClickHandler = useCallback(
    (ref: React.MutableRefObject<HTMLInputElement> | React.MutableRefObject<null>) => {
      onIconClickHandler(ref);
      setPassInputType(TEXT);
    },
    [onIconClickHandler]
  );

  const passOnBlurHandler = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onBlurHandler(e);
      setPassInputType(PASSWORD);
    },
    [onBlurHandler]
  );

  const submitHandler = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(updateUserInfo({ body, setFn: setIsChange }));
    },
    [dispatch, body]
  );

  const cancelHandler = useCallback(
    (e: React.SyntheticEvent<Element, Event>) => {
      e.preventDefault();
      setNameValue(name);
      setLoginValue(email);
      setPasswordValue('');
      setIsChange(false);
    },
    [email, name]
  );

  return (
    <form className={styles['profile-form']} onSubmit={submitHandler}>
      <div className="mb-6">
        <Input
          ref={nameInputRef}
          type={TEXT}
          placeholder="Имя"
          icon="EditIcon"
          name="name"
          value={nameValue}
          onChange={(e) => onChangeHandler(e, setNameValue)}
          onIconClick={() => onIconClickHandler(nameInputRef)}
          onBlur={(e) => onBlurHandler(e!)}
          disabled
        />
      </div>
      <div className="mb-6">
        <Input
          ref={loginInputRef}
          type={TEXT}
          placeholder="Логин"
          icon="EditIcon"
          name="login"
          value={loginValue}
          onChange={(e) => onChangeHandler(e, setLoginValue)}
          onIconClick={() => onIconClickHandler(loginInputRef)}
          onBlur={(e) => onBlurHandler(e!)}
          disabled
        />
      </div>
      <div className="mb-6">
        <Input
          ref={passInputRef}
          type={passInputType}
          placeholder="Пароль"
          icon="EditIcon"
          name="password"
          value={passwordValue}
          onChange={(e) => onChangeHandler(e, setPasswordValue)}
          onIconClick={() => passOnIconClickHandler(passInputRef)}
          onBlur={(e) => passOnBlurHandler(e!)}
          disabled
        />
      </div>
      {isChange && (
        <div className={styles['button-container']}>
          <Button htmlType='button' type="secondary" onClick={(e) => cancelHandler(e)}>
            Отмена
          </Button>
          <Button htmlType='submit' type="primary">Сохранить</Button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
