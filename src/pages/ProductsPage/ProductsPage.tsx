import { type FC } from 'react'

import styles from './ProductsPage.module.css'
import ProductTable from '@/pages/ProductsPage/ui/ProductsTable/ProductsTable'

const ProductsPage: FC = () => {
  return (
    <div className={styles.productPageWrapper}>
      <ProductTable />
    </div>
  )
}

export default ProductsPage
