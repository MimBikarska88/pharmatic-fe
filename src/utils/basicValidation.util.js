export const isEmpty = (obj) => {
  return obj && obj !== undefined && Object.keys(obj).length !== 0;
};

export const isEmptyString = (str) => {
  return !str || str.length === 0 || str.trim() === "";
};
