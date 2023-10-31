import { makeStyles } from 'tss-react/mui';

const advertisementStyle = makeStyles({ uniqId: 'form' })((theme, _params, classes) => ({
  title: {},
  pageWrap: {
    textAlign: 'center',
    minHeight: '100%',
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    padding: theme.spacing(10, 5),
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(5, 0)
    },
    [`& .${classes.title}`]: {
      color: theme.palette.common.white,
    },
    '& a': {
      color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
      textTransform: 'none',
      fontSize: 16,
      textDecoration: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      [theme.breakpoints.down('sm')]: {
        fontSize: 14
      },
    }
  },
  innerWrap: {
    textAlign: 'left',
  },
  advertisementWrap: {
    padding: theme.spacing(8, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 1),
    }
  },
  advertisementBox: {
    borderRadius: 30,
    overflow: 'hidden',
    background: 'transparent',
    boxShadow: '0 1.5px 12px 2px rgba(0, 0, 0, 0.28)',
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none'
    }
  },
  }));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export default advertisementStyle;
