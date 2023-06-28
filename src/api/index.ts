// Với admin sử dụng các api này
export { default as Login } from './admin/login'

export { default as Category } from './admin/category'
export { default as getAllCategory } from './admin/category'
export { default as Products } from './admin/products'
export { default as Ckeditor2 } from './admin/ckeditor-phe'
export { default as WebInformation } from './admin/webinformation'
export { default as menuAdmin } from './admin/menu'
export { default as articleAdmin } from './admin/articles'
export { default as contactAdmin } from './admin/contact'


// Với phía client sử dụng các api này
export { default as categoryClient } from './client/category'
export { default as productClient } from './client/product'
export { default as articleClient } from './client/article'

export { default as WebInformationClient } from './client/webinformation'
export { default as placeOrder } from './client/orders'
