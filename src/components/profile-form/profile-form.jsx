import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { BASE_URL, PASSWORD, TEXT, USER_ENDPOINT } from '../../utils/constants';
import { getCookie } from '../../utils/utils';
import { checkResponse, updateTokens } from '../../utils/api';

import styles from './profile-form.module.css';

export default function ProfileForm() {
  const { name, email, pass } = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      try {
        const accessToken = getCookie('token');
        const request = await fetch(`${BASE_URL}${USER_ENDPOINT}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const response = await checkResponse(request);
        if (response.success) {
          setNameValue(response.user.name);
          setLoginValue(response.user.email);
        }
      } catch (error) {
        console.log(error);
        updateTokens()
          .then(getUser)
          .catch((err) => console.log(err));
      }
    }
    getUser();
  }, []);

  const [isChange, setIsChange] = useState(false);
  const [nameValue, setNameValue] = useState(name);
  const [loginValue, setLoginValue] = useState(email);
  const [passwordValue, setPasswordValue] = useState(pass);

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

  const submitHandler = useCallback((e) => {
    e.preventDefault();

    // TODO  Dispatch new user data to store
    // TODO  fetch 'POST' new user data to server

    setIsChange(false);
  }, []);

  const cancelHandler = useCallback(
    (e) => {
      e.preventDefault();
      setNameValue(name);
      setLoginValue(email);
      setPasswordValue(pass);
      setIsChange(false);
    },
    [email, name, pass]
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
