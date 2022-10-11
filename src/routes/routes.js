import config from '~/config';
import CenterLayout from '~/layouts/CenterLayout';
import AdminProduct from '~/pages/AdminProduct';
import Cart from '~/pages/Cart';
import CheckOut from '~/pages/CheckOut';
import CheckOutComplete from '~/pages/CheckOutComplete';
import Detail from '~/pages/Detail';
import Forgotten from '~/pages/Forgotten';
import Home from '~/pages/Home';
import Load from '~/pages/Load';
import Login from '~/pages/Login';
import NotFound from '~/pages/NotFound';
import Profile from '~/pages/Profile';
import Recover from '~/pages/Recover';
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
    path: config.routes.detail + '/:productId',
    component: Detail,
  },
  {
    path: config.routes.load,
    component: Load,
    layout: null,
  },
  {
    path: config.routes.login,
    component: Login,
    layout: CenterLayout,
  },
  {
    path: config.routes.register,
    component: Register,
    layout: CenterLayout,
  },
  {
    path: config.routes.forgotten,
    component: Forgotten,
    layout: CenterLayout,
  },
  {
    path: config.routes.recover + '/*',
    component: Recover,
    layout: CenterLayout,
  },
  {
    path: config.routes.checkout.complete + '/:orderId',
    component: CheckOutComplete,
  },
  {
    path: config.routes.checkout + '/*',
    component: CheckOut,
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
