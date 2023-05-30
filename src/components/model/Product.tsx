import { Category } from './Category'

export interface Product {
  id: number
  // name: string
  link: string
  isActive: boolean
  imageUrl: string
  category: Category
  title: string
  price: number
}

// interface Category {
//     id: number
//     imageUrl: string
//     name: string
//     link: string
//     price: number
//     subCategories: Category[]
//   }
