import { Fragment } from 'react';
import { publicRoutes, privateRoutes } from '~/routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from '~/layouts';
import { ToastContainer } from './components/Toast';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollToTop';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />
      <Loading />
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

          <Route element={<RequireAuth />}>
            {privateRoutes.map((route, index) => {
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
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
