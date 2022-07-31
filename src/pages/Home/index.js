import classNames from 'classnames/bind';
import Helmet from '~/components/Helmet';
import Slider from '~/components/Slider';
import styles from './Home.module.scss';
import {
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
  slide6,
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,
} from '~/assets/images';
import Section, { SectionBody, SectionTitle } from '~/components/Section';
import Grid from '~/components/Gird';
import CategoryCard from '~/components/CategoryCard';

import { ProductList, ProductCard } from '~/components/Product';

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

const fakeProducts = [
  {
    id: 1,
    title: 'MASTER HEADPHONE',
    sale: 179,
    price: 189,
    category: 'HEADPHONE',
    rate: 4,
    wish: 0,
    image: product1,
  },
  {
    id: 2,
    title: 'SUPER SINGLE CAMERA',
    sale: 123,
    price: 154,
    category: 'CAMERA',
    rate: 3,
    wish: 0,
    image: product2,
  },
  {
    id: 3,
    title: 'GOOGLE HOME',
    sale: 199,
    price: 213,
    category: 'PHONE',
    rate: 3,
    wish: 0,
    image: product3,
  },
  {
    id: 4,
    title: 'IPHONE 11',
    sale: 534,
    price: 612,
    category: 'PHONE',
    rate: 4,
    wish: 0,
    image: product4,
    colorList: ['--red:1', '--black:2', '--yellow:3'],
  },
  {
    id: 5,
    title: 'POLAROID CAMERA',
    sale: 152,
    price: 178,
    category: 'CAMERA',
    rate: 3,
    wish: 0,
    image: product5,
    colorList: ['--black:1', '--blue:3'],
  },
  {
    id: 6,
    title: 'BLUETOOTH PINK',
    sale: 109,
    price: 112,
    category: 'HEADPHONE',
    rate: 5,
    wish: 0,
    image: product6,
  },
  {
    id: 7,
    title: 'KEYBORD AKO',
    sale: 187,
    price: 230,
    category: 'KEYBOARD',
    rate: 3,
    wish: 0,
    image: product7,
  },
  {
    id: 8,
    title: 'ACER NITRO 5',
    sale: 5431,
    price: 6120,
    category: 'LAPTOP',
    rate: 3,
    wish: 0,
    image: product8,
  },
  {
    id: 7,
    title: 'KEYBORD AKO',
    sale: 187,
    price: 230,
    category: 'KEYBOARD',
    rate: 3,
    wish: 0,
    image: product7,
  },
  {
    id: 8,
    title: 'ACER NITRO 5',
    sale: 5431,
    price: 6120,
    category: 'LAPTOP',
    rate: 3,
    wish: 0,
    image: product8,
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
          <SectionTitle>Big Sale Collection</SectionTitle>
          <SectionBody>
            <Grid col={3} mdCol={1} smCol={1} gap={20}>
              {fakeCategoryCard.map((e, i) => {
                return <CategoryCard key={i} data={e} />;
              })}
            </Grid>
          </SectionBody>
        </Section>

        <Section>
          <SectionTitle>Products</SectionTitle>
          <SectionBody>
            <ProductList col={4} mdCol={3} smCol={2}>
              {fakeProducts.map((e, i) => {
                return <ProductCard key={i} data={e} />;
              })}
            </ProductList>
          </SectionBody>
        </Section>
      </div>
    </Helmet>
  );
}

export default Home;
