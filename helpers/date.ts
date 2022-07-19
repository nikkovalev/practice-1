import { format } from "date-fns";
import ru from "date-fns/locale/ru";

export const getDate = (initialDate: number | string | undefined, layout: string) => {
  const date = initialDate ? new Date(initialDate) : new Date();
  return format(date, layout, { locale: ru });
};
