import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { makeStyles } from 'tss-react/mui';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
// Use this below for Server Side Render/Translation (SSR)
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Use this below for Static Site Generation (SSG)
import { getStaticPaths, makeStaticProps } from '~/lib/getStatic';
import brand from '~/public/text/brand';
import Header from '~/components/Header';
import Banner from '~/components/Banner';
import CompanyLogo from '~/components/CompanyLogo';
import Counter from '~/components/Counter';
import Feature from '~/components/Feature';

import Faq from '~/components/Faq';
import NewsEvent from '~/components/NewsEvent';
import FooterWithDeco from '~/components/Footer/FooterWithDeco';
import PageNav from '~/components/PageNav';
import Notification from '~/components/Notification';
import Discover from '../../components/DiscoverSection/Discover';


const sectionMargin = margin => (margin * 20);
const useStyles = makeStyles({ uniqId: 'home' })(theme => ({
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  spaceBottom: {
    marginBottom: theme.spacing(20),
    [theme.breakpoints.down('md')]: {
      marginBottom: sectionMargin(6),
    }
  },
  spaceBottomTesti: {
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(20),
    }
  },
  spaceBottomShort: {
    marginBottom: theme.spacing(10)
  },
  spaceTop: {
    marginTop: theme.spacing(20),
    [theme.breakpoints.down('md')]: {
      marginTop: sectionMargin(6),
    }
  },
  spaceTopShort: {
    marginTop: theme.spacing(10)
  },
  containerWrap: {
    marginTop: -40,
    '& > section': {
      position: 'relative'
    }
  }
}));

function Landing(props) {
  const { classes, cx } = useStyles();
  const { onToggleDark, onToggleDir } = props;
  const isTablet = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (
    <React.Fragment>
      <Head>
        <title>
          { brand.saas.name + ' - Home Page' }
        </title>
      </Head>
      <CssBaseline />
      <div className={classes.mainWrap}>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
        />
        <main className={classes.containerWrap}>
          <section id="home">
            <Banner />
          </section>
       
          <section>
            <Discover/>
            {/* <CompanyLogo /> */}
          </section>
          <section>
            <Counter />
          </section>
          <section id="feature" className={classes.spaceTop}>
            <Feature />
          </section>
          <section id="testimonials" className={classes.spaceBottomTesti}>
            {/* <Testimonials /> */}
          </section>
          <section id="pricing" className={classes.spaceTop}>
            {/* <PricingPlan/> */}
          </section>
          <section id="faq" className={classes.spaceTopShort}>
            <Faq />
          </section>
          <div className={cx(classes.spaceTopShort, classes.spaceBottomShort)}>
            {/* <NewsEvent /> */}
          </div>
        </main>
        <section id="footer">
          <FooterWithDeco toggleDir={onToggleDir} />
        </section>
        {!isTablet && (
          <Fragment>
            <Notification />
            <PageNav />
          </Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

Landing.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

// Use this below for Server Side Render/Translation (SSR)
// export const getStaticProps = async ({ locale }) => ({ props: { ...await serverSideTranslations(locale, ['common']) } });

// Use this below for Static Site Generation (SSG)
const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };

export default Landing;
