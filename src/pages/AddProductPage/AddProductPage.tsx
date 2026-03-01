import React, { useState } from 'react'
import { Form, Input, Button, Card, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { Product } from '@/api/productsApi/products.types'

interface AddProductFormData {
  title: string
  price: number
  brand: string
  sku: string
}

const AddProductPage: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (values: AddProductFormData) => {
    setLoading(true)

    try {
      const newProduct: Partial<Product> = {
        ...values,
        id: Date.now(),
        rating: 0,
        category: 'new',
        thumbnail: 'https://via.placeholder.com/150',
      }

      console.log(newProduct)

      message.success({
        content: 'Товар успешно добавлен!',
      })
    } catch (error) {
      message.error('Ошибка при добавлении товара')
      console.error('Error adding product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div
      style={{
        padding: '24px',
        maxWidth: '600px',
        margin: '0 auto',
        minHeight: '100vh',
        background: '#f5f5f5',
      }}
    >
      <Card title="Добавление нового товара" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            title: '',
            price: '',
            brand: '',
            sku: '',
          }}
        >
          <Form.Item
            name="title"
            label="Наименование товара"
            rules={[
              { required: true, message: 'Пожалуйста, введите наименование товара' },
              { min: 3, message: 'Минимальная длина 3 символа' },
            ]}
          >
            <Input placeholder="Введите наименование" size="large" disabled={loading} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Цена"
            rules={[
              { required: true, message: 'Пожалуйста, введите цену' },
              { pattern: /^\d+(\.\d{1,2})?$/, message: 'Введите корректную цену' },
            ]}
          >
            <Input type="number" step="0.01" placeholder="0.00" size="large" disabled={loading} prefix="₽" />
          </Form.Item>

          <Form.Item
            name="brand"
            label="Вендор"
            rules={[{ required: true, message: 'Пожалуйста, введите название бренда' }]}
          >
            <Input placeholder="Введите название бренда" size="large" disabled={loading} />
          </Form.Item>

          <Form.Item
            name="sku"
            label="Артикул"
            rules={[
              { required: true, message: 'Пожалуйста, введите артикул' },
              { pattern: /^[A-Z0-9-]+$/, message: 'Только заглавные буквы, цифры и дефис' },
            ]}
          >
            <Input placeholder="Например: ABC-123" size="large" disabled={loading} />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button size="large" onClick={handleCancel} disabled={loading}>
                Отмена
              </Button>
              <Button type="primary" htmlType="submit" size="large" loading={loading}>
                Добавить товар
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>

      <Button size="large" onClick={handleCancel}>
        Продукты
      </Button>
    </div>
  )
}

export default AddProductPage
