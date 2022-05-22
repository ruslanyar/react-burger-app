import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { PASSWORD, TEXT } from '../../utils/constants';
import styles from './profile-form.module.css';

export default function ProfileForm() {
  return (
    <form className={styles['profile-form']}>
      <div className='mb-6'>
        <Input type={TEXT} placeholder='Имя' icon='EditIcon'/>
      </div>
      <div className='mb-6'>
        <Input type={TEXT} placeholder='Логин' icon='EditIcon'/>
      </div>
      <div className='mb-6'>
        <Input type={PASSWORD} placeholder='Пароль' icon='EditIcon'/>
      </div>
      <div className={styles['button-container']}>
        <Button type='secondary'>Отмена</Button>
        <Button>Сохранить</Button>
      </div>
    </form>
  );
}
