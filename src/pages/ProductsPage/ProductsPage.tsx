import { type FC } from 'react'

import styles from './ProductsPage.module.css'
import ProductTable from '@/components/ProductsTable/ProductsTable'

const ProductsPage: FC = () => {
  return (
    <div className={styles.productPageWrapper}>
      <ProductTable />
    </div>
  )
}

export default ProductsPage
