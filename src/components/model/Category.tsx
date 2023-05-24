export interface Category {
    id: number
    name: string,
    link: string,
    isActive: boolean,
    isHighlight: boolean,
    parent: string,
    subCategories: Category[]
}

// interface Category {
//     id: number
//     imageUrl: string
//     name: string
//     link: string
//     price: number
//     subCategories: Category[]
//   }