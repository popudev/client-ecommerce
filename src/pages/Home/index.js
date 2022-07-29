import classNames from 'classnames/bind';
import Helmet from '~/components/Helmet';
import Slider from '~/components/Slider';
import styles from './Home.module.scss';
import { slide1, slide2, slide3, slide4 } from '~/assets/images';

const cx = classNames.bind(styles);

const fakeSlider = [
  {
    image: slide1,
    path: '/shop',
  },
  {
    image: slide2,
    path: '/shop',
  },
  {
    image: slide3,
    path: '/shop',
  },
  {
    image: slide4,
    path: '/shop',
  },
];

function Home() {
  return (
    <Helmet title={'Home'}>
      <div className={cx('wrapper', 'main')}>
        {/* slider */}
        <Slider data={fakeSlider} />
        {/* end slider */}
      </div>
    </Helmet>
  );
}

export default Home;
