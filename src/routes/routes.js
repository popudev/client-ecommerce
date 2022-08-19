import config from '~/config';

// Layouts

// Pages
import Home from '~/pages/Home';
import Shop from '~/pages/Shop';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

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
    path: config.routes.login,
    component: Login,
    layout: null,
  },
  {
    path: config.routes.register,
    component: Register,
    layout: null,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
