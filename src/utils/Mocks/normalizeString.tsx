const normalizeString = (input: string): string => {
  const accentsMap: { [key: string]: string } = {
    a: "á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ",
    d: "đ",
    e: "é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ",
    i: "í|ì|ỉ|ĩ|ị",
    o: "ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ",
    u: "ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự",
    y: "ý|ỳ|ỷ|ỹ|ỵ",
  };
  let str: string = input.toLowerCase();
  for (let key in accentsMap) {
    str = str.replace(new RegExp(accentsMap[key], "g"), key);
  }
  str = str.replace(/[^a-z0-9]/g, "-");
  str = str.replace(/-+/g, "-");
  return str;
};

export default normalizeString;
