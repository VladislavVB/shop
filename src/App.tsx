import { Provider } from 'react-redux'
import './assets/App.css'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { store } from './store'
import { router } from './router'
import theme from './libs/ant'
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
