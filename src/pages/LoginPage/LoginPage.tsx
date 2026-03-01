import { type FC } from 'react'
import logo from '../../assets/logo.svg'
import LoginForm from '../../components/LoginForm/LoginForm.tsx'
import './LoginPage.css'

const LoginPage: FC = () => {
  return (
    <div className="login-page">
      <div className="login-page__container-border">
        <div className="login-page__container-border-inside1">
          <div className="login-page__container-border-inside2">
            <div className="login-page__container">
              <div className="login-page__logo-border">
                <div className="login-page__logo-border-inside1">
                  <div className="login-page__logo">
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
  )
}

export default LoginPage
