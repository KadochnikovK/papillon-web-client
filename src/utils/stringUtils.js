export const makeFullName = (...args) => {
  const fullName = args.reduce((str, arg) => {
    if (arg) {
      str += str.length ? ` ${arg}` : arg;
      return str;
    } else return str;
  }, "");
  return fullName;
};
