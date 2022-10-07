import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { DefaultLayout } from '~/layouts';
import { privateRoutes, publicRoutes } from '~/routes';

import Loading from './components/Loading';
import Notification from './components/Modal/Notification';
import OverPlay from './components/OverPlay';
import RequireAuth from './components/RequireAuth';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from './components/Toast';

import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />
      <Loading />
      <OverPlay />
      <Notification />
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route key={index} element={<RequireAuth />}>
                <Route
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              </Route>
            );
          })}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
