import { type FC } from 'react';
import logo from '@/assets/logo.svg';
import LoginForm from '@/pages/LoginPage/ui/LoginForm/LoginForm';
import styles from './LoginPage.module.css';

const LoginPage: FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.containerBorder}>
        <div className={styles.containerBorderInside1}>
          <div className={styles.containerBorderInside2}>
            <div className={styles.container}>
              <div className={styles.logoBorder}>
                <div className={styles.logoBorderInside1}>
                  <div className={styles.logo}>
                    <img src={logo} alt="logo" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="h1 text-center">Добро пожаловать!</h1>
                <p className="text text-gradient text-center">Пожалуйста, авторизуйтесь</p>
              </div>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;