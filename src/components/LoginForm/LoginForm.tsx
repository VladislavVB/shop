import { useEffect, type FC } from 'react'
import { HiOutlineUser, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'
import { Button, Checkbox, Form, Input, Divider, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/index'
import { loginUser } from '../../store/slices/authSlice'
import { MdClear } from 'react-icons/md'
import './LoginForm.css'

type FormValues = {
  username: string
  password: string
  remember: boolean
}

const LoginForm: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { isLoading, token } = useAppSelector((state) => state.auth)
  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    if (token) {
      navigate('/products', { replace: true })
    }
  }, [token, navigate])

  const onSubmit = async (values: FormValues) => {
    const { username, password, remember } = values
    try {
      await dispatch(
        loginUser({
          credentials: { username, password },
          rememberMe: remember,
        })
      ).unwrap()
    } catch (err) {
      api.error({
        message: 'Ошибка авторизации',
        description: err as string,
      })
    }
  }

  return (
    <Form className="login-form" form={form} name="login-form" onFinish={onSubmit}>
      {contextHolder}
      <Form.Item
        name="username"
        label={<span className="label">Логин</span>}
        rules={[{ required: true, message: 'Введите имя пользователя!' }]}
        layout="vertical"
      >
        <Input
          size="large"
          prefix={<HiOutlineUser color="#CACACA" />}
          allowClear={{
            clearIcon: <MdClear color="#CACACA" size={24} />,
          }}
          placeholder="Логин"
          style={{ backgroundColor: 'transparent' }}
        />
      </Form.Item>
      <Form.Item
        name="password"
        label={<span className="label">Пароль</span>}
        rules={[{ required: true, message: 'Введите пароль!' }]}
        layout="vertical"
      >
        <Input.Password
          size="large"
          prefix={<HiOutlineLockClosed color="#CACACA" />}
          placeholder="Пароль"
          allowClear={{
            clearIcon: <MdClear color="#CACACA" size={24} />,
          }}
          iconRender={(visible) =>
            visible ? <HiOutlineEye size={24} color="#CACACA" /> : <HiOutlineEyeOff size={24} color="#CACACA" />
          }
          style={{ backgroundColor: 'transparent' }}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: '22px' }}>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>
            <span className="text color-textlight">Запомнить данные</span>
          </Checkbox>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button className="button-primary" block type="primary" htmlType="submit" loading={isLoading}>
          Войти
        </Button>
        <Divider>
          <span className="text text-gradient">или</span>
        </Divider>
        <div className="text-center" style={{ marginTop: '36px' }}>
          <span className="text">Нет аккаунта?</span>{' '}
          <a className="text text-link" href="">
            Создать
          </a>
        </div>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
