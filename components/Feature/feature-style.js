import { makeStyles } from 'tss-react/mui';

const featureStyles = makeStyles({ uniqId: 'feature' })((theme, _params, classes) => ({
  root: {
    position: 'relative',
  },
  decoration: {
    position: 'absolute',
    width: 1280,
    height: '100%',
    left: -10,
    top: 100,
    '& svg': {
      width: '100%',
      height: 1700,
      fill: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
      opacity: 0.1,
      transform: 'scale(1.3)',
      [theme.breakpoints.up(1400)]: {
        transform: 'scale(2.5, 1)',
      },
      [theme.breakpoints.up('xl')]: {
        display: 'none'
      },
      [theme.breakpoints.down('sm')]: {
        transform: 'scale(0.5)',
        transformOrigin: 'center left'
      }
    }
  },
  item: {
    position: 'relative',
    minHeight: 320,
    marginBottom: theme.spacing(20),
    [`&.${classes.last}`]: {
      marginBottom: theme.spacing(10)
    },
    [theme.breakpoints.down('lg')]: {
      marginBottom: theme.spacing(15)
    },
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
    '& h6': {
      marginBottom: theme.spacing(5),
    },
    '& [class="section"]': {
      perspective: 1000,
      [theme.breakpoints.up('md')]: {
        position: 'absolute',
      },
      [theme.breakpoints.down('md')]: {
        margin: theme.spacing(3, 0)
      },
    },
    [`& .${classes.figure}`]: {
      overflow: 'hidden',
      padding: theme.spacing(1),
      paddingTop: theme.spacing(3),
      margin: theme.spacing(3),
      '& img': {
        width: '100%',
      },
    }
  },
  screen: {
    position: 'relative',
    '& img': {
      width: '90%',
      display: 'block'
    }
  },
  graphic: {
    position: 'relative',
    '& img': {
      width: '90%',
      display: 'block'
    }
  },
  tabContent: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 4, 0),
    },
    '& section': {
      position: 'relative !important'
    }
  },
  selected: {},
  tabLabel: {
    fontSize: 18,
    borderBottom: `1px solid ${theme.palette.text.disabled}`,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    },
    [`&.${classes.selected}`]: {
      color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main
    }
  },
  illustrationLeft: {
    position: 'relative',
    [`& .${classes.screen}`]: {
      [theme.breakpoints.up('md')]: {
        marginTop: -50,
      }
    },
  },
  illustrationRight: {
    position: 'relative',
    [`& .${classes.screen}`]: {
      [theme.breakpoints.up('md')]: {
        left: 10,
        top: -80,
      }
    },
  },
  illustrationCenter: {
    perspective: 1000,
    [`& .${classes.screen}`]: {
      display: 'block',
      textAlign: 'center',
      marginTop: -50,
      maxWidth: 700,
      margin: '0 auto !important',
    },
  },
  action: {
    textAlign: 'center',
  }
}));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export default featureStyles;
