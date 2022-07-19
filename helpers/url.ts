export const url = (url?: string) =>
  `url(${url && url.indexOf("http") === -1 && url.indexOf("/_next") === -1 ? "//" : ""}${url})`;
