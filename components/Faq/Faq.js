import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { useText } from '~/theme/common';
import ParallaxMedium from '../Parallax/Medium';
import illustration from '~/public/images/saas/faq.png';
import Title from '../Title';
import useStyles from './faq-style';

const faqData = [
  {
    q: 'How do I add a new guest or employee to the system??',
    a: `For guests, as you create a new booking, their details are automatically recorded in the guest look-up page. To add a new employee to the system, simply click on the '+ New Employee' button and enter their details in the pop-up.. `
  },
  {
    q: 'How can I add a transaction?',
    a: `To add an income transaction, click '+ New Transaction' when creating or editing a booking. For expenses, use '+ New Expense' on the Transactions page. Once confirmed, the transactions are automatically stored in the Transactions page and can be edited or deleted as needed. `
  },
  {
    q: 'Can I edit a room booking?',
    a: 'Absolutely! You can edit any room booking by clicking the “Edit Booking” button on the booking details page. '
  },
  {
    q: 'ow do I check room availability?',
    a: 'To check room availability, visit the Home page and view the room layout grid. All rooms are color-coded by status, with available rooms marked in white, making it easy to check their availability. '
  },
  {
    q: 'How can I check KPIs and financial reports?',
    a: `Stay tuned! We're currently working on bringing you valuable financial insights and analytics, coming soon in the future.`
  },
];

function Faq() {
  const { classes, cx } = useStyles();
  const { classes: text } = useText();
  const [expanded, setExpanded] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { t } = useTranslation('common');
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className={classes.root}>
      <Container fixed>
        <Grid container spacing={6}>
          <Grid item md={6}>
            <Title align={isMobile ? 'center' : 'left'}>
              <strong>
                FAQ
              </strong>
            </Title>
            <Typography className={cx(classes.text, text.subtitle2)} align={isMobile ? 'center' : 'left'} component="p">
              {t('saas-landing.faq_subtitle')}
            </Typography>
            {!isMobile && (
              <div className={classes.illustration}>
                <ParallaxMedium />
                <img src={'https://s3-alpha-sig.figma.com/img/e559/9691/9695d77e373cf7a64473ce087baf33ab?Expires=1699833600&Signature=AGiWwIeyIdZgofK~0rr~tgaQ8ZuhanjCK89mhLDgqvZRawhlWn6w3prVUgC1aZHY3SufQGNfMnoy2MjujqKbCETghdu8UutwejPSWXjT9YFFbo8P730Js3llwfMH5nfF-J43-pc6JKYQjO7xhS1TbQvBgAfzGLpfZiMJMYIjpuBSS8JlGkc5zZ9hwclKNJ6H0iOb-mSRGuYiuADUePkJXvlXXKlzW~-UayzdxHTPTP3efRtCOdujBBfZREyetaXcxFN4pLPOkJEqD2UyFhcUPcb2zL2rXvat9b5FgFE2JB-ucvabl8-v0RyVLDMw5LnbcZxVujfHpO4Rh0VuM9Vguw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'} alt="illustration" />
              </div>
            )}
          </Grid>
          <Grid item md={6}>
            <div className={classes.accordion}>
              {faqData.map((item, index) => (
                <div className={classes.item} key={index.toString()}>
                  <Accordion
                    classes={{
                      root: classes.paper
                    }}
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                  >
                    <AccordionSummary
                      classes={{
                        content: classes.content,
                        expanded: classes.expanded,
                      }}
                    >
                      <Typography className={classes.heading}>{item.q}</Typography>
                      <ExpandMoreIcon className={classes.icon} />
                    </AccordionSummary>
                    <AccordionDetails
                      classes={{
                        root: classes.detail,
                      }}
                    >
                      <Typography>
                        {item.a}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Faq;
