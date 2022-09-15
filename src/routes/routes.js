import config from '~/config';

// Layouts

// Pages
import Home from '~/pages/Home';
import Shop from '~/pages/Shop';
import Cart from '~/pages/Cart';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Detail from '~/pages/Detail';

import Admin from '~/pages/AdminProduct';

// Public routes
const publicRoutes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.shop,
    component: Shop,
  },
  {
    path: config.routes.cart,
    component: Cart,
  },
  {
    path: config.routes.login,
    component: Login,
    layout: null,
  },
  {
    path: config.routes.register,
    component: Register,
    layout: null,
  },
  {
    path: config.routes.detail + '/:productId',
    component: Detail,
  },
];

const privateRoutes = [
  {
    path: config.routes.admin,
    component: Admin,
    layout: null,
  },
];

export { publicRoutes, privateRoutes };
