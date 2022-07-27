import config from '~/config';

// Layouts

// Pages
import Home from '~/pages/Home';

// Public routes
const publicRoutes = [{ path: config.routes.home, component: Home }];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
