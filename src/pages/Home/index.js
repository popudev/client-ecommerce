import classNames from 'classnames/bind';
import Helmet from '~/components/Helmet';
import styles from './Home.module.scss';
import Slider from '~/components/Slider';
import Section, { SectionBody, SectionTitle } from '~/components/Section';
import Grid from '~/components/Gird';
import CategoryCard from '~/components/CategoryCard';
import { ProductList, ProductCard } from '~/components/Product';
import { fakeCategoryCard, fakeProducts, fakeSlider } from '~/assets/data';

const cx = classNames.bind(styles);

function Home() {
  return (
    <Helmet title={'Home'}>
      <div className={cx('wrapper', 'main', 'container')}>
        {/* slider */}
        <Slider data={fakeSlider} shadow isLink="/shop" />
        {/* end slider */}

        <Section wrapperClassName={cx('section-big-sale')}>
          <SectionTitle>Big Sale Collection</SectionTitle>
          <SectionBody>
            <Grid col={2} mdCol={1} smCol={1} gap={10}>
              {fakeCategoryCard.map((e, i) => {
                return <CategoryCard key={i} data={e} />;
              })}
            </Grid>
          </SectionBody>
        </Section>

        <Section wrapperClassName={cx('section-new-product')}>
          <SectionTitle>NEW PRODUCTS</SectionTitle>
          <SectionBody>
            <ProductList col={5} mdCol={3} smCol={2} gap={10}>
              {fakeProducts.map((e, i) => {
                return <ProductCard key={i} isHome={true} data={e} />;
              })}
            </ProductList>
          </SectionBody>
        </Section>
      </div>
    </Helmet>
  );
}

export default Home;
