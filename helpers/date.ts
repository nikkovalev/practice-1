import { format } from "date-fns";
import ru from "date-fns/locale/ru";

export const getDate = (initialDate: number | string, layout: string) => {
  const date = new Date(initialDate ?? "");
  return format(date, layout, { locale: ru });
};
