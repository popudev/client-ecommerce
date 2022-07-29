import config from '~/config';

// Layouts

// Pages
import Home from '~/pages/Home';
import Shop from '~/pages/Shop';

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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
