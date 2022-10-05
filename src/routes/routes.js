import config from '~/config';
import AdminProduct from '~/pages/AdminProduct';
import Cart from '~/pages/Cart';
import Detail from '~/pages/Detail';
import Home from '~/pages/Home';
import Load from '~/pages/Load';
import Login from '~/pages/Login';
import NotFound from '~/pages/NotFound';
import Profile from '~/pages/Profile';
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
    path: config.routes.profile + '/*',
    component: Profile,
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
  {
    path: config.routes.load,
    component: Load,
    layout: null,
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
