export const getDefaultTextWeight = (tag: string) => {
  if (["h1", "h2", "h3", "h4", "b"].includes(tag)) return 700;
  else if (["span", "a", "time"].includes(tag)) return 500;
  else return 400;
};

export const getDefaultTextSize = (tag: string) => {
  // 52px -> md:30px
  if (["h1"].includes(tag)) return "xxl";
  // 20px -> md:17px
  else if (tag === "p") return "m";
  // 16px
  else return "d";
};

export const getDefaultTextLeading = (size: string, tag: string) => {
  if (tag === "p" && size === "m") return "170";
  else if (size === "xxs") return 1;
  else if (size === "xs") return "20";
  else if (size === "s") return "22";
  else if (size === "m") return "24";
  else if (size === "l") return "29";
  else if (size === "xl") return "38";
  else if (size === "xxl" || size === "vl") return "130";
  else return "19";
};
