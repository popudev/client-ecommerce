import notifications from './notifications';
import routes from './routes';

export const formatMoney = (n) => {
  if (typeof n != 'number') n = Number(n);
  return '$' + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};

const config = {
  routes,
  notifications,
};

export default config;
