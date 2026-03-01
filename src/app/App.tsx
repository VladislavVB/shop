import { Provider } from 'react-redux'
import './App.css'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { store } from '@/app/store'
import { router } from './router/index'
import theme from '../common/libs/ant'
import ruRU from 'antd/locale/ru_RU'

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme} locale={ruRU}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  )
}

export default App
