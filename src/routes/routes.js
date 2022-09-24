import config from '~/config';
import AdminProduct from '~/pages/AdminProduct';
import Cart from '~/pages/Cart';
import Detail from '~/pages/Detail';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import NotFound from '~/pages/NotFound';
import Register from '~/pages/Register';
import Shop from '~/pages/Shop';

// Public routes
const publicRoutes = [
  {
    path: config.routes.notfound,
    component: NotFound,
    layout: null,
  },
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
    component: AdminProduct,
    layout: null,
  },
];

export { publicRoutes, privateRoutes };
