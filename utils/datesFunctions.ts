import { formatDistanceToNow } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

export const getDistanceFromNow = (date: number, addSuffix: boolean = true) => {

  return formatDistanceToNow(date, { addSuffix, locale: enUS });
};
