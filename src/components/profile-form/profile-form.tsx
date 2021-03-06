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

import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';

import { PASSWORD, TEXT } from '../../utils/constants';
import { updateUserInfoThunk } from '../../services/thunks/user';
import { getUserInfo } from '../../services/thunks';
import { userSelector } from '../../services/selectors';

import styles from './profile-form.module.css';

const ProfileForm: FC = () => {
  const { user } = useAppSelector(userSelector);
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
      dispatch(updateUserInfoThunk(body, setIsChange));
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
          placeholder="??????"
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
          placeholder="??????????"
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
          placeholder="????????????"
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
            ????????????
          </Button>
          <Button type="primary">??????????????????</Button>
        </div>
      )}
    </form>
  );
}

export default ProfileForm;
