import * as R from "ramda";

/* Split Path from string to Array */
// xSplit(properties: string): string[]: hàm này nhận vào một chuỗi properties
// và chuyển đổi nó thành một mảng các phần tử bằng cách sử dụng ký tự "." để phân tách.
const xSplit = (properties: string): string[] => {
  return properties.split(".");
};

// orArray(properties: string, record: object): any[]:
// hàm này truy cập đến một thuộc tính trong record bằng đường dẫn properties,
// nếu thuộc tính không tồn tại thì trả về một mảng rỗng.
export const orArray = (properties: string, record: object): any[] => {
  return R.pathOr([], xSplit(properties))(record);
};

// orNull(properties: string, record: object): any:
// hàm này truy cập đến một thuộc tính trong record bằng đường dẫn properties,
// nếu thuộc tính không tồn tại thì trả về giá trị null.
export const orNull = (properties: string, record: object): any => {
  return R.pathOr(null, xSplit(properties))(record);
};

// orString(properties: string, record: object): string:
// hàm này truy cập đến một thuộc tính trong record bằng đường dẫn properties,
// nếu thuộc tính không tồn tại thì trả về một chuỗi rỗng.
export const orString = (properties: string, record: object): string => {
  return R.pathOr("", xSplit(properties))(record);
};

// orNewDate(properties: string, record: object): Date:
// hàm này truy cập đến một thuộc tính trong record bằng đường dẫn properties,
// nếu thuộc tính không tồn tại thì trả về một đối tượng Date mới.
export const orNewDate = (properties: string, record: object): Date => {
  return R.pathOr(new Date(), xSplit(properties))(record);
};

// orObject(prototypes: string, record: object): object:
// hàm này truy cập đến một thuộc tính trong record bằng đường dẫn prototypes,
// nếu thuộc tính không tồn tại thì trả về một đối tượng rỗng.
export const orObject = (prototypes: string, record: object): object => {
  return R.pathOr({}, xSplit(prototypes))(record);
};

// orNumber(prototypes: string, record: object): number:
// hàm này truy cập đến một thuộc tính trong record bằng đường dẫn prototypes,
// nếu thuộc tính không tồn tại thì trả về giá trị 0.
export const orNumber = (prototypes: string, record: object): number => {
  return R.pathOr(0, xSplit(prototypes))(record);
};

// orNow(prototypes: string, record: object): Date:
// hàm này truy cập đến một thuộc tính trong record bằng đường dẫn prototypes,
// nếu thuộc tính không tồn tại thì trả về đối tượng Date hiện tại.
export const orNow = (prototypes: string, record: object): Date => {
  return R.pathOr(new Date(), xSplit(prototypes))(record);
};

// orEmpty(properties: string, record: object): string:
// hàm này truy cập đến một thuộc tính trong record bằng đường dẫn properties,
// nếu thuộc tính không tồn tại thì trả về một chuỗi rỗng.
export const orEmpty = (properties: string, record: object): string => {
  return R.pathOr("", xSplit(properties))(record);
};

// Hàm orErrorType sẽ trả về giá trị chuỗi "error"
// nếu giá trị của thuộc tính được chỉ định không tồn tại hoặc là một giá trị rỗng.
export const orErrorType = (properties: string, record: object): string => {
  return R.pathOr("error", xSplit(properties))(record);
};

// Hàm orBoolean sẽ trả về giá trị false
// nếu giá trị của thuộc tính được chỉ định không tồn tại hoặc là một giá trị rỗng.
export const orBoolean = (properties: string, record: object): boolean => {
  return R.pathOr(false, xSplit(properties))(record);
};

// Hàm orDefault sẽ trả về giá trị mặc định (dv) được chỉ định
// nếu giá trị của thuộc tính được chỉ định không tồn tại hoặc là một giá trị rỗng.
export const orDefault = (dv: any, properties: string, record: object): any => {
  const arrPath = xSplit(properties);
  return R.pathOr(dv, arrPath, record);
};

// Hàm orDefaultValue sẽ trả về giá trị đầu vào (value) nếu nó tồn tại và không phải là một giá trị rỗng.
// Nếu không, nó sẽ trả về giá trị mặc định (dv) được chỉ định.
export const orDefaultValue = (value: any, dv: any): any => {
  return R.or(value, dv);
};
