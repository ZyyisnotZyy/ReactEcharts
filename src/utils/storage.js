// 添加 Storage
export const getStorage = (key) => {
  return localStorage.getItem(key);
};
// 获取 Storage
export const setStorage = (key, val) => {
  localStorage.setItem(key, val);
};
// 删除 Storage
export const rmStorage = (key) => {
  localStorage.removeItem(key);
};
// 删除全部 Storage
export const clsStorage = () => {
  localStorage.clear();
};
