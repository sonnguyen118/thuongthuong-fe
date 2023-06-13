function removeUploadPath(str: string): string {
  return str.replace(/^uploads\/product\//, "");
}

export default { removeUploadPath };