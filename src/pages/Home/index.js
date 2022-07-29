import classNames from 'classnames/bind';
import Helmet from '~/components/Helmet';
import Slider from '~/components/Slider';
import styles from './Home.module.scss';
import { slide1, slide2, slide3, slide4, slide5, slide6 } from '~/assets/images';
import Section, { SectionBody, SectionTitle } from '~/components/Section';
import Grid from '~/components/Gird';
import CategoryCard from '~/components/CategoryCard';
import ProductCard from '~/components/ProductCard';

const cx = classNames.bind(styles);

const fakeSlider = [
  {
    image: slide4,
    path: '/shop',
  },
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
    image: slide5,
    path: '/shop',
  },
  {
    image: slide6,
    path: '/shop',
  },
];

const fakeCategoryCard = [
  {
    title: 'Phone Sale 50%',
    image: slide4,
    path: '/shop',
  },
  {
    title: 'Phone Sale 50%',
    image: slide1,
    path: '/shop',
  },
  {
    title: 'Phone Sale 50%',
    image: slide2,
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

        <Section>
          <SectionBody>
            <Grid col={3} mdCol={1} smCol={1} gap={20}>
              {fakeCategoryCard.map((e, i) => {
                return <CategoryCard key={i} data={e} />;
              })}
            </Grid>
          </SectionBody>
        </Section>

        <Section>
          <SectionBody>
            <Grid col={3} mdCol={1} smCol={1} gap={20}>
              {fakeCategoryCard.map((e, i) => {
                return <ProductCard key={i} data={e} />;
              })}
            </Grid>
          </SectionBody>
        </Section>
      </div>
    </Helmet>
  );
}

export default Home;
