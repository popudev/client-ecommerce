/* eslint-disable no-new-wrappers */

const CSO = (objNeedCreate, hrefParent = '') => {
  let objString;

  for (let key in objNeedCreate) {
    if (key === 'default') {
      objString = new String(objNeedCreate[key]);
      objString['href'] = hrefParent + objNeedCreate.default;
      continue;
    }

    if (typeof objNeedCreate[key] === 'object') {
      objString[key] = CSO(objNeedCreate[key], objString['href']);
    }

    if (typeof objNeedCreate[key] === 'string') {
      objString[key] = objNeedCreate[key];
      continue;
    }
  }
  return objString;
};

const routes = {
  home: '/',
  shop: '/shop',
  cart: '/cart',
  login: '/login',
  register: '/register',
  admin: '/admin',
  detail: '/detail',
  notfound: '/notfound',
  load: '/load',
  forgotten: '/forgotten',
  recover: '/recover',
};

routes.profile = CSO({
  default: '/profile',
  account: {
    default: '/account',
  },
  password: {
    default: '/password',
  },
  addresses: {
    default: '/addresses',
  },
  purchase: {
    default: '/purchase',
    order: {
      default: '/order',
    },
  },
});

routes.checkout = CSO({
  default: '/checkout',
  address: {
    default: '/address',
  },
  shipping: {
    default: '/shipping',
  },
  payment: {
    default: '/payment',
  },
  complete: '/checkout/complete',
});

export default routes;
