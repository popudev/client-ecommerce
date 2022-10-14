import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import useRecoverState from '~/hooks/useRecoverState';

import Helmet from '~/components/Helmet';

import Code from './pages/Code';
import Intiate from './pages/Initiate/Intiate';
import Password from './pages/Password';
import styles from './Recover.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const routes = [
  {
    component: Intiate,
    path: '/intiate',
  },
  {
    component: Code,
    path: '/code',
  },
  {
    component: Password,
    path: '/password',
  },
];

function Recover() {
  const { recoverState } = useRecoverState();
  const navigator = useNavigate();

  const { accountFound } = recoverState;

  useEffect(() => {
    if (!accountFound) navigator('/login');
  });

  return !accountFound ? (
    <></>
  ) : (
    <Helmet title="recover">
      <div className={cx('wrapper')}>
        <Routes>
          {routes.map((item) => {
            const Component = item.component;
            return <Route key={item.path} path={item.path} element={<Component />} />;
          })}
        </Routes>
      </div>
    </Helmet>
  );
}

export default Recover;
