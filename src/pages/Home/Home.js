import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { fakeCategoryCard, fakeSlider } from '~/assets/data';
import { getProductList, getProductsRandom } from '~/services/productService';

import Button from '~/components/Button';
import CategoryCard from '~/components/CategoryCard';
import Grid from '~/components/Gird';
import Helmet from '~/components/Helmet';
import { ProductList } from '~/components/Product';
import Section, { SectionBody, SectionTitle } from '~/components/Section';
import Slider from '~/components/Slider';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
  const [productsNew, setProductsNew] = useState([]);
  const [productsTop, setProductsTop] = useState([]);
  const [loadingNew, setLoadingNew] = useState(true);
  const [loadingTop, setLoadingTop] = useState(true);

  useEffect(() => {
    (async () => {
      const productsNew = await getProductList(
        {
          sort: [
            {
              type: 'updatedAt',
              order: 'desc',
            },
          ],
        },
        20,
        false,
      );

      setProductsNew(productsNew);
      setLoadingNew(false);
    })();

    (async () => {
      const productsTop = await getProductsRandom(20);
      setProductsTop(productsTop);
      setLoadingTop(false);
    })();
  }, []);

  return (
    <Helmet title={'Home'}>
      <div className={cx('wrapper', 'main', 'container')}>
        {/* slider */}
        <div className={cx('slider')}>
          <Slider data={fakeSlider} auto isLink="/shop" />
        </div>
        {/* end slider */}

        <Section wrapperClassName={cx('section-big-sale')}>
          <SectionBody>
            <Grid col={3} mdCol={1} smCol={1} gap={10} mdGap={20} smGap={10}>
              {fakeCategoryCard.map((e, i) => {
                return <CategoryCard key={i} data={e} />;
              })}
            </Grid>
          </SectionBody>
        </Section>

        <Section wrapperClassName={cx('section-new-product')}>
          <SectionTitle>NEW PRODUCTS</SectionTitle>
          <SectionBody>
            <ProductList
              col={5}
              mdCol={3}
              smCol={2}
              gap={10}
              mdGap={20}
              smGap={10}
              data={productsNew}
              loading={loadingNew}
            />
          </SectionBody>
        </Section>

        <Section>
          <SectionBody wrapperClassName={cx('section-deal')}>
            <div className={cx('clock')}>
              <div className={cx('clock_item')}>
                <h3>02</h3>
                <span>DAYS</span>
              </div>
              <div className={cx('clock_item')}>
                <h3>10</h3>
                <span>HOURS</span>
              </div>
              <div className={cx('clock_item')}>
                <h3>34</h3>
                <span>MINS</span>
              </div>
              <div className={cx('clock_item')}>
                <h3>60</h3>
                <span>SECS</span>
              </div>
            </div>

            <h2>HOT DEAL THIS WEEK</h2>
            <p>NEW COLLECTION UP TO 50% OFF</p>
            <Button large primary>
              SHOP NOW
            </Button>
          </SectionBody>
        </Section>

        <Section wrapperClassName={cx('section-new-product')}>
          <SectionTitle>TOP SELLING</SectionTitle>
          <SectionBody>
            <ProductList
              col={5}
              mdCol={3}
              smCol={2}
              gap={10}
              mdGap={20}
              smGap={10}
              data={productsTop}
              loading={loadingTop}
            />
          </SectionBody>
        </Section>

        <Section wrapperClassName={cx('section-newsletter')}>
          <SectionBody>
            <h2>Sign Up for the NEWSLETTER</h2>
            <form>
              <div className={cx('form_group')}>
                <input type="email" placeholder="Enter your email..." />
                <Button primary>Subscribe</Button>
              </div>
            </form>
            <div className={cx('social')}>
              <Button square outline>
                <i className="fa-brands fa-facebook-f"></i>
              </Button>
              <Button square outline>
                <i className="fa-brands fa-tiktok"></i>
              </Button>
              <Button square outline>
                <i className="fa-brands fa-instagram"></i>
              </Button>
              <Button square outline>
                <i className="fa-brands fa-github"></i>
              </Button>
            </div>
          </SectionBody>
        </Section>
      </div>
    </Helmet>
  );
}

export default Home;
