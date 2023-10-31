import React, { useState } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ScrollAnimation from 'react-scroll-animation-wrapper';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from 'next-i18next';
import { Button } from '@mui/material';
import { useText } from '~/theme/common';
import imgAPI from '~/public/images/imgAPI';
import Title from '../Title';
import useStyles from './feature-style';

function Feature() {
  const { classes, cx } = useStyles();
  const { classes: text } = useText();
  const theme = useTheme();

  const [value, setValue] = useState(0);
  const { t } = useTranslation('common');
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.decoration}>
        <svg
          className={classes.wave}
        >
          <use xlinkHref="/images/saas/deco-bg.svg#main" />
        </svg>
      </div>
      <Container fixed={isDesktop}>
        <ParallaxProvider>
          {/* Feature one */}
          <div className={classes.item}>
            <Grid container direction={isMobile ? 'column-reverse' : 'row'}>
              <Grid item md={6} xs={12}>
                <div className={classes.illustrationLeft}>
                  <figure className={cx(classes.figure, classes.screen)}>
                    <img src={imgAPI.saas[8]} alt="screen" />
                  </figure>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <ScrollAnimation
                  animateOnce
                  animateIn="fadeInLeftShort"
                  offset={-100}
                  delay={200}
                  duration={0.4}
                >
                  <div>
                    <Title align={isMobile ? 'center' : 'left'}>
                      {t('saas-landing.feature_title1')}
                      &nbsp;
                      <strong>
                        {t('saas-landing.feature_titlestrong1')}
                      </strong>
                    </Title>
                    <Typography display="block" component="h6" className={text.subtitle2} align={isMobile ? 'center' : 'left'}>
                      {t('saas-landing.feature_desc1')}
                    </Typography>
                  </div>
                </ScrollAnimation>
              </Grid>
            </Grid>
          </div>
          {/* Feature two */}
          <div className={classes.item}>
            <Grid container>
              <Grid item md={6} xs={12}>
                <ScrollAnimation
                  animateOnce
                  animateIn="fadeInRightShort"
                  offset={-100}
                  delay={200}
                  duration={0.4}
                >
                  <div>
                    <Title align={isMobile ? 'center' : 'right'}>
                      {t('saas-landing.feature_title2')}
                      &nbsp;
                      <strong>
                        {t('saas-landing.feature_titlestrong2')}
                      </strong>
                    </Title>
                    <Typography display="block" component="h6" className={text.subtitle2} align={isMobile ? 'center' : 'right'}>
                      {t('saas-landing.feature_desc2')}
                    </Typography>
                  </div>
                </ScrollAnimation>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={classes.illustrationRight}>
                  <figure className={cx(classes.figure, classes.screen)}>
                    <img src={imgAPI.saas[8]} alt="screen" />
                  </figure>
                </div>
              </Grid>
            </Grid>
          </div>
          {/* Feature three */}
          <div className={cx(classes.item, classes.last)}>
            <Title align="center">
              {t('saas-landing.feature_title3')}
              &nbsp;
              <strong>
                {t('saas-landing.feature_titlestrong3')}
              </strong>
            </Title>
            <div className={classes.tab}>
              <Grid container spacing={6}>
                {!isMobile && <Grid item md={1} xs={12} />}
                <Grid item md={10} xs={12}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  >
                    <Tab classes={{ root: classes.tabLabel, selected: classes.selected }} label="Room Bookings" />
                    <Tab classes={{ root: classes.tabLabel, selected: classes.selected }} label="Transactions" />
                    <Tab classes={{ root: classes.tabLabel, selected: classes.selected }} label="Financial Insights" />
                  </Tabs>
                  <div className={classes.tabContent}>
                    {value === 0 && (
                      <section>
                        <Typography component="h6" display="block" align="center" className={text.subtitle2}>
                          {t('saas-landing.feature_desc3')}
                        </Typography>
                        <div>
                          <figure className={cx(classes.figure, classes.screen)}>
                            <img src={imgAPI.saas[10]} alt="screen" />
                          </figure>
                        </div>
                        <div className={classes.action}>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            href="/"
                          >
                            {t('saas-landing.learn_more')}
                          </Button>
                        </div>

                      </section>
                    )}
                    {value === 1 && (
                      <section>
                        <Typography component="h6" display="block" align="center" className={text.subtitle2}>
                          {t('saas-landing.feature_desc3')}
                        </Typography>
                        <div>
                          <figure className={cx(classes.figure, classes.screen)}>
                            <img src={imgAPI.saas[10]} alt="screen" />
                          </figure>
                        </div>
                        <div className={classes.action}>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            href="/"
                          >
                            {t('saas-landing.learn_more')}
                          </Button>
                        </div>
                      </section>
                    )}
                    {value === 2 && (
                      <section>
                        <Typography component="h6" display="block" align="center" className={text.subtitle2}>
                          {t('saas-landing.feature_desc3')}
                        </Typography>
                        <div>
                          <figure className={cx(classes.figure, classes.screen)}>
                            <img src={imgAPI.saas[10]} alt="screen" />
                          </figure>
                        </div>
                        <div className={classes.action}>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            href="/"
                          >
                            {t('saas-landing.learn_more')}
                          </Button>
                        </div>
                      </section>
                    )}
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </ParallaxProvider>
      </Container>
    </div>
  );
}

export default Feature;
