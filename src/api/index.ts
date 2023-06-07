// Với admin sử dụng các api này
export { default as Login } from "./admin/login";

export { default as createCategory } from "./admin/category";
export { default as Products } from "./admin/products";
export { default as Ckeditor } from "./admin/ckeditor";
export { default as WebInformation } from "./admin/webinformation";


// Với phía client sử dụng các api này
export { default as getAllCategory } from "./client/category";
export { default as WebInformationClient } from "./client/webinformation";
export { default as placeOrder } from "./client/orders";
