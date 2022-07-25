export const url = (url?: string) => {
  const prefix = url && url.indexOf("http") === -1 && url.indexOf("/_next") === -1 ? "//" : "";
  return `url(${prefix}${url})`;
};
