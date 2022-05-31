import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { PASSWORD, TEXT } from '../../utils/constants';
import { updateUserInfo } from '../../services/actions/userActions';
import { getUserInfo } from '../../services/actions/userActions';

import styles from './profile-form.module.css';

export default function ProfileForm() {
  const { name, email } = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const [isChange, setIsChange] = useState(false);
  const [nameValue, setNameValue] = useState(name);
  const [loginValue, setLoginValue] = useState(email);
  const [passwordValue, setPasswordValue] = useState('');

  const body = useMemo(
    () => ({
      name: nameValue,
      email: loginValue,
      password: passwordValue,
    }),
    [nameValue, loginValue, passwordValue]
  );

  const [passInputType, setPassInputType] = useState(PASSWORD);

  const nameInputRef = useRef(null);
  const loginInputRef = useRef(null);
  const passInputRef = useRef(null);

  const onChangeHandler = useCallback((e, setFn) => {
    setFn(e.target.value);
    setIsChange(true);
  }, []);

  const onBlurHandler = useCallback((e) => {
    e.target.disabled = true;
  }, []);

  const onIconClickHandler = useCallback((ref) => {
    ref.current.disabled = false;
    ref.current.focus();
  }, []);

  const passOnIconClickHandler = useCallback(
    (ref) => {
      onIconClickHandler(ref);
      setPassInputType(TEXT);
    },
    [onIconClickHandler]
  );

  const passOnBlurHandler = useCallback(
    (e) => {
      onBlurHandler(e);
      setPassInputType(PASSWORD);
    },
    [onBlurHandler]
  );

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateUserInfo(body, setIsChange));
    },
    [dispatch, body]
  );

  const cancelHandler = useCallback(
    (e) => {
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
          onBlur={(e) => onBlurHandler(e)}
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
          onBlur={(e) => onBlurHandler(e)}
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
          onBlur={(e) => passOnBlurHandler(e)}
          disabled
        />
      </div>
      {isChange && (
        <div className={styles['button-container']}>
          <Button type="secondary" onClick={(e) => cancelHandler(e)}>
            Отмена
          </Button>
          <Button type="primary">Сохранить</Button>
        </div>
      )}
    </form>
  );
}
